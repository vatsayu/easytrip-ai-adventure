import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedPage } from "@/components/AnimatedPage";

const Landing = () => {
  return (
    <AnimatedPage>
      <div className="min-h-screen bg-background relative overflow-hidden flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 md:px-12">
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

        {/* Dashed Arc - Static */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg
            viewBox="0 0 1400 900"
            className="w-full h-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
          >
            <path
              d="M -50 950 Q 400 100 700 200 Q 1000 300 1450 850"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="12 10"
              className="text-foreground/20"
              fill="none"
            />
          </svg>
        </div>

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
                Plan Smarter on EasyTrip
              </Button>
            </Link>
          </div>
        </main>
      </div>
    </AnimatedPage>
  );
};

export default Landing;
