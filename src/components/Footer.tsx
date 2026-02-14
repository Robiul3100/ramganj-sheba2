const Footer = () => {
  return (
    <footer className="py-8 text-center">
      <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
        <span className="text-2xl font-bold text-primary">G</span>
      </div>
      <p className="text-xs text-muted-foreground mb-1">কারিগরি সহযোগিতায়</p>
      <p className="text-sm font-bold text-foreground mb-2">পাথরঘাটা আইটি সলিউশন</p>
      <span className="text-xs text-muted-foreground bg-secondary px-3 py-1 rounded-full">v1.0.0</span>
    </footer>
  );
};

export default Footer;
