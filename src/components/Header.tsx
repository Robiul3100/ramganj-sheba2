import { Menu, Users, LogIn, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useSiteSettings } from "@/hooks/useSiteSettings";

interface HeaderProps {
  onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  const navigate = useNavigate();
  const { user, isAdmin, isModerator, signOut } = useAuth();
  const { settings } = useSiteSettings();

  const siteName = settings.site_name || "রামগঞ্জ";
  const siteHighlight = "ডিজিটাল সেবা";
  const subtitle = settings.site_subtitle || "লক্ষ্মীপুর জেলা";

  // Split site_name if it contains space
  const parts = siteName.split(" ");
  const firstPart = parts.length > 2 ? parts.slice(0, -2).join(" ") : parts[0];
  const highlight = parts.length > 2 ? parts.slice(-2).join(" ") : (parts[1] ? parts.slice(1).join(" ") : siteHighlight);

  return (
    <header className="sticky top-0 z-40 bg-card px-4 py-3 service-card-shadow">
      <div className="flex items-center justify-between max-w-screen-lg mx-auto">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="w-11 h-11 flex items-center justify-center rounded-lg border border-border bg-card"
            aria-label="Menu"
          >
            <Menu className="w-5 h-5 text-foreground" />
          </button>
          <div>
            <h1 className="text-xl font-bold leading-tight">
              {firstPart} <span className="text-primary">{highlight}</span>
            </h1>
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isModerator && (
            <button
              onClick={() => navigate("/admin")}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-destructive/10"
              title="অ্যাডমিন"
            >
              <Shield className="w-5 h-5 text-destructive" />
            </button>
          )}
          {user ? (
            <button
              onClick={() => signOut()}
              className="relative w-11 h-11 flex items-center justify-center rounded-full bg-secondary"
            >
              <Users className="w-5 h-5 text-primary" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full border-2 border-card" style={{ backgroundColor: "hsl(142 71% 45%)" }} />
            </button>
          ) : (
            <button
              onClick={() => navigate("/auth")}
              className="w-11 h-11 flex items-center justify-center rounded-full bg-secondary"
            >
              <LogIn className="w-5 h-5 text-primary" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
