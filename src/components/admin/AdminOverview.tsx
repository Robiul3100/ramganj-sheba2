import { Newspaper, Building2, Briefcase, AlertTriangle, MessageSquare, CalendarDays, Droplets, ShoppingCart, Package, Users, TrendingUp } from "lucide-react";

interface AdminOverviewProps {
  counts: Record<string, number>;
}

const statCards = [
  { key: "news", label: "নিউজ", icon: Newspaper, gradient: "from-blue-500 to-blue-600" },
  { key: "businesses", label: "বিজনেস", icon: Building2, gradient: "from-emerald-500 to-emerald-600" },
  { key: "jobs", label: "চাকরি", icon: Briefcase, gradient: "from-violet-500 to-violet-600" },
  { key: "emergency_contacts", label: "জরুরি নম্বর", icon: AlertTriangle, gradient: "from-red-500 to-red-600" },
  { key: "complaints", label: "অভিযোগ", icon: MessageSquare, gradient: "from-orange-500 to-orange-600" },
  { key: "events", label: "ইভেন্ট", icon: CalendarDays, gradient: "from-pink-500 to-pink-600" },
  { key: "blood_donors", label: "রক্তদাতা", icon: Droplets, gradient: "from-rose-500 to-rose-600" },
  { key: "marketplace", label: "মার্কেটপ্লেস", icon: ShoppingCart, gradient: "from-teal-500 to-teal-600" },
  { key: "lost_and_found", label: "হারানো/পাওয়া", icon: Package, gradient: "from-amber-500 to-amber-600" },
];

const AdminOverview = ({ counts }: AdminOverviewProps) => {
  const total = Object.values(counts).reduce((s, v) => s + v, 0);

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-primary to-blue-600 rounded-2xl p-6 text-primary-foreground">
        <h2 className="text-xl font-bold">স্বাগতম, অ্যাডমিন! 👋</h2>
        <p className="text-sm opacity-90 mt-1">আজকের ড্যাশবোর্ড সামারি দেখুন</p>
        <div className="flex items-center gap-2 mt-4 bg-white/15 rounded-xl px-4 py-2 w-fit">
          <TrendingUp className="w-4 h-4" />
          <span className="text-sm font-medium">মোট ডাটা: {total} টি</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.key} className="bg-card rounded-2xl p-4 service-card-shadow hover:service-card-shadow-hover transition-shadow">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center mb-3`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <p className="text-2xl font-bold text-foreground">{counts[card.key] ?? 0}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{card.label}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminOverview;
