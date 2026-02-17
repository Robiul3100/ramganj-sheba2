import { useState } from "react";
import { 
  LayoutDashboard, Newspaper, Building2, Briefcase, AlertTriangle, 
  MessageSquare, CalendarDays, Droplets, Moon, ShoppingCart, Megaphone, 
  Package, Users, Settings, LogOut, ChevronLeft, ChevronRight, X
} from "lucide-react";
import { cn } from "@/lib/utils";

export type AdminTab = "overview" | "news" | "businesses" | "jobs" | "emergency" | "complaints" | "events" | "blood" | "islamic" | "marketplace" | "ads" | "lost_found" | "users" | "settings";

const menuItems: { id: AdminTab; label: string; icon: typeof LayoutDashboard; group: string }[] = [
  { id: "overview", label: "ড্যাশবোর্ড", icon: LayoutDashboard, group: "main" },
  { id: "news", label: "নিউজ", icon: Newspaper, group: "content" },
  { id: "businesses", label: "বিজনেস", icon: Building2, group: "content" },
  { id: "jobs", label: "চাকরি", icon: Briefcase, group: "content" },
  { id: "events", label: "ইভেন্ট", icon: CalendarDays, group: "content" },
  { id: "marketplace", label: "মার্কেটপ্লেস", icon: ShoppingCart, group: "content" },
  { id: "emergency", label: "জরুরি নম্বর", icon: AlertTriangle, group: "services" },
  { id: "complaints", label: "অভিযোগ", icon: MessageSquare, group: "services" },
  { id: "blood", label: "রক্তদাতা", icon: Droplets, group: "services" },
  { id: "islamic", label: "ইসলামিক", icon: Moon, group: "services" },
  { id: "lost_found", label: "হারানো/পাওয়া", icon: Package, group: "services" },
  { id: "ads", label: "বিজ্ঞাপন", icon: Megaphone, group: "manage" },
  { id: "users", label: "ইউজার", icon: Users, group: "manage" },
  { id: "settings", label: "সেটিংস", icon: Settings, group: "manage" },
];

const groupLabels: Record<string, string> = {
  main: "",
  content: "কন্টেন্ট",
  services: "সেবা",
  manage: "ম্যানেজমেন্ট",
};

interface AdminSidebarProps {
  activeTab: AdminTab;
  onTabChange: (tab: AdminTab) => void;
  onLogout: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

const AdminSidebar = ({ activeTab, onTabChange, onLogout, mobileOpen, onMobileClose }: AdminSidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);

  const groups = ["main", "content", "services", "manage"];

  const sidebar = (
    <div className={cn(
      "h-full flex flex-col bg-card border-r border-border transition-all duration-300",
      collapsed ? "w-[70px]" : "w-[260px]"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        {!collapsed && (
          <div>
            <h2 className="text-base font-bold text-foreground">অ্যাডমিন প্যানেল</h2>
            <p className="text-[10px] text-muted-foreground">রামগঞ্জ ডিজিটাল সেবা</p>
          </div>
        )}
        <button 
          onClick={() => setCollapsed(!collapsed)} 
          className="hidden lg:flex w-8 h-8 items-center justify-center rounded-lg hover:bg-secondary text-muted-foreground"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
        <button 
          onClick={onMobileClose} 
          className="lg:hidden w-8 h-8 flex items-center justify-center rounded-lg hover:bg-secondary text-muted-foreground"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Menu */}
      <nav className="flex-1 overflow-y-auto p-2 space-y-1">
        {groups.map((group) => {
          const items = menuItems.filter((m) => m.group === group);
          return (
            <div key={group}>
              {groupLabels[group] && !collapsed && (
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground px-3 pt-4 pb-1 font-semibold">
                  {groupLabels[group]}
                </p>
              )}
              {items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => { onTabChange(item.id); onMobileClose(); }}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                      isActive
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    )}
                    title={collapsed ? item.label : undefined}
                  >
                    <Icon className="w-[18px] h-[18px] shrink-0" />
                    {!collapsed && <span>{item.label}</span>}
                  </button>
                );
              })}
            </div>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-border">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/10 transition-all"
        >
          <LogOut className="w-[18px] h-[18px] shrink-0" />
          {!collapsed && <span>লগআউট</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop */}
      <div className="hidden lg:block h-screen sticky top-0">{sidebar}</div>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/50" onClick={onMobileClose} />
          <div className="relative z-10 h-full">{sidebar}</div>
        </div>
      )}
    </>
  );
};

export default AdminSidebar;
