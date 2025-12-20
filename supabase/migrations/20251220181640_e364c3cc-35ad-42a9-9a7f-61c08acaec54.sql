-- Create universities table
CREATE TABLE public.universities (
  id TEXT NOT NULL PRIMARY KEY,
  name TEXT NOT NULL,
  short_name TEXT NOT NULL,
  location TEXT NOT NULL,
  color TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('Public', 'Private')),
  description TEXT NOT NULL,
  established INTEGER NOT NULL,
  ranking TEXT,
  website TEXT NOT NULL,
  facilities TEXT[] NOT NULL DEFAULT '{}',
  highlights TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create programs table
CREATE TABLE public.programs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  university_id TEXT NOT NULL REFERENCES public.universities(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  duration TEXT NOT NULL,
  level TEXT NOT NULL CHECK (level IN ('Foundation', 'Diploma', 'Bachelor', 'Master', 'PhD')),
  faculty TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.universities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;

-- Create public read access policies (public data)
CREATE POLICY "Universities are publicly viewable"
ON public.universities
FOR SELECT
USING (true);

CREATE POLICY "Programs are publicly viewable"
ON public.programs
FOR SELECT
USING (true);

-- Only allow admins to modify (no public writes)
CREATE POLICY "No public inserts for universities"
ON public.universities
FOR INSERT
WITH CHECK (false);

CREATE POLICY "No public updates for universities"
ON public.universities
FOR UPDATE
USING (false);

CREATE POLICY "No public deletes for universities"
ON public.universities
FOR DELETE
USING (false);

CREATE POLICY "No public inserts for programs"
ON public.programs
FOR INSERT
WITH CHECK (false);

CREATE POLICY "No public updates for programs"
ON public.programs
FOR UPDATE
USING (false);

CREATE POLICY "No public deletes for programs"
ON public.programs
FOR DELETE
USING (false);

-- Create indexes for performance
CREATE INDEX idx_programs_university_id ON public.programs(university_id);
CREATE INDEX idx_programs_level ON public.programs(level);
CREATE INDEX idx_universities_type ON public.universities(type);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_universities_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_universities_updated_at
BEFORE UPDATE ON public.universities
FOR EACH ROW
EXECUTE FUNCTION public.update_universities_updated_at();