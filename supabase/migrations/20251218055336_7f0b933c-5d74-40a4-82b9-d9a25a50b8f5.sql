-- Add restrictive policies to contact_submissions table
-- No one should be able to SELECT contact submissions via the public API
-- (Edge function uses service role key which bypasses RLS)

-- Block all SELECT operations (data should only be accessed via admin dashboard or edge functions with service role)
CREATE POLICY "No public read access to contact submissions"
ON public.contact_submissions
FOR SELECT
USING (false);

-- Block all UPDATE operations (contact submissions are immutable)
CREATE POLICY "Contact submissions are immutable"
ON public.contact_submissions
FOR UPDATE
USING (false);

-- Block all DELETE operations (contact submissions cannot be deleted via API)
CREATE POLICY "Contact submissions cannot be deleted"
ON public.contact_submissions
FOR DELETE
USING (false);