import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Save, Settings, Globe, Code, Phone, Mail, Lock } from "lucide-react";
import { toast } from "sonner";

const settingsConfig = [
  { key: "site_name", label: "সাইটের নাম", icon: Globe, placeholder: "রামগঞ্জ ডিজিটাল সেবা" },
  { key: "site_subtitle", label: "সাবটাইটেল", icon: Globe, placeholder: "লক্ষ্মীপুর জেলা" },
  { key: "developer_name", label: "ডেভেলপারের নাম", icon: Code, placeholder: "RSF ROBIUL" },
  { key: "footer_text", label: "ফুটার টেক্সট", icon: Settings, placeholder: "রামগঞ্জ ডিজিটাল সেবা..." },
  { key: "app_version", label: "অ্যাপ ভার্সন", icon: Settings, placeholder: "v1.0.0" },
  { key: "contact_phone", label: "যোগাযোগ ফোন", icon: Phone, placeholder: "01700000000" },
  { key: "contact_email", label: "যোগাযোগ ইমেইল", icon: Mail, placeholder: "info@example.com" },
  { key: "admin_password", label: "অ্যাডমিন পাসওয়ার্ড", icon: Lock, placeholder: "নতুন পাসওয়ার্ড" },
];

const AdminSettings = () => {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      const { data } = await supabase.from("site_settings").select("*");
      const map: Record<string, string> = {};
      data?.forEach((s: any) => { map[s.key] = s.value ?? ""; });
      setSettings(map);
      setLoading(false);
    };
    fetchSettings();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      for (const [key, value] of Object.entries(settings)) {
        await supabase
          .from("site_settings")
          .update({ value, updated_at: new Date().toISOString() } as any)
          .eq("key", key);
      }
      toast.success("সেটিংস সেভ হয়েছে!");
    } catch {
      toast.error("সেভ করতে সমস্যা হয়েছে");
    }
    setSaving(false);
  };

  if (loading) return <div className="flex justify-center py-12"><div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h2 className="text-lg font-bold text-foreground">সাইট সেটিংস</h2>
        <p className="text-xs text-muted-foreground">হেডার, ফুটার ও অন্যান্য সেটিংস পরিবর্তন করুন</p>
      </div>

      <div className="space-y-4">
        {settingsConfig.map((config) => {
          const Icon = config.icon;
          return (
            <div key={config.key} className="bg-card rounded-xl p-4 service-card-shadow">
              <label className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                <Icon className="w-4 h-4 text-primary" />
                {config.label}
              </label>
              <Input
                type={config.key === "admin_password" ? "password" : "text"}
                value={settings[config.key] ?? ""}
                onChange={(e) => setSettings({ ...settings, [config.key]: e.target.value })}
                placeholder={config.placeholder}
                className="rounded-xl bg-secondary/50"
              />
            </div>
          );
        })}
      </div>

      <Button onClick={handleSave} disabled={saving} className="w-full rounded-xl py-3 text-base gap-2">
        <Save className="w-4 h-4" />
        {saving ? "সেভ হচ্ছে..." : "সব সেটিংস সেভ করুন"}
      </Button>
    </div>
  );
};

export default AdminSettings;
