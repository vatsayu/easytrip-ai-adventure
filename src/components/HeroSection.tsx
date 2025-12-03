import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroBalloon from "@/assets/hero-balloon.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen gradient-hero pt-20 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-5rem)]">
          {/* Left Content */}
          <div className="flex flex-col gap-6 py-12 lg:py-0">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium w-fit animate-fade-up">
              <Sparkles className="w-4 h-4" />
              AI-Powered Travel Planning
            </div>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight animate-fade-up" style={{ animationDelay: "0.1s" }}>
              Your Perfect Trip,{" "}
              <span className="text-gradient">Built For You</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-lg animate-fade-up" style={{ animationDelay: "0.2s" }}>
              Effortlessly plan personalized itineraries that match your travel style, budget, and time—so you spend less time organizing and more time exploring.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-up" style={{ animationDelay: "0.3s" }}>
              <Link to="/plan">
                <Button variant="hero" size="xl" className="group">
                  <Sparkles className="w-5 h-5" />
                  Try Now - 2 Free Credits
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>

            <p className="text-sm text-muted-foreground animate-fade-up" style={{ animationDelay: "0.4s" }}>
              Your dream trip is just a few clicks away. Plan smarter, save time, and travel confidently.
            </p>
          </div>

          {/* Right Content - Balloon Image */}
          <div className="relative flex items-center justify-center lg:justify-end">
            <div className="relative animate-float">
              <img
                src={heroBalloon}
                alt="Hot air balloon floating in the sky - EasyTrip travel planning"
                className="w-full max-w-lg lg:max-w-xl drop-shadow-2xl"
              />
            </div>

            {/* Floating elements */}
            <div className="absolute top-10 left-10 w-16 h-16 bg-card rounded-2xl shadow-card flex items-center justify-center animate-float-delayed">
              <span className="text-2xl">✈️</span>
            </div>
            <div className="absolute bottom-20 left-0 w-14 h-14 bg-card rounded-2xl shadow-card flex items-center justify-center animate-float" style={{ animationDelay: "1s" }}>
              <span className="text-xl">🏨</span>
            </div>
            <div className="absolute top-1/3 right-0 w-12 h-12 bg-card rounded-xl shadow-card flex items-center justify-center animate-float-delayed">
              <span className="text-lg">🗺️</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
