import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useUniversities } from "@/hooks/useUniversities";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import LogoUpload from "@/components/LogoUpload";
import UniversityLogo from "@/components/UniversityLogo";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  GraduationCap,
  Loader2,
  LogOut,
  Plus,
  Pencil,
  Trash2,
  Home,
  Building,
  BookOpen,
  Search,
} from "lucide-react";

type TabType = "universities" | "programs";

interface UniversityForm {
  id: string;
  name: string;
  short_name: string;
  location: string;
  color: string;
  type: "Public" | "Private";
  description: string;
  established: number;
  ranking: string;
  website: string;
  facilities: string;
  highlights: string;
  logo_url: string;
}

interface ProgramForm {
  id?: string;
  university_id: string;
  name: string;
  duration: string;
  level: "Foundation" | "Diploma" | "Bachelor" | "Master" | "PhD";
  faculty: string;
}

const initialUniversityForm: UniversityForm = {
  id: "",
  name: "",
  short_name: "",
  location: "",
  color: "from-blue-600 to-blue-800",
  type: "Private",
  description: "",
  established: new Date().getFullYear(),
  ranking: "",
  website: "",
  facilities: "",
  highlights: "",
  logo_url: "",
};

const initialProgramForm: ProgramForm = {
  university_id: "",
  name: "",
  duration: "",
  level: "Bachelor",
  faculty: "",
};

