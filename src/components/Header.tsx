import { Menu, Users } from "lucide-react";

interface HeaderProps {
  onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
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
              রামগঞ্জ <span className="text-primary">ডিজিটাল সেবা</span>
            </h1>
            <p className="text-xs text-muted-foreground">লক্ষ্মীপুর জেলা</p>
          </div>
        </div>
        <button className="relative w-11 h-11 flex items-center justify-center rounded-full bg-secondary">
          <Users className="w-5 h-5 text-primary" />
          <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full border-2 border-card" style={{ backgroundColor: "hsl(142 71% 45%)" }} />
        </button>
      </div>
    </header>
  );
};

export default Header;
