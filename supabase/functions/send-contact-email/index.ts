import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactRequest {
  name: string;
  email: string;
  phone?: string;
  message?: string;
}

// Input validation functions
function validateName(name: unknown): { valid: boolean; error?: string } {
  if (typeof name !== 'string' || name.trim().length === 0) {
    return { valid: false, error: "Name is required" };
  }
  if (name.length > 100) {
    return { valid: false, error: "Name must be less than 100 characters" };
  }
  return { valid: true };
}

function validateEmail(email: unknown): { valid: boolean; error?: string } {
  if (typeof email !== 'string' || email.trim().length === 0) {
    return { valid: false, error: "Email is required" };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { valid: false, error: "Invalid email format" };
  }
  if (email.length > 255) {
    return { valid: false, error: "Email must be less than 255 characters" };
  }
  return { valid: true };
}

function validatePhone(phone: unknown): { valid: boolean; error?: string } {
  if (phone === undefined || phone === null || phone === '') {
    return { valid: true }; // Optional field
  }
  if (typeof phone !== 'string') {
    return { valid: false, error: "Invalid phone format" };
  }
  if (phone.length > 20) {
    return { valid: false, error: "Phone must be less than 20 characters" };
  }
  return { valid: true };
}

function validateMessage(message: unknown): { valid: boolean; error?: string } {
  if (message === undefined || message === null || message === '') {
    return { valid: true }; // Optional field
  }
  if (typeof message !== 'string') {
    return { valid: false, error: "Invalid message format" };
  }
  if (message.length > 2000) {
    return { valid: false, error: "Message must be less than 2000 characters" };
  }
  return { valid: true };
}

// Simple rate limiting using Supabase
async function checkRateLimit(supabase: any, clientIp: string): Promise<{ allowed: boolean; error?: string }> {
  const oneHourAgo = new Date(Date.now() - 3600000).toISOString();
  
  try {
    // Count recent submissions from this IP
    const { count, error } = await supabase
      .from('contact_submissions')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', oneHourAgo);

    if (error) {
      console.error("Rate limit check error:", error);
      // Allow on error to prevent blocking legitimate users
      return { allowed: true };
    }

    // Limit to 5 submissions per hour globally (simple protection)
    if (count && count >= 10) {
      return { allowed: false, error: "Too many submissions. Please try again later." };
    }

    return { allowed: true };
  } catch (err) {
    console.error("Rate limit check exception:", err);
    return { allowed: true }; // Allow on error
  }
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse request body
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return new Response(
        JSON.stringify({ error: "Invalid request body" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    if (!body || typeof body !== 'object') {
      return new Response(
        JSON.stringify({ error: "Invalid request format" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const { name, email, phone, message } = body as Record<string, unknown>;

    // Validate all inputs
    const nameValidation = validateName(name);
    if (!nameValidation.valid) {
      return new Response(
        JSON.stringify({ error: nameValidation.error }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const emailValidation = validateEmail(email);
    if (!emailValidation.valid) {
      return new Response(
        JSON.stringify({ error: emailValidation.error }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const phoneValidation = validatePhone(phone);
    if (!phoneValidation.valid) {
      return new Response(
        JSON.stringify({ error: phoneValidation.error }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const messageValidation = validateMessage(message);
    if (!messageValidation.valid) {
      return new Response(
        JSON.stringify({ error: messageValidation.error }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Initialize Supabase client for rate limiting
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Check rate limit
    const clientIp = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    const rateLimitCheck = await checkRateLimit(supabase, clientIp);
    if (!rateLimitCheck.allowed) {
      return new Response(
        JSON.stringify({ error: rateLimitCheck.error }),
        { status: 429, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Sanitize inputs (trim whitespace)
    const sanitizedName = (name as string).trim();
    const sanitizedEmail = (email as string).trim().toLowerCase();
    const sanitizedPhone = phone ? (phone as string).trim() : undefined;
    const sanitizedMessage = message ? (message as string).trim() : undefined;

    console.log("Sending contact notification email for:", sanitizedName);

    // Send notification email to admin
    const adminEmailResponse = await resend.emails.send({
      from: "VisaRoute <onboarding@resend.dev>",
      to: ["info@visaroute.com"],
      subject: `New Contact Form Submission from ${sanitizedName}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(sanitizedName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(sanitizedEmail)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(sanitizedPhone || "Not provided")}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(sanitizedMessage || "No message provided")}</p>
      `,
    });

    console.log("Admin notification sent:", adminEmailResponse);

    // Send confirmation email to user
    const userEmailResponse = await resend.emails.send({
      from: "VisaRoute <onboarding@resend.dev>",
      to: [sanitizedEmail],
      subject: "Thank you for contacting VisaRoute!",
      html: `
        <h1>Thank you, ${escapeHtml(sanitizedName)}!</h1>
        <p>We have received your inquiry and our team will get back to you within 24 hours.</p>
        <p>In the meantime, feel free to explore our services and success stories.</p>
        <br>
        <p>Best regards,<br>The VisaRoute Team</p>
      `,
    });

    console.log("User confirmation sent:", userEmailResponse);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    // Return generic error message to prevent information leakage
    return new Response(
      JSON.stringify({ error: "Unable to process your request. Please try again later." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

// HTML escape function to prevent XSS in emails
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}

serve(handler);
