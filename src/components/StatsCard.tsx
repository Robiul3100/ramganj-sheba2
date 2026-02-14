import { activeServices, comingSoonServices } from "@/data/services";

const StatsCard = () => {
  return (
    <div className="px-4 pt-8 pb-4">
      <div className="max-w-screen-lg mx-auto stats-gradient rounded-lg py-6 px-4 flex text-primary-foreground">
        <div className="flex-1 text-center">
          <p className="text-3xl font-extrabold">{activeServices.length}</p>
          <p className="text-sm opacity-90">চালু সেবা</p>
        </div>
        <div className="w-px bg-primary-foreground/30" />
        <div className="flex-1 text-center">
          <p className="text-3xl font-extrabold">{comingSoonServices.length}</p>
          <p className="text-sm opacity-90">আসছে</p>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
