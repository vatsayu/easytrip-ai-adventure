import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import WhyChoose from "@/components/WhyChoose";
import CommunityTrips from "@/components/CommunityTrips";
import PricingSection from "@/components/PricingSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
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
  );
};

export default Index;
