-- Add logo_url column to universities table
ALTER TABLE public.universities ADD COLUMN logo_url text;

-- Create storage bucket for university logos
INSERT INTO storage.buckets (id, name, public) VALUES ('university-logos', 'university-logos', true);

-- Allow anyone to view logos (public bucket)
CREATE POLICY "University logos are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'university-logos');

-- Allow admins to upload logos
CREATE POLICY "Admins can upload university logos"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'university-logos' AND public.is_admin());

-- Allow admins to update logos
CREATE POLICY "Admins can update university logos"
ON storage.objects FOR UPDATE
USING (bucket_id = 'university-logos' AND public.is_admin());

-- Allow admins to delete logos
CREATE POLICY "Admins can delete university logos"
ON storage.objects FOR DELETE
USING (bucket_id = 'university-logos' AND public.is_admin());