import { MapPin, Phone as PhoneIcon } from "lucide-react";
import { ServiceListItem } from "@/data/services";

interface ServiceListCardProps {
  item: ServiceListItem;
  colorKey: string;
  variant?: "default" | "blood" | "job";
}

const ServiceListCard = ({ item, colorKey, variant = "default" }: ServiceListCardProps) => {
  if (variant === "blood") {
    return (
      <div className="bg-card rounded-lg service-card-shadow p-4 flex items-center gap-4">
        <div
          className="w-14 h-14 rounded-lg flex flex-col items-center justify-center shrink-0"
          style={{ backgroundColor: `hsl(var(--service-${colorKey}-icon))` }}
        >
          <span className="text-lg font-bold text-primary-foreground">{item.bloodGroup}</span>
          <span className="text-[9px] text-primary-foreground/80">গ্রুপ</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-base font-bold text-foreground">{item.name}</h3>
            {item.canDonate !== undefined && (
              <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                item.canDonate
                  ? "bg-green-100 text-green-700"
                  : "bg-accent/10 text-accent"
              }`}>
                {item.canDonate ? "✓ রক্ত দিতে পারবে" : `⏱ ${item.date}`}
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
            <MapPin className="w-3 h-3" /> {item.location}
          </p>
        </div>
        <button
          className="w-11 h-11 rounded-full flex items-center justify-center shrink-0"
          style={{ backgroundColor: `hsl(var(--service-${colorKey}) )` }}
        >
          <PhoneIcon className="w-5 h-5" style={{ color: `hsl(var(--service-${colorKey}-icon))` }} />
        </button>
      </div>
    );
  }

  if (variant === "job") {
    return (
      <div className="bg-card rounded-lg service-card-shadow p-4 border-l-4 border-primary">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-10 h-10 rounded-md bg-secondary flex items-center justify-center shrink-0">
            <span className="text-primary text-lg">💼</span>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-bold text-foreground">{item.name}</h3>
            <p className="text-xs text-muted-foreground">{item.location}</p>
            <div className="flex gap-2 mt-1.5 flex-wrap">
              {item.type && (
                <span className="text-[10px] border border-border px-2 py-0.5 rounded-full text-foreground">{item.type}</span>
              )}
              {item.date && (
                <span className="text-[10px] text-accent font-medium flex items-center gap-1">
                  ⏱ {item.date}
                </span>
              )}
            </div>
          </div>
        </div>
        {item.description && (
          <div className="bg-secondary rounded-md p-3 mb-3">
            <p className="text-xs text-muted-foreground">◆ {item.description}</p>
            <button className="text-xs text-primary font-medium mt-1">আরও পড়ুন...</button>
          </div>
        )}
        <div className="flex gap-3">
          <button className="flex-1 flex items-center justify-center gap-2 border border-border rounded-lg py-2 text-sm font-medium text-foreground">
            👁 বিস্তারিত
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground rounded-lg py-2 text-sm font-medium">
            📞 কল করুন
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg service-card-shadow p-4 flex items-center gap-4">
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center shrink-0"
        style={{ backgroundColor: `hsl(var(--service-${colorKey}))` }}
      >
        <span className="text-2xl">🏥</span>
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-base font-bold text-foreground">{item.name}</h3>
        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
          <MapPin className="w-3 h-3 shrink-0" /> {item.location}
        </p>
        {item.type && (
          <span
            className="inline-block mt-1.5 text-[10px] font-medium px-2 py-0.5 rounded-full"
            style={{
              backgroundColor: `hsl(var(--service-${colorKey}))`,
              color: `hsl(var(--service-${colorKey}-icon))`,
            }}
          >
            {item.type}
          </span>
        )}
      </div>
      <button
        className="w-11 h-11 rounded-full flex items-center justify-center shrink-0"
        style={{ backgroundColor: `hsl(var(--service-${colorKey}))` }}
      >
        <PhoneIcon className="w-5 h-5" style={{ color: `hsl(var(--service-${colorKey}-icon))` }} />
      </button>
    </div>
  );
};

export default ServiceListCard;
