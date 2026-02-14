import { Zap } from "lucide-react";

const UpdateBanner = () => {
  return (
    <div className="px-4 pt-5">
      <div className="max-w-screen-lg mx-auto bg-card rounded-lg service-card-shadow flex items-center gap-3 px-3 py-2.5 overflow-hidden">
        <span className="shrink-0 inline-flex items-center gap-1.5 bg-accent text-accent-foreground text-xs font-semibold px-3 py-1.5 rounded-full">
          <Zap className="w-3.5 h-3.5" />
          আপডেট
        </span>
        <div className="overflow-hidden flex-1">
          <p className="text-sm text-muted-foreground whitespace-nowrap animate-marquee">
            আসসালামু আলাইকুম! রামগঞ্জ ডিজিটাল সেবায় আপনাকে স্বাগতম। রামগঞ্জ থানার সকল সেবা এখন আপনার হাতের মুঠোয়!
          </p>
        </div>
      </div>
    </div>
  );
};

export default UpdateBanner;
