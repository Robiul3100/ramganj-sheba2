import { MapPin, Phone as PhoneIcon, Clock, AlertTriangle, Globe, Tag, Calendar, Megaphone } from "lucide-react";
import { ServiceListItem } from "@/data/services";

interface ServiceListCardProps {
  item: ServiceListItem;
  colorKey: string;
  variant?: "default" | "blood" | "job" | "news" | "marketplace" | "islamic" | "complaint" | "event" | "expat" | "emergency";
}

const handleCall = (phone?: string) => {
  if (phone) window.open(`tel:${phone}`, "_self");
};

const ServiceListCard = ({ item, colorKey, variant = "default" }: ServiceListCardProps) => {

  // ===== জরুরি বাটন =====
  if (variant === "emergency") {
    return (
      <button
        onClick={() => handleCall(item.phone)}
        className={`w-full bg-card rounded-xl service-card-shadow p-4 flex items-center gap-4 text-left transition-transform active:scale-[0.98] ${item.urgent ? "border-l-4 border-destructive" : ""}`}
      >
        <div
          className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 ${item.urgent ? "bg-destructive/10" : ""}`}
          style={!item.urgent ? { backgroundColor: `hsl(var(--service-${colorKey}))` } : {}}
        >
          {item.urgent ? (
            <AlertTriangle className="w-6 h-6 text-destructive" />
          ) : (
            <PhoneIcon className="w-6 h-6" style={{ color: `hsl(var(--service-${colorKey}-icon))` }} />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-bold text-foreground">{item.name}</h3>
          <p className="text-xs text-muted-foreground mt-0.5">{item.location}</p>
          {item.type && (
            <span className="inline-block mt-1 text-[10px] font-medium px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">
              {item.type}
            </span>
          )}
        </div>
        <div className="flex flex-col items-center gap-1 shrink-0">
          <div className="w-11 h-11 rounded-full bg-destructive/10 flex items-center justify-center">
            <PhoneIcon className="w-5 h-5 text-destructive" />
          </div>
          <span className="text-[10px] font-bold text-destructive">{item.phone}</span>
        </div>
      </button>
    );
  }

  // ===== রক্তদাতা =====
  if (variant === "blood") {
    return (
      <div className="bg-card rounded-xl service-card-shadow p-4 flex items-center gap-4">
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
                item.canDonate ? "bg-green-100 text-green-700" : "bg-accent/10 text-accent"
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
          onClick={() => handleCall(item.phone)}
          className="w-11 h-11 rounded-full flex items-center justify-center shrink-0"
          style={{ backgroundColor: `hsl(var(--service-${colorKey}))` }}
        >
          <PhoneIcon className="w-5 h-5" style={{ color: `hsl(var(--service-${colorKey}-icon))` }} />
        </button>
      </div>
    );
  }

  // ===== চাকরি =====
  if (variant === "job") {
    return (
      <div className="bg-card rounded-xl service-card-shadow p-4 border-l-4 border-primary">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-10 h-10 rounded-md bg-secondary flex items-center justify-center shrink-0">
            <span className="text-primary text-lg">
              {item.type === "বিদেশ" ? "✈️" : item.type === "ব্যবসা আইডিয়া" ? "💡" : item.type === "ট্রেনিং" ? "🎓" : "💼"}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-bold text-foreground">{item.name}</h3>
            <p className="text-xs text-muted-foreground">{item.location}</p>
            <div className="flex gap-2 mt-1.5 flex-wrap">
              {item.type && (
                <span className="text-[10px] border border-border px-2 py-0.5 rounded-full text-foreground">{item.type}</span>
              )}
              {item.salary && (
                <span className="text-[10px] bg-green-50 text-green-700 px-2 py-0.5 rounded-full font-medium">💰 {item.salary}</span>
              )}
              {item.country && (
                <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-medium">🌍 {item.country}</span>
              )}
              {item.date && (
                <span className="text-[10px] text-accent font-medium flex items-center gap-1">⏱ {item.date}</span>
              )}
            </div>
          </div>
        </div>
        {item.description && (
          <div className="bg-secondary rounded-md p-3 mb-3">
            <p className="text-xs text-muted-foreground">◆ {item.description}</p>
          </div>
        )}
        <div className="flex gap-3">
          <button className="flex-1 flex items-center justify-center gap-2 border border-border rounded-lg py-2 text-sm font-medium text-foreground">
            👁 বিস্তারিত
          </button>
          <button
            onClick={() => handleCall(item.phone)}
            className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground rounded-lg py-2 text-sm font-medium"
          >
            📞 কল করুন
          </button>
        </div>
      </div>
    );
  }

  // ===== লোকাল নিউজ =====
  if (variant === "news") {
    return (
      <div className={`bg-card rounded-xl service-card-shadow p-4 ${item.urgent ? "border-l-4 border-destructive" : "border-l-4 border-primary"}`}>
        <div className="flex items-start gap-3">
          <div className={`w-10 h-10 rounded-md flex items-center justify-center shrink-0 ${item.urgent ? "bg-destructive/10" : "bg-secondary"}`}>
            {item.urgent ? (
              <Megaphone className="w-5 h-5 text-destructive" />
            ) : (
              <span className="text-lg">📰</span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              {item.type && (
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                  item.type === "জরুরি ঘোষণা" ? "bg-destructive/10 text-destructive" :
                  item.type === "সরকারি নোটিশ" ? "bg-blue-50 text-blue-700" :
                  "bg-secondary text-secondary-foreground"
                }`}>
                  {item.type}
                </span>
              )}
              {item.date && (
                <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> {item.date}
                </span>
              )}
            </div>
            <h3 className="text-base font-bold text-foreground">{item.name}</h3>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3 shrink-0" /> {item.location}
            </p>
          </div>
        </div>
        {item.description && (
          <div className="bg-secondary/50 rounded-md p-3 mt-3">
            <p className="text-xs text-foreground/80 leading-relaxed">{item.description}</p>
          </div>
        )}
      </div>
    );
  }

  // ===== মার্কেটপ্লেস =====
  if (variant === "marketplace") {
    return (
      <div className="bg-card rounded-xl service-card-shadow p-4">
        <div className="flex items-start gap-3">
          <div
            className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0"
            style={{ backgroundColor: `hsl(var(--service-${colorKey}))` }}
          >
            <Tag className="w-5 h-5" style={{ color: `hsl(var(--service-${colorKey}-icon))` }} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-bold text-foreground">{item.name}</h3>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3 shrink-0" /> {item.location}
            </p>
            <div className="flex gap-2 mt-1.5 flex-wrap">
              {item.type && (
                <span className="text-[10px] border border-border px-2 py-0.5 rounded-full text-foreground">{item.type}</span>
              )}
              {item.category && (
                <span className="text-[10px] bg-secondary px-2 py-0.5 rounded-full text-secondary-foreground">{item.category}</span>
              )}
            </div>
          </div>
          {item.price && (
            <div className="shrink-0 text-right">
              <span className="text-sm font-bold text-primary">{item.price}</span>
            </div>
          )}
        </div>
        {item.description && (
          <div className="bg-secondary/50 rounded-md p-3 mt-3">
            <p className="text-xs text-foreground/80">{item.description}</p>
          </div>
        )}
        <div className="flex gap-3 mt-3">
          <button className="flex-1 flex items-center justify-center gap-2 border border-border rounded-lg py-2 text-sm font-medium text-foreground">
            👁 বিস্তারিত
          </button>
          <button
            onClick={() => handleCall(item.phone)}
            className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground rounded-lg py-2 text-sm font-medium"
          >
            📞 যোগাযোগ
          </button>
        </div>
      </div>
    );
  }

  // ===== ইসলামিক কর্নার =====
  if (variant === "islamic") {
    const isMosque = item.type === "মসজিদ";
    const isPrayerTime = item.type === "নামাজের সময়";
    const isKhutba = item.type === "জুমার খুতবা";

    if (isPrayerTime) {
      return (
        <div className="bg-card rounded-xl service-card-shadow p-4 flex items-center gap-4 border-l-4"
          style={{ borderColor: `hsl(var(--service-${colorKey}-icon))` }}
        >
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
            style={{ backgroundColor: `hsl(var(--service-${colorKey}))` }}
          >
            <Clock className="w-5 h-5" style={{ color: `hsl(var(--service-${colorKey}-icon))` }} />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-bold text-foreground">{item.name}</h3>
          </div>
          {item.time && (
            <span className="text-sm font-bold" style={{ color: `hsl(var(--service-${colorKey}-icon))` }}>{item.time}</span>
          )}
        </div>
      );
    }

    if (isKhutba) {
      return (
        <div className="bg-card rounded-xl service-card-shadow p-4 border-l-4"
          style={{ borderColor: `hsl(var(--service-${colorKey}-icon))` }}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">🕌</span>
            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full"
              style={{ backgroundColor: `hsl(var(--service-${colorKey}))`, color: `hsl(var(--service-${colorKey}-icon))` }}
            >
              {item.type}
            </span>
            {item.date && <span className="text-[10px] text-muted-foreground">{item.date}</span>}
          </div>
          <h3 className="text-base font-bold text-foreground">{item.name}</h3>
          <p className="text-xs text-muted-foreground mt-1">{item.location}</p>
          {item.description && (
            <div className="bg-secondary/50 rounded-md p-3 mt-2">
              <p className="text-xs text-foreground/80">{item.description}</p>
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="bg-card rounded-xl service-card-shadow p-4 flex items-center gap-4">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
          style={{ backgroundColor: `hsl(var(--service-${colorKey}))` }}
        >
          <span className="text-xl">🕌</span>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-bold text-foreground">{item.name}</h3>
          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
            <MapPin className="w-3 h-3 shrink-0" /> {item.location}
          </p>
        </div>
        <button
          onClick={() => handleCall(item.phone)}
          className="w-11 h-11 rounded-full flex items-center justify-center shrink-0"
          style={{ backgroundColor: `hsl(var(--service-${colorKey}))` }}
        >
          <PhoneIcon className="w-5 h-5" style={{ color: `hsl(var(--service-${colorKey}-icon))` }} />
        </button>
      </div>
    );
  }

  // ===== অভিযোগ বক্স =====
  if (variant === "complaint") {
    return (
      <div className="bg-card rounded-xl service-card-shadow p-4 border-l-4 border-destructive">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-md bg-destructive/10 flex items-center justify-center shrink-0">
            <span className="text-lg">⚠️</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              {item.type && (
                <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-destructive/10 text-destructive">{item.type}</span>
              )}
              {item.date && (
                <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> {item.date}
                </span>
              )}
            </div>
            <h3 className="text-base font-bold text-foreground">{item.name}</h3>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3 shrink-0" /> {item.location}
            </p>
          </div>
        </div>
        {item.description && (
          <div className="bg-destructive/5 rounded-md p-3 mt-3">
            <p className="text-xs text-foreground/80 leading-relaxed">{item.description}</p>
          </div>
        )}
      </div>
    );
  }

  // ===== ইভেন্ট =====
  if (variant === "event") {
    const emoji = item.type === "ক্রীড়া" ? "⚽" : item.type === "রক্তদান" ? "🩸" : item.type === "ধর্মীয়" ? "🕌" : "🎉";
    return (
      <div className="bg-card rounded-xl service-card-shadow p-4 border-l-4"
        style={{ borderColor: `hsl(var(--service-${colorKey}-icon))` }}
      >
        <div className="flex items-start gap-3">
          <div
            className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0"
            style={{ backgroundColor: `hsl(var(--service-${colorKey}))` }}
          >
            <span className="text-xl">{emoji}</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              {item.type && (
                <span className="text-[10px] font-medium px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: `hsl(var(--service-${colorKey}))`, color: `hsl(var(--service-${colorKey}-icon))` }}
                >
                  {item.type}
                </span>
              )}
              {item.date && (
                <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> {item.date}
                </span>
              )}
            </div>
            <h3 className="text-base font-bold text-foreground">{item.name}</h3>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3 shrink-0" /> {item.location}
            </p>
          </div>
        </div>
        {item.description && (
          <div className="bg-secondary/50 rounded-md p-3 mt-3">
            <p className="text-xs text-foreground/80 leading-relaxed">{item.description}</p>
          </div>
        )}
      </div>
    );
  }

  // ===== প্রবাসী কর্নার =====
  if (variant === "expat") {
    return (
      <div className="bg-card rounded-xl service-card-shadow p-4">
        <div className="flex items-start gap-3">
          <div
            className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0"
            style={{ backgroundColor: `hsl(var(--service-${colorKey}))` }}
          >
            <Globe className="w-5 h-5" style={{ color: `hsl(var(--service-${colorKey}-icon))` }} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-bold text-foreground">{item.name}</h3>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3 shrink-0" /> {item.location}
            </p>
            <div className="flex gap-2 mt-1.5 flex-wrap">
              {item.type && (
                <span className="text-[10px] border border-border px-2 py-0.5 rounded-full text-foreground">{item.type}</span>
              )}
              {item.country && (
                <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-medium">🌍 {item.country}</span>
              )}
            </div>
          </div>
        </div>
        {item.description && (
          <div className="bg-secondary/50 rounded-md p-3 mt-3">
            <p className="text-xs text-foreground/80 leading-relaxed">{item.description}</p>
          </div>
        )}
        {item.phone && (
          <button
            onClick={() => handleCall(item.phone)}
            className="w-full mt-3 flex items-center justify-center gap-2 bg-primary text-primary-foreground rounded-lg py-2.5 text-sm font-medium"
          >
            📞 যোগাযোগ করুন
          </button>
        )}
      </div>
    );
  }

  // ===== ডিফল্ট =====
  return (
    <div className="bg-card rounded-xl service-card-shadow p-4 flex items-center gap-4">
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
        onClick={() => handleCall(item.phone)}
        className="w-11 h-11 rounded-full flex items-center justify-center shrink-0"
        style={{ backgroundColor: `hsl(var(--service-${colorKey}))` }}
      >
        <PhoneIcon className="w-5 h-5" style={{ color: `hsl(var(--service-${colorKey}-icon))` }} />
      </button>
    </div>
  );
};

export default ServiceListCard;
