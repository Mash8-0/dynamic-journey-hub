import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Program {
  id: string;
  name: string;
  duration: string;
  level: "Foundation" | "Diploma" | "Bachelor" | "Master" | "PhD";
  faculty: string;
}

export interface University {
  id: string;
  name: string;
  shortName: string;
  location: string;
  color: string;
  type: "Public" | "Private";
  description: string;
  established: number;
  ranking?: string;
  website: string;
  logoUrl?: string;
  programs: Program[];
  facilities: string[];
  highlights: string[];
}

// Fetch all universities with their programs
export const useUniversities = () => {
  return useQuery({
    queryKey: ["universities"],
    queryFn: async (): Promise<University[]> => {
      // Fetch universities
      const { data: universities, error: uniError } = await supabase
        .from("universities")
        .select("*")
        .order("name");

      if (uniError) throw uniError;

      // Fetch all programs
      const { data: programs, error: progError } = await supabase
        .from("programs")
        .select("*");

      if (progError) throw progError;

      // Group programs by university
      const programsByUniversity = programs?.reduce((acc, prog) => {
        if (!acc[prog.university_id]) {
          acc[prog.university_id] = [];
        }
        acc[prog.university_id].push({
          id: prog.id,
          name: prog.name,
          duration: prog.duration,
          level: prog.level as Program["level"],
          faculty: prog.faculty,
        });
        return acc;
      }, {} as Record<string, Program[]>);

      // Map to University interface
      return (universities || []).map((uni) => ({
        id: uni.id,
        name: uni.name,
        shortName: uni.short_name,
        location: uni.location,
        color: uni.color,
        type: uni.type as "Public" | "Private",
        description: uni.description,
        established: uni.established,
        ranking: uni.ranking || undefined,
        website: uni.website,
        logoUrl: uni.logo_url || undefined,
        programs: programsByUniversity?.[uni.id] || [],
        facilities: uni.facilities || [],
        highlights: uni.highlights || [],
      }));
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

// Fetch single university by ID
export const useUniversity = (id: string | undefined) => {
  return useQuery({
    queryKey: ["university", id],
    queryFn: async (): Promise<University | null> => {
      if (!id) return null;

      // Fetch university
      const { data: university, error: uniError } = await supabase
        .from("universities")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (uniError) throw uniError;
      if (!university) return null;

      // Fetch programs for this university
      const { data: programs, error: progError } = await supabase
        .from("programs")
        .select("*")
        .eq("university_id", id);

      if (progError) throw progError;

      return {
        id: university.id,
        name: university.name,
        shortName: university.short_name,
        location: university.location,
        color: university.color,
        type: university.type as "Public" | "Private",
        description: university.description,
        established: university.established,
        ranking: university.ranking || undefined,
        website: university.website,
        logoUrl: university.logo_url || undefined,
        programs: (programs || []).map((prog) => ({
          id: prog.id,
          name: prog.name,
          duration: prog.duration,
          level: prog.level as Program["level"],
          faculty: prog.faculty,
        })),
        facilities: university.facilities || [],
        highlights: university.highlights || [],
      };
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};
