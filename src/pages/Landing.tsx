import { Link } from "react-router-dom";
import { MapPin, Plane } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedPage } from "@/components/AnimatedPage";

const Landing = () => {
  return (
    <AnimatedPage>
      <div className="min-h-screen bg-background relative overflow-hidden">
        {/* CSS for plane animation */}
        <style>{`
          @keyframes flyAlongArc {
            0% {
              offset-distance: 0%;
            }
            100% {
              offset-distance: 100%;
            }
          }
          .plane-on-path {
            offset-path: path('M -50 950 Q 400 100 700 200 Q 1000 300 1450 850');
            offset-rotate: auto;
            animation: flyAlongArc 8s ease-in-out infinite;
          }
        `}</style>

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

        {/* Animated Dashed Arc - Full screen */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg
            viewBox="0 0 1400 900"
            className="w-full h-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
          >
            {/* Dashed arc path - starts from bottom left, curves up to top center, then down to bottom right */}
            <path
              id="flightPath"
              d="M -50 950 Q 400 100 700 200 Q 1000 300 1450 850"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="12 10"
              className="text-foreground/20"
              fill="none"
            />
            {/* Animated plane following the path */}
            <g className="plane-on-path">
              <svg x="-16" y="-16" width="32" height="32" viewBox="0 0 24 24" fill="hsl(var(--primary))" stroke="none">
                <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
              </svg>
            </g>
          </svg>
        </div>

        {/* Logo - Bottom Right */}
        <div className="absolute bottom-16 right-6 md:bottom-24 md:right-12 z-10">
          <div className="flex items-center gap-3">
            <div className="relative">
              <MapPin className="h-12 w-12 md:h-14 md:w-14 text-foreground" strokeWidth={1.5} />
              <Plane className="h-4 w-4 md:h-5 md:w-5 text-foreground absolute -right-1 bottom-0 transform rotate-[-135deg]" />
            </div>
            <div className="text-xl md:text-2xl font-bold tracking-wider">
              <span className="text-foreground">TRAVEL</span>
              <br />
              <span className="text-foreground">PLANNER </span>
              <span className="text-primary">AI</span>
            </div>
          </div>
        </div>
        {/* Main Content - Bottom Left */}
        <main className="absolute bottom-0 left-0 z-10 px-6 md:px-12 pb-16 md:pb-24">
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