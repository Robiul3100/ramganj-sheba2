import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock, Menu } from "lucide-react";
import { toast } from "sonner";
import AdminSidebar, { type AdminTab } from "@/components/admin/AdminSidebar";
import AdminOverview from "@/components/admin/AdminOverview";
import AdminCrudSection from "@/components/admin/AdminCrudSection";
import AdminUsersSection from "@/components/admin/AdminUsersSection";
import AdminSettings from "@/components/admin/AdminSettings";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [checking, setChecking] = useState(false);
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [mobileOpen, setMobileOpen] = useState(false);

  // Password-based admin login
  const handleLogin = async () => {
    setChecking(true);
    const { data } = await supabase
      .from("site_settings")
      .select("value")
      .eq("key", "admin_password")
      .single();
    
    if (data?.value === password) {
      setAuthenticated(true);
      sessionStorage.setItem("admin_auth", "true");
      toast.success("লগইন সফল!");
    } else {
      toast.error("পাসওয়ার্ড ভুল!");
    }
    setChecking(false);
  };

  // Check session
  useEffect(() => {
    if (sessionStorage.getItem("admin_auth") === "true") {
      setAuthenticated(true);
    }
  }, []);

  // Fetch counts
  useEffect(() => {
    if (!authenticated) return;
    const fetchCounts = async () => {
      const tables = ["news", "businesses", "jobs", "emergency_contacts", "complaints", "events", "blood_donors", "marketplace", "lost_and_found"] as const;
      const results: Record<string, number> = {};
      await Promise.all(
        tables.map(async (t) => {
          const { count } = await supabase.from(t).select("*", { count: "exact", head: true });
          results[t] = count ?? 0;
        })
      );
      setCounts(results);
    };
    fetchCounts();
  }, [authenticated]);

  const handleLogout = () => {
    sessionStorage.removeItem("admin_auth");
    setAuthenticated(false);
    setPassword("");
    navigate("/");
  };

  // Login screen
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          <div className="bg-card rounded-2xl service-card-shadow overflow-hidden">
            <div className="bg-gradient-to-r from-primary to-blue-600 p-6 text-center">
              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-3">
                <Lock className="w-8 h-8 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-bold text-primary-foreground">অ্যাডমিন প্যানেল</h1>
              <p className="text-sm text-primary-foreground/80 mt-1">রামগঞ্জ ডিজিটাল সেবা</p>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-sm font-semibold text-foreground mb-1.5 block">পাসওয়ার্ড</label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                  placeholder="অ্যাডমিন পাসওয়ার্ড দিন"
                  className="rounded-xl"
                />
              </div>
              <Button onClick={handleLogin} disabled={checking || !password} className="w-full rounded-xl py-3">
                {checking ? "যাচাই হচ্ছে..." : "লগইন করুন"}
              </Button>
              <button onClick={() => navigate("/")} className="w-full text-sm text-muted-foreground hover:text-foreground text-center">
                ← হোমে ফিরুন
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      <AdminSidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onLogout={handleLogout}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      <div className="flex-1 min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-card border-b border-border px-4 py-3 flex items-center gap-3">
          <button onClick={() => setMobileOpen(true)} className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl border border-border">
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="text-base font-bold text-foreground">
            {activeTab === "overview" && "ড্যাশবোর্ড"}
            {activeTab === "news" && "নিউজ ম্যানেজমেন্ট"}
            {activeTab === "businesses" && "বিজনেস ম্যানেজমেন্ট"}
            {activeTab === "jobs" && "চাকরি ম্যানেজমেন্ট"}
            {activeTab === "emergency" && "জরুরি নম্বর"}
            {activeTab === "complaints" && "অভিযোগ ম্যানেজমেন্ট"}
            {activeTab === "events" && "ইভেন্ট ম্যানেজমেন্ট"}
            {activeTab === "blood" && "রক্তদাতা ম্যানেজমেন্ট"}
            {activeTab === "islamic" && "ইসলামিক কন্টেন্ট"}
            {activeTab === "marketplace" && "মার্কেটপ্লেস"}
            {activeTab === "ads" && "বিজ্ঞাপন ম্যানেজমেন্ট"}
            {activeTab === "lost_found" && "হারানো/পাওয়া"}
            {activeTab === "users" && "ইউজার ম্যানেজমেন্ট"}
            {activeTab === "settings" && "সেটিংস"}
          </h1>
        </header>

        {/* Content */}
        <main className="p-4 md:p-6 max-w-6xl">
          {activeTab === "overview" && <AdminOverview counts={counts} />}

          {activeTab === "news" && (
            <AdminCrudSection
              table="news"
              title="নিউজ"
              columns={[
                { key: "title", label: "শিরোনাম", required: true },
                { key: "category", label: "ক্যাটাগরি", type: "select", options: ["সরকারি নোটিশ", "স্কুল আপডেট", "জরুরি ঘোষণা", "সাধারণ"] },
                { key: "content", label: "বিস্তারিত", type: "textarea" },
                { key: "image_url", label: "ছবির লিংক" },
                { key: "is_published", label: "পাবলিশড", type: "boolean" },
              ]}
            />
          )}

          {activeTab === "businesses" && (
            <AdminCrudSection
              table="businesses"
              title="বিজনেস"
              columns={[
                { key: "name", label: "নাম", required: true },
                { key: "phone", label: "ফোন নম্বর" },
                { key: "address", label: "ঠিকানা" },
                { key: "description", label: "বিবরণ", type: "textarea" },
                { key: "image_url", label: "ছবির লিংক" },
                { key: "is_approved", label: "অনুমোদিত", type: "boolean" },
                { key: "is_featured", label: "ফিচার্ড", type: "boolean" },
              ]}
            />
          )}

          {activeTab === "jobs" && (
            <AdminCrudSection
              table="jobs"
              title="চাকরি"
              columns={[
                { key: "title", label: "পদের নাম", required: true },
                { key: "company", label: "প্রতিষ্ঠানের নাম" },
                { key: "job_type", label: "ধরন", type: "select", options: ["full_time", "part_time", "contract", "intern"] },
                { key: "salary_range", label: "বেতন" },
                { key: "location", label: "লোকেশন" },
                { key: "description", label: "বিস্তারিত বিবরণ", type: "textarea" },
                { key: "deadline", label: "ডেডলাইন", type: "date" },
                { key: "apply_link", label: "আবেদন লিংক" },
                { key: "is_approved", label: "অনুমোদিত", type: "boolean" },
              ]}
            />
          )}

          {activeTab === "emergency" && (
            <AdminCrudSection
              table="emergency_contacts"
              title="জরুরি নম্বর"
              columns={[
                { key: "name", label: "নাম", required: true },
                { key: "phone", label: "ফোন নম্বর", required: true },
                { key: "category", label: "ক্যাটাগরি", type: "select", options: ["পুলিশ", "ফায়ার", "হাসপাতাল", "অ্যাম্বুলেন্স", "হটলাইন", "অন্যান্য"] },
                { key: "description", label: "বিবরণ" },
              ]}
            />
          )}

          {activeTab === "complaints" && (
            <AdminCrudSection
              table="complaints"
              title="অভিযোগ"
              columns={[
                { key: "title", label: "শিরোনাম", required: true },
                { key: "category", label: "ক্যাটাগরি" },
                { key: "description", label: "বিবরণ", type: "textarea" },
                { key: "status", label: "স্ট্যাটাস", type: "select", options: ["pending", "reviewing", "resolved", "rejected"] },
                { key: "review_note", label: "রিভিউ নোট", type: "textarea" },
              ]}
            />
          )}

          {activeTab === "events" && (
            <AdminCrudSection
              table="events"
              title="ইভেন্ট"
              columns={[
                { key: "title", label: "শিরোনাম", required: true },
                { key: "event_type", label: "ধরন", type: "select", options: ["সামাজিক", "ধর্মীয়", "সরকারি", "শিক্ষা", "খেলা", "অন্যান্য"] },
                { key: "event_date", label: "তারিখ", type: "date" },
                { key: "event_time", label: "সময়" },
                { key: "location", label: "স্থান" },
                { key: "description", label: "বিবরণ", type: "textarea" },
                { key: "image_url", label: "ছবি লিংক" },
                { key: "is_approved", label: "অনুমোদিত", type: "boolean" },
              ]}
            />
          )}

          {activeTab === "blood" && (
            <AdminCrudSection
              table="blood_donors"
              title="রক্তদাতা"
              columns={[
                { key: "name", label: "নাম", required: true },
                { key: "blood_group", label: "রক্তের গ্রুপ", type: "select", options: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"] },
                { key: "phone", label: "ফোন নম্বর", required: true },
                { key: "location", label: "ঠিকানা" },
                { key: "last_donation_date", label: "সর্বশেষ রক্তদান", type: "date" },
                { key: "is_available", label: "উপলব্ধ", type: "boolean" },
              ]}
            />
          )}

          {activeTab === "islamic" && (
            <AdminCrudSection
              table="islamic_content"
              title="ইসলামিক কন্টেন্ট"
              columns={[
                { key: "type", label: "ধরন", type: "select", options: ["prayer_time", "hadith", "dua", "quran", "mosque", "general"], required: true },
                { key: "title", label: "শিরোনাম" },
                { key: "content", label: "কন্টেন্ট", type: "textarea" },
                { key: "source", label: "সোর্স" },
              ]}
            />
          )}

          {activeTab === "marketplace" && (
            <AdminCrudSection
              table="marketplace"
              title="মার্কেটপ্লেস"
              columns={[
                { key: "title", label: "শিরোনাম", required: true },
                { key: "category", label: "ক্যাটাগরি", type: "select", options: ["ইলেকট্রনিক্স", "ফার্নিচার", "পোশাক", "গাড়ি", "জমি", "অন্যান্য"] },
                { key: "price", label: "মূল্য (৳)", type: "number" },
                { key: "description", label: "বিবরণ", type: "textarea" },
                { key: "phone", label: "যোগাযোগ" },
                { key: "location", label: "লোকেশন" },
                { key: "image_url", label: "ছবি লিংক" },
                { key: "is_approved", label: "অনুমোদিত", type: "boolean" },
              ]}
            />
          )}

          {activeTab === "ads" && (
            <AdminCrudSection
              table="advertisements"
              title="বিজ্ঞাপন"
              columns={[
                { key: "title", label: "শিরোনাম", required: true },
                { key: "placement", label: "স্থান", type: "select", options: ["banner", "sidebar", "popup", "footer"] },
                { key: "image_url", label: "ছবি লিংক" },
                { key: "link_url", label: "লিংক URL" },
                { key: "start_date", label: "শুরু তারিখ", type: "date" },
                { key: "end_date", label: "শেষ তারিখ", type: "date" },
                { key: "is_active", label: "সক্রিয়", type: "boolean" },
              ]}
            />
          )}

          {activeTab === "lost_found" && (
            <AdminCrudSection
              table="lost_and_found"
              title="হারানো/পাওয়া"
              columns={[
                { key: "item_name", label: "জিনিসের নাম", required: true },
                { key: "type", label: "ধরন", type: "select", options: ["lost", "found"] },
                { key: "description", label: "বিবরণ", type: "textarea" },
                { key: "location", label: "স্থান" },
                { key: "contact_phone", label: "যোগাযোগ নম্বর" },
                { key: "image_url", label: "ছবি লিংক" },
                { key: "status", label: "স্ট্যাটাস", type: "select", options: ["active", "resolved"] },
              ]}
            />
          )}

          {activeTab === "users" && <AdminUsersSection />}
          {activeTab === "settings" && <AdminSettings />}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
