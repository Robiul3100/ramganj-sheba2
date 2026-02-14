import { Code } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-8 text-center">
      <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
        <Code className="w-6 h-6 text-primary" />
      </div>
      <p className="text-xs text-muted-foreground mb-1">ডেভেলপ করেছেন</p>
      <p className="text-sm font-bold text-foreground mb-2">RSF ROBIUL</p>
      <p className="text-xs text-muted-foreground mb-3">রামগঞ্জ ডিজিটাল সেবা — লক্ষ্মীপুর জেলা</p>
      <span className="text-xs text-muted-foreground bg-secondary px-3 py-1 rounded-full">v1.0.0</span>
    </footer>
  );
};

export default Footer;
