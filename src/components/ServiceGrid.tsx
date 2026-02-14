import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Service } from "@/data/services";
import ComingSoonModal from "./ComingSoonModal";

interface ServiceGridProps {
  services: Service[];
  title: string;
  count: number;
  isComingSoon?: boolean;
}

const ServiceGrid = ({ services, title, count, isComingSoon = false }: ServiceGridProps) => {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const handleClick = (service: Service) => {
    if (service.status === "coming_soon") {
      setSelectedService(service);
    } else {
      navigate(`/service/${service.slug}`);
    }
  };

  return (
    <section className="px-4 pt-6">
      <div className="max-w-screen-lg mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-foreground">{title}</h2>
          <span className="text-sm font-semibold text-primary bg-secondary px-3 py-1 rounded-full">
            {count} টি
          </span>
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
          {services.map(service => {
            const Icon = service.icon;
            return (
              <button
                key={service.id}
                onClick={() => handleClick(service)}
                className="relative flex flex-col items-center gap-2 p-3 rounded-lg bg-card service-card-shadow hover:service-card-shadow-hover transition-shadow"
              >
                {isComingSoon && (
                  <span className="absolute -top-1 -right-1 coming-soon-badge text-[10px] font-semibold text-accent-foreground px-1.5 py-0.5 rounded-md z-10">
                    আসছে
                  </span>
                )}
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: `hsl(var(--service-${service.colorKey}))`,
                  }}
                >
                  <Icon
                    className="w-5 h-5"
                    style={{ color: `hsl(var(--service-${service.colorKey}-icon))` }}
                  />
                </div>
                <span className="text-[11px] font-medium text-foreground text-center leading-tight">
                  {service.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>
      {selectedService && (
        <ComingSoonModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
        />
      )}
    </section>
  );
};

export default ServiceGrid;
