import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, LayoutDashboard, Building2, Briefcase, Newspaper, AlertTriangle, MessageSquare, CalendarDays, Droplets, Moon, Search, Users, Megaphone, ShoppingCart, Package } from "lucide-react";

type AdminTab = "overview" | "businesses" | "jobs" | "news" | "emergency" | "complaints" | "events" | "blood" | "islamic" | "marketplace" | "ads" | "users" | "lost_found";

const tabs: { id: AdminTab; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "overview", label: "ওভারভিউ", icon: LayoutDashboard },
  { id: "news", label: "নিউজ", icon: Newspaper },
  { id: "businesses", label: "বিজনেস", icon: Building2 },
  { id: "jobs", label: "চাকরি", icon: Briefcase },
  { id: "emergency", label: "জরুরি", icon: AlertTriangle },
  { id: "complaints", label: "অভিযোগ", icon: MessageSquare },
  { id: "events", label: "ইভেন্ট", icon: CalendarDays },
  { id: "blood", label: "রক্তদাতা", icon: Droplets },
  { id: "islamic", label: "ইসলামিক", icon: Moon },
  { id: "marketplace", label: "মার্কেট", icon: ShoppingCart },
  { id: "ads", label: "বিজ্ঞাপন", icon: Megaphone },
  { id: "lost_found", label: "হারানো/পাওয়া", icon: Package },
  { id: "users", label: "ইউজার", icon: Users },
];

const AdminDashboard = () => {
  const { user, isAdmin, isModerator, loading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    if (!loading && !user) navigate("/auth");
    if (!loading && user && !isModerator) navigate("/");
  }, [user, loading, isModerator]);

  useEffect(() => {
    const fetchCounts = async () => {
      const tables = ["news", "businesses", "jobs", "emergency_contacts", "complaints", "events", "blood_donors", "islamic_content", "marketplace", "advertisements", "lost_and_found"] as const;
      const results: Record<string, number> = {};
      
      // Fetch counts in parallel - use head:true for count only
      await Promise.all(
        tables.map(async (table) => {
          const { count } = await supabase.from(table).select("*", { count: "exact", head: true });
          results[table] = count ?? 0;
        })
      );
      setCounts(results);
    };
    if (isModerator) fetchCounts();
  }, [isModerator]);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><p>লোড হচ্ছে...</p></div>;

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 bg-card px-4 py-3 service-card-shadow">
        <div className="flex items-center gap-3 max-w-screen-xl mx-auto">
          <button onClick={() => navigate("/")} className="w-10 h-10 flex items-center justify-center rounded-lg border border-border">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-bold">অ্যাডমিন ড্যাশবোর্ড</h1>
        </div>
      </header>

      <div className="max-w-screen-xl mx-auto px-4 py-4">
        {/* Tab Navigation */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-4 scrollbar-hide">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab.id ? "bg-primary text-primary-foreground" : "bg-card service-card-shadow text-foreground hover:bg-secondary"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Overview */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {[
              { label: "নিউজ", count: counts.news ?? 0, color: "bg-blue-50 text-blue-600" },
              { label: "বিজনেস", count: counts.businesses ?? 0, color: "bg-green-50 text-green-600" },
              { label: "চাকরি", count: counts.jobs ?? 0, color: "bg-purple-50 text-purple-600" },
              { label: "জরুরি", count: counts.emergency_contacts ?? 0, color: "bg-red-50 text-red-600" },
              { label: "অভিযোগ", count: counts.complaints ?? 0, color: "bg-orange-50 text-orange-600" },
              { label: "ইভেন্ট", count: counts.events ?? 0, color: "bg-pink-50 text-pink-600" },
              { label: "রক্তদাতা", count: counts.blood_donors ?? 0, color: "bg-red-50 text-red-600" },
              { label: "মার্কেটপ্লেস", count: counts.marketplace ?? 0, color: "bg-teal-50 text-teal-600" },
            ].map((item) => (
              <div key={item.label} className={`p-4 rounded-xl ${item.color} flex flex-col items-center gap-1`}>
                <span className="text-2xl font-bold">{item.count}</span>
                <span className="text-xs font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        )}

        {/* Generic CRUD sections */}
        {activeTab === "news" && <AdminCrudSection table="news" columns={["title", "category", "is_published"]} />}
        {activeTab === "businesses" && <AdminCrudSection table="businesses" columns={["name", "phone", "address", "is_approved"]} />}
        {activeTab === "jobs" && <AdminCrudSection table="jobs" columns={["title", "company", "salary_range", "is_approved"]} />}
        {activeTab === "emergency" && <AdminCrudSection table="emergency_contacts" columns={["name", "phone", "category"]} />}
        {activeTab === "complaints" && <AdminCrudSection table="complaints" columns={["title", "category", "status"]} />}
        {activeTab === "events" && <AdminCrudSection table="events" columns={["title", "event_type", "event_date", "is_approved"]} />}
        {activeTab === "blood" && <AdminCrudSection table="blood_donors" columns={["name", "blood_group", "phone", "is_available"]} />}
        {activeTab === "islamic" && <AdminCrudSection table="islamic_content" columns={["type", "title", "content"]} />}
        {activeTab === "marketplace" && <AdminCrudSection table="marketplace" columns={["title", "category", "price", "is_approved"]} />}
        {activeTab === "ads" && <AdminCrudSection table="advertisements" columns={["title", "placement", "is_active"]} />}
        {activeTab === "lost_found" && <AdminCrudSection table="lost_and_found" columns={["item_name", "type", "status"]} />}
        {activeTab === "users" && <AdminUsersSection />}
      </div>
    </div>
  );
};

