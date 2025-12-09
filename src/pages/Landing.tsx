import { Link } from "react-router-dom";
import { MapPin, Plane, Globe, Compass, Map, Palmtree } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedPage } from "@/components/AnimatedPage";

const Landing = () => {
  return (
    <AnimatedPage>
      <div className="min-h-screen bg-background relative overflow-hidden flex flex-col">
        {/* Animated gradient orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
        </div>

        {/* Floating travel icons */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <Plane className="absolute top-[15%] left-[10%] w-8 h-8 text-primary/20 animate-float" style={{ animationDelay: '0s' }} />
          <Globe className="absolute top-[25%] right-[15%] w-10 h-10 text-primary/15 animate-float" style={{ animationDelay: '0.5s' }} />
          <Compass className="absolute bottom-[30%] left-[20%] w-6 h-6 text-primary/20 animate-float" style={{ animationDelay: '1s' }} />
          <Map className="absolute top-[60%] right-[10%] w-8 h-8 text-primary/15 animate-float" style={{ animationDelay: '1.5s' }} />
          <Palmtree className="absolute bottom-[20%] left-[8%] w-10 h-10 text-primary/10 animate-float" style={{ animationDelay: '2s' }} />
          <Plane className="absolute top-[40%] right-[25%] w-6 h-6 text-primary/10 animate-float rotate-45" style={{ animationDelay: '2.5s' }} />
          <MapPin className="absolute bottom-[40%] right-[30%] w-7 h-7 text-primary/15 animate-float" style={{ animationDelay: '3s' }} />
        </div>

        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 md:px-12 z-10">
          <div className="flex items-center gap-2">
            <MapPin className="h-6 w-6 text-primary" />
            <div className="text-sm font-bold leading-tight">
              <span className="text-foreground">Travel</span>
              <br />
              <span className="text-foreground">Planner</span>
              <span className="text-primary">AI</span>
            </div>
          </div>
          <Link to="/home">
            <Button variant="outline" className="rounded-full px-6 border-foreground/20">
              <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
              EasyTrip
            </Button>
          </Link>
        </header>

        {/* Main Content - Centered */}
        <main className="flex-1 flex flex-col items-center justify-center z-10 px-6 text-center">
          {/* Headline */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-light text-foreground mb-10 max-w-2xl leading-tight">
            Travel Planner AI is now{" "}
            <span className="font-bold text-primary">EasyTrip</span>
          </h1>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/home">
              <Button 
                size="lg" 
                className="rounded-full px-8 py-6 text-base md:text-lg bg-primary hover:bg-primary/90"
              >
                Plan Smarter on EasyTrip
              </Button>
            </Link>
            <Link to="/home">
              <Button 
                variant="outline" 
                size="lg" 
                className="rounded-full px-8 py-6 text-base md:text-lg border-2 border-foreground/20 hover:bg-foreground/5"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </main>
      </div>
    </AnimatedPage>
  );
};

export default Landing;
