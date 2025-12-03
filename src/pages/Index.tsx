import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import WhyChoose from "@/components/WhyChoose";
import CommunityTrips from "@/components/CommunityTrips";
import PricingSection from "@/components/PricingSection";
import Footer from "@/components/Footer";
import { AnimatedPage } from "@/components/AnimatedPage";

const Index = () => {
  return (
    <AnimatedPage>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <HeroSection />
          <HowItWorks />
          <WhyChoose />
          <CommunityTrips />
          <PricingSection />
        </main>
        <Footer />
      </div>
    </AnimatedPage>
  );
};

export default Index;
