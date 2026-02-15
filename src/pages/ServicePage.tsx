import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import ServicePageHeader from "@/components/ServicePageHeader";
import SearchBar from "@/components/SearchBar";
import ServiceListCard from "@/components/ServiceListCard";
import { services, sampleServiceData } from "@/data/services";

type VariantType = "default" | "blood" | "job" | "news" | "marketplace" | "islamic" | "complaint" | "event" | "expat" | "emergency";

const getVariant = (slug: string): VariantType => {
  const map: Record<string, VariantType> = {
    blood: "blood",
    jobs: "job",
    news: "news",
    marketplace: "marketplace",
    islamic: "islamic",
    complaint: "complaint",
    events: "event",
    expat: "expat",
    "emergency-call": "emergency",
    vehicles: "marketplace",
  };
  return map[slug] || "default";
};

const ServicePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [search, setSearch] = useState("");

  const service = services.find(s => s.slug === slug);
  const items = sampleServiceData[slug || ""] || [];
  const variant = getVariant(slug || "");

  const filtered = useMemo(() => {
    if (!search) return items;
    return items.filter(item =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.location.toLowerCase().includes(search.toLowerCase()) ||
      (item.type && item.type.toLowerCase().includes(search.toLowerCase()))
    );
  }, [items, search]);

  if (!service) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">সেবাটি পাওয়া যায়নি</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <ServicePageHeader title={service.title} headerColor={service.headerColor} />
      <div className="px-4 -mt-4 relative z-10">
        <div className="max-w-screen-lg mx-auto">
          <SearchBar
            placeholder={`${service.title} খুঁজুন...`}
            value={search}
            onChange={setSearch}
          />
        </div>
      </div>
      <div className="px-4 pt-4 pb-8">
        <div className="max-w-screen-lg mx-auto flex flex-col gap-4">
          {filtered.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">কোনো তথ্য পাওয়া যায়নি</p>
            </div>
          ) : (
            filtered.map(item => (
              <ServiceListCard
                key={item.id}
                item={item}
                colorKey={service.colorKey}
                variant={variant}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ServicePage;