const AdminDashboard = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const { data: universities = [], isLoading, refetch } = useUniversities();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState<TabType>("universities");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const [universityForm, setUniversityForm] = useState<UniversityForm>(initialUniversityForm);
  const [programForm, setProgramForm] = useState<ProgramForm>(initialProgramForm);
  const [selectedUniversityId, setSelectedUniversityId] = useState<string>("");

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate("/admin/auth");
    }
  }, [user, isAdmin, loading, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/admin/auth");
  };

  // Filter universities
  const filteredUniversities = universities.filter((uni) =>
    uni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    uni.shortName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get all programs with university names
  const allPrograms = universities.flatMap((uni) =>
    uni.programs.map((prog) => ({
      ...prog,
      universityName: uni.name,
      universityId: uni.id,
    }))
  );

  const filteredPrograms = allPrograms.filter((prog) =>
    prog.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    prog.universityName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // University CRUD
  const handleSaveUniversity = async () => {
    setIsSaving(true);
    try {
      const facilitiesArray = universityForm.facilities.split(",").map((f) => f.trim()).filter(Boolean);
      const highlightsArray = universityForm.highlights.split(",").map((h) => h.trim()).filter(Boolean);

      const data = {
        id: universityForm.id.toLowerCase().replace(/\s+/g, "-"),
        name: universityForm.name,
        short_name: universityForm.short_name,
        location: universityForm.location,
        color: universityForm.color,
        type: universityForm.type,
        description: universityForm.description,
        established: universityForm.established,
        ranking: universityForm.ranking || null,
        website: universityForm.website,
        facilities: facilitiesArray,
        highlights: highlightsArray,
        logo_url: universityForm.logo_url || null,
      };

      if (isEditing) {
        const { error } = await supabase
          .from("universities")
          .update(data)
          .eq("id", universityForm.id);
        if (error) throw error;
        toast.success("University updated successfully!");
      } else {
        const { error } = await supabase.from("universities").insert(data);
        if (error) throw error;
        toast.success("University added successfully!");
      }

      setIsDialogOpen(false);
      setUniversityForm(initialUniversityForm);
      setIsEditing(false);
      refetch();
    } catch (error: any) {
      toast.error(error.message || "Failed to save university");
    } finally {
      setIsSaving(false);
    }
  };

  const handleEditUniversity = (uni: typeof universities[0]) => {
    setUniversityForm({
      id: uni.id,
      name: uni.name,
      short_name: uni.shortName,
      location: uni.location,
      color: uni.color,
      type: uni.type,
      description: uni.description,
      established: uni.established,
      ranking: uni.ranking || "",
      website: uni.website,
      facilities: uni.facilities.join(", "),
      highlights: uni.highlights.join(", "),
      logo_url: uni.logoUrl || "",
    });
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const handleDeleteUniversity = async (id: string) => {
    if (!confirm("Are you sure you want to delete this university?")) return;
    
    try {
      const { error } = await supabase.from("universities").delete().eq("id", id);
      if (error) throw error;
      toast.success("University deleted successfully!");
      refetch();
    } catch (error: any) {
      toast.error(error.message || "Failed to delete university");
    }
  };

  // Program CRUD
  const handleSaveProgram = async () => {
    setIsSaving(true);
    try {
      const data = {
        university_id: programForm.university_id,
        name: programForm.name,
        duration: programForm.duration,
        level: programForm.level,
        faculty: programForm.faculty,
      };

      if (isEditing && programForm.id) {
        const { error } = await supabase
          .from("programs")
          .update(data)
          .eq("id", programForm.id);
        if (error) throw error;
        toast.success("Program updated successfully!");
      } else {
        const { error } = await supabase.from("programs").insert(data);
        if (error) throw error;
        toast.success("Program added successfully!");
      }

      setIsDialogOpen(false);
      setProgramForm(initialProgramForm);
      setIsEditing(false);
      refetch();
    } catch (error: any) {
      toast.error(error.message || "Failed to save program");
    } finally {
      setIsSaving(false);
    }
  };

  const handleEditProgram = (prog: typeof allPrograms[0]) => {
    setProgramForm({
      id: prog.id,
      university_id: prog.universityId,
      name: prog.name,
      duration: prog.duration,
      level: prog.level,
      faculty: prog.faculty,
    });
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const handleDeleteProgram = async (id: string) => {
    if (!confirm("Are you sure you want to delete this program?")) return;
    
    try {
      const { error } = await supabase.from("programs").delete().eq("id", id);
      if (error) throw error;
      toast.success("Program deleted successfully!");
      refetch();
    } catch (error: any) {
      toast.error(error.message || "Failed to delete program");
    }
  };

  if (loading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-display font-bold text-lg">Admin Dashboard</h1>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <Home className="w-4 h-4 mr-2" />
                View Site
              </Button>
            </Link>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-card rounded-xl p-4 shadow-sm">
            <div className="text-2xl font-bold text-primary">{universities.length}</div>
            <div className="text-sm text-muted-foreground">Universities</div>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-sm">
            <div className="text-2xl font-bold text-primary">{allPrograms.length}</div>
            <div className="text-sm text-muted-foreground">Programs</div>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-sm">
            <div className="text-2xl font-bold text-blue-600">{universities.filter((u) => u.type === "Public").length}</div>
            <div className="text-sm text-muted-foreground">Public</div>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-sm">
            <div className="text-2xl font-bold text-purple-600">{universities.filter((u) => u.type === "Private").length}</div>
            <div className="text-sm text-muted-foreground">Private</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
          <div className="flex gap-2">
            <Button
              variant={activeTab === "universities" ? "default" : "outline"}
              onClick={() => setActiveTab("universities")}
              size="sm"
            >
              <Building className="w-4 h-4 mr-2" />
              Universities
            </Button>
            <Button
              variant={activeTab === "programs" ? "default" : "outline"}
              onClick={() => setActiveTab("programs")}
              size="sm"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Programs
            </Button>
          </div>

          <div className="flex gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Dialog open={isDialogOpen} onOpenChange={(open) => {
              setIsDialogOpen(open);
              if (!open) {
                setIsEditing(false);
                setUniversityForm(initialUniversityForm);
                setProgramForm(initialProgramForm);
              }
            }}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add {activeTab === "universities" ? "University" : "Program"}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {isEditing ? "Edit" : "Add"} {activeTab === "universities" ? "University" : "Program"}
                  </DialogTitle>
                </DialogHeader>

                {activeTab === "universities" ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>ID (slug)</Label>
                        <Input
                          value={universityForm.id}
                          onChange={(e) => setUniversityForm({ ...universityForm, id: e.target.value })}
                          placeholder="e.g., um, upm"
                          disabled={isEditing}
                        />
                      </div>
                      <div>
                        <Label>Short Name</Label>
                        <Input
                          value={universityForm.short_name}
                          onChange={(e) => setUniversityForm({ ...universityForm, short_name: e.target.value })}
                          placeholder="e.g., UM"
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Name</Label>
                      <Input
                        value={universityForm.name}
                        onChange={(e) => setUniversityForm({ ...universityForm, name: e.target.value })}
                        placeholder="Full university name"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Location</Label>
                        <Input
                          value={universityForm.location}
                          onChange={(e) => setUniversityForm({ ...universityForm, location: e.target.value })}
                          placeholder="City name"
                        />
                      </div>
                      <div>
                        <Label>Type</Label>
                        <Select
                          value={universityForm.type}
                          onValueChange={(v) => setUniversityForm({ ...universityForm, type: v as "Public" | "Private" })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Public">Public</SelectItem>
                            <SelectItem value="Private">Private</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Established Year</Label>
                        <Input
                          type="number"
                          value={universityForm.established}
                          onChange={(e) => setUniversityForm({ ...universityForm, established: parseInt(e.target.value) })}
                        />
                      </div>
                      <div>
                        <Label>Ranking</Label>
                        <Input
                          value={universityForm.ranking}
                          onChange={(e) => setUniversityForm({ ...universityForm, ranking: e.target.value })}
                          placeholder="e.g., QS #60"
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Website</Label>
                      <Input
                        value={universityForm.website}
                        onChange={(e) => setUniversityForm({ ...universityForm, website: e.target.value })}
                        placeholder="https://..."
                      />
                    </div>
                    <div>
                      <Label>Description</Label>
                      <Textarea
                        value={universityForm.description}
                        onChange={(e) => setUniversityForm({ ...universityForm, description: e.target.value })}
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label>Facilities (comma-separated)</Label>
                      <Input
                        value={universityForm.facilities}
                        onChange={(e) => setUniversityForm({ ...universityForm, facilities: e.target.value })}
                        placeholder="Library, Sports Complex, Labs"
                      />
                    </div>
                    <div>
                      <Label>Highlights (comma-separated)</Label>
                      <Input
                        value={universityForm.highlights}
                        onChange={(e) => setUniversityForm({ ...universityForm, highlights: e.target.value })}
                        placeholder="Top Ranked, Research Excellence"
                      />
                    </div>
                    <div>
                      <Label>University Logo</Label>
                      <p className="text-xs text-muted-foreground mb-2">Upload a logo image (optional)</p>
                      <LogoUpload
                        universityId={universityForm.id || "new"}
                        currentLogoUrl={universityForm.logo_url || null}
                        onUploadComplete={(url) => setUniversityForm({ ...universityForm, logo_url: url })}
                        onRemove={() => setUniversityForm({ ...universityForm, logo_url: "" })}
                      />
                    </div>
                    <Button onClick={handleSaveUniversity} disabled={isSaving} className="w-full">
                      {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : isEditing ? "Update" : "Add"} University
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <Label>University</Label>
                      <Select
                        value={programForm.university_id}
                        onValueChange={(v) => setProgramForm({ ...programForm, university_id: v })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select university" />
                        </SelectTrigger>
                        <SelectContent>
                          {universities.map((uni) => (
                            <SelectItem key={uni.id} value={uni.id}>
                              {uni.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Program Name</Label>
                      <Input
                        value={programForm.name}
                        onChange={(e) => setProgramForm({ ...programForm, name: e.target.value })}
                        placeholder="e.g., Computer Science"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Level</Label>
                        <Select
                          value={programForm.level}
                          onValueChange={(v) => setProgramForm({ ...programForm, level: v as ProgramForm["level"] })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Foundation">Foundation</SelectItem>
                            <SelectItem value="Diploma">Diploma</SelectItem>
                            <SelectItem value="Bachelor">Bachelor</SelectItem>
                            <SelectItem value="Master">Master</SelectItem>
                            <SelectItem value="PhD">PhD</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Duration</Label>
                        <Input
                          value={programForm.duration}
                          onChange={(e) => setProgramForm({ ...programForm, duration: e.target.value })}
                          placeholder="e.g., 4 years"
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Faculty</Label>
                      <Input
                        value={programForm.faculty}
                        onChange={(e) => setProgramForm({ ...programForm, faculty: e.target.value })}
                        placeholder="e.g., Faculty of Engineering"
                      />
                    </div>
                    <Button onClick={handleSaveProgram} disabled={isSaving} className="w-full">
                      {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : isEditing ? "Update" : "Add"} Program
                    </Button>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Table */}
        <div className="bg-card rounded-xl shadow-sm overflow-hidden">
          {activeTab === "universities" ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>University</TableHead>
                    <TableHead className="hidden sm:table-cell">Location</TableHead>
                    <TableHead className="hidden md:table-cell">Type</TableHead>
                    <TableHead className="hidden lg:table-cell">Programs</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUniversities.map((uni) => (
                    <TableRow key={uni.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <UniversityLogo
                            logoUrl={uni.logoUrl}
                            shortName={uni.shortName}
                            color={uni.color}
                            size="sm"
                          />
                          <div>
                            <div className="font-medium text-sm">{uni.name}</div>
                            <div className="text-xs text-muted-foreground sm:hidden">{uni.location}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">{uni.location}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge variant={uni.type === "Public" ? "default" : "secondary"}>
                          {uni.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">{uni.programs.length}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="icon" onClick={() => handleEditUniversity(uni)}>
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteUniversity(uni.id)}>
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Program</TableHead>
                    <TableHead className="hidden sm:table-cell">University</TableHead>
                    <TableHead className="hidden md:table-cell">Level</TableHead>
                    <TableHead className="hidden lg:table-cell">Duration</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPrograms.slice(0, 50).map((prog) => (
                    <TableRow key={prog.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium text-sm">{prog.name}</div>
                          <div className="text-xs text-muted-foreground sm:hidden">{prog.universityName}</div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell text-sm">{prog.universityName}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge variant="outline">{prog.level}</Badge>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell text-sm">{prog.duration}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="icon" onClick={() => handleEditProgram(prog)}>
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteProgram(prog.id)}>
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {filteredPrograms.length > 50 && (
                <div className="p-4 text-center text-sm text-muted-foreground">
                  Showing first 50 of {filteredPrograms.length} programs. Use search to filter.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
