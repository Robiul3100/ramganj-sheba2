import { ArrowLeft, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ServicePageHeaderProps {
  title: string;
  headerColor: string;
}

const ServicePageHeader = ({ title, headerColor }: ServicePageHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div
      className="relative pb-16 pt-6 px-4"
      style={{ backgroundColor: `hsl(${headerColor})` }}
    >
      {/* Curved bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-8 bg-background"
        style={{ borderRadius: "50% 50% 0 0 / 100% 100% 0 0" }}
      />
      <div className="max-w-screen-lg mx-auto flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 text-primary-foreground" />
        </button>
        <h1 className="text-lg font-bold text-primary-foreground">{title}</h1>
        <button className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
          <Plus className="w-5 h-5 text-primary-foreground" />
        </button>
      </div>
    </div>
  );
};

export default ServicePageHeader;
