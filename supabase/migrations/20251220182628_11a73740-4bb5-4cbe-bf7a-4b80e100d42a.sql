-- Create app role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check user role
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.has_role(auth.uid(), 'admin')
$$;

-- RLS policies for user_roles
CREATE POLICY "Admins can view all roles"
ON public.user_roles
FOR SELECT
USING (public.is_admin());

CREATE POLICY "Admins can manage roles"
ON public.user_roles
FOR ALL
USING (public.is_admin());

-- Update universities policies to allow admin writes
DROP POLICY IF EXISTS "No public inserts for universities" ON public.universities;
DROP POLICY IF EXISTS "No public updates for universities" ON public.universities;
DROP POLICY IF EXISTS "No public deletes for universities" ON public.universities;

CREATE POLICY "Admins can insert universities"
ON public.universities
FOR INSERT
WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update universities"
ON public.universities
FOR UPDATE
USING (public.is_admin());

CREATE POLICY "Admins can delete universities"
ON public.universities
FOR DELETE
USING (public.is_admin());

-- Update programs policies to allow admin writes
DROP POLICY IF EXISTS "No public inserts for programs" ON public.programs;
DROP POLICY IF EXISTS "No public updates for programs" ON public.programs;
DROP POLICY IF EXISTS "No public deletes for programs" ON public.programs;

CREATE POLICY "Admins can insert programs"
ON public.programs
FOR INSERT
WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update programs"
ON public.programs
FOR UPDATE
USING (public.is_admin());

CREATE POLICY "Admins can delete programs"
ON public.programs
FOR DELETE
USING (public.is_admin());

-- Function to make first user admin (can be called once)
CREATE OR REPLACE FUNCTION public.make_first_admin()
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Only proceed if there are no admins yet
  IF NOT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin') THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (auth.uid(), 'admin')
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;
END;
$$;