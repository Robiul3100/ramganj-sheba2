import { X, Home, Info, Phone, Heart, Settings, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface DrawerMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { icon: Home, label: "হোম", path: "/" },
  { icon: Info, label: "পাথরঘাটা সম্পর্কে", path: "/service/about" },
  { icon: Phone, label: "জরুরি কল", path: "/service/emergency-call" },
  { icon: Heart, label: "অনুদান", path: "/service/donation" },
  { icon: Star, label: "রেটিং দিন", path: "/" },
  { icon: Settings, label: "সেটিংস", path: "/" },
];

const DrawerMenu = ({ isOpen, onClose }: DrawerMenuProps) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-foreground/30" onClick={onClose} />
      <aside className="absolute left-0 top-0 h-full w-72 bg-card animate-slide-in-left flex flex-col">
        <div className="stats-gradient px-5 py-8 text-primary-foreground">
          <button onClick={onClose} className="absolute top-4 right-4">
            <X className="w-5 h-5 text-primary-foreground" />
          </button>
          <div className="w-16 h-16 rounded-full bg-primary-foreground/20 flex items-center justify-center mb-3">
            <span className="text-2xl font-bold">প</span>
          </div>
          <h2 className="text-lg font-bold">পাথরঘাটা শপ</h2>
          <p className="text-sm opacity-80">ডিজিটাল সেবা সহযোগী</p>
        </div>
        <nav className="flex-1 py-2">
          {menuItems.map((item, i) => (
            <button
              key={i}
              onClick={() => { navigate(item.path); onClose(); }}
              className="w-full flex items-center gap-4 px-5 py-3.5 hover:bg-secondary transition-colors"
            >
              <item.icon className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-foreground">{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="px-5 py-4 text-center text-xs text-muted-foreground border-t border-border">
          v1.0.0 · পাথরঘাটা আইটি সলিউশন
        </div>
      </aside>
    </div>
  );
};

export default DrawerMenu;
