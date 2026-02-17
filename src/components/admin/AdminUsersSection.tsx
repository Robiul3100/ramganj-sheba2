import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Users, Shield, ShieldCheck, User } from "lucide-react";

const roleIcons: Record<string, typeof User> = {
  super_admin: ShieldCheck,
  admin: Shield,
  moderator: Shield,
  user: User,
};

const roleBadgeColors: Record<string, string> = {
  super_admin: "bg-red-100 text-red-700",
  admin: "bg-orange-100 text-orange-700",
  moderator: "bg-blue-100 text-blue-700",
  user: "bg-secondary text-muted-foreground",
};

const AdminUsersSection = () => {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from("profiles")
        .select("*, user_roles(role)")
        .order("created_at", { ascending: false });
      setProfiles(data ?? []);
      setLoading(false);
    };
    fetch();
  }, []);

  if (loading) return <div className="flex justify-center py-12"><div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-bold text-foreground">ইউজার ম্যানেজমেন্ট</h2>
        <p className="text-xs text-muted-foreground">মোট ইউজার: {profiles.length} জন</p>
      </div>

      <div className="space-y-2">
        {profiles.map((p) => {
          const role = Array.isArray(p.user_roles) && p.user_roles[0]?.role ? p.user_roles[0].role : "user";
          const RoleIcon = roleIcons[role] || User;
          return (
            <div key={p.id} className="bg-card rounded-xl p-4 service-card-shadow flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-foreground truncate">{p.display_name || "নাম নেই"}</p>
                <p className="text-xs text-muted-foreground truncate">{p.phone || "ফোন নেই"}</p>
              </div>
              <span className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium ${roleBadgeColors[role]}`}>
                <RoleIcon className="w-3 h-3" />
                {role}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminUsersSection;