// Generic CRUD component for admin sections
const AdminCrudSection = ({ table, columns }: { table: string; columns: string[] }) => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchItems();
  }, [table]);

  const fetchItems = async () => {
    setLoading(true);
    const { data } = await supabase.from(table as any).select("*").order("created_at", { ascending: false }).limit(50);
    setItems(data ?? []);
    setLoading(false);
  };

  const toggleBoolean = async (id: string, column: string, currentValue: boolean) => {
    await supabase.from(table as any).update({ [column]: !currentValue } as any).eq("id", id);
    fetchItems();
  };

  const deleteItem = async (id: string) => {
    if (!confirm("মুছে ফেলতে চান?")) return;
    await supabase.from(table as any).delete().eq("id", id);
    fetchItems();
  };

  const filtered = items.filter((item) =>
    columns.some((col) => String(item[col] ?? "").toLowerCase().includes(search.toLowerCase()))
  );

  if (loading) return <p className="text-center py-8 text-muted-foreground">লোড হচ্ছে...</p>;

  return (
    <div className="space-y-3">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder="খুঁজুন..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
      </div>
      <p className="text-sm text-muted-foreground">মোট: {filtered.length} টি</p>
      <div className="space-y-2">
        {filtered.map((item) => (
          <div key={item.id} className="bg-card p-3 rounded-lg service-card-shadow flex flex-col gap-2">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                {columns.map((col) => {
                  const val = item[col];
                  if (typeof val === "boolean") return null;
                  return (
                    <p key={col} className="text-sm truncate">
                      <span className="text-muted-foreground text-xs">{col}: </span>
                      {String(val ?? "—")}
                    </p>
                  );
                })}
              </div>
              <Button variant="destructive" size="sm" onClick={() => deleteItem(item.id)}>
                মুছুন
              </Button>
            </div>
            <div className="flex gap-2 flex-wrap">
              {columns.filter((col) => typeof item[col] === "boolean").map((col) => (
                <Button
                  key={col}
                  size="sm"
                  variant={item[col] ? "default" : "outline"}
                  onClick={() => toggleBoolean(item.id, col, item[col])}
                >
                  {col}: {item[col] ? "✅" : "❌"}
                </Button>
              ))}
            </div>
          </div>
        ))}
        {filtered.length === 0 && <p className="text-center py-8 text-muted-foreground">কোনো ডাটা নেই</p>}
      </div>
    </div>
  );
};

// Users management section
const AdminUsersSection = () => {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from("profiles").select("*, user_roles(role)").order("created_at", { ascending: false });
      setProfiles(data ?? []);
      setLoading(false);
    };
    fetch();
  }, []);

  if (loading) return <p className="text-center py-8 text-muted-foreground">লোড হচ্ছে...</p>;

  return (
    <div className="space-y-2">
      <p className="text-sm text-muted-foreground">মোট ইউজার: {profiles.length}</p>
      {profiles.map((p) => (
        <div key={p.id} className="bg-card p-3 rounded-lg service-card-shadow">
          <p className="font-medium">{p.display_name || "নাম নেই"}</p>
          <p className="text-xs text-muted-foreground">{p.phone || "ফোন নেই"}</p>
          <p className="text-xs text-primary">
            রোল: {Array.isArray(p.user_roles) ? p.user_roles.map((r: any) => r.role).join(", ") : "user"}
          </p>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;
