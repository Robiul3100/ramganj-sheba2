import { useState } from "react";
import Header from "@/components/Header";
import DrawerMenu from "@/components/DrawerMenu";
import HeroSlider from "@/components/HeroSlider";
import UpdateBanner from "@/components/UpdateBanner";
import ServiceGrid from "@/components/ServiceGrid";
import StatsCard from "@/components/StatsCard";
import Footer from "@/components/Footer";
import { activeServices, comingSoonServices } from "@/data/services";

const Index = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuClick={() => setDrawerOpen(true)} />
      <DrawerMenu isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <main className="pb-4">
        <HeroSlider />
        <UpdateBanner />
        <ServiceGrid
          services={activeServices}
          title="চালু সেবাসমূহ"
          count={activeServices.length}
        />
        <ServiceGrid
          services={comingSoonServices}
          title="আসছে শীঘ্রই"
          count={comingSoonServices.length}
          isComingSoon
        />
        <StatsCard />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
