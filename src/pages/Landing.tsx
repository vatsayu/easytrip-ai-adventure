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
            offset-path: path('M 100 500 Q 600 -100 1100 500');
            offset-rotate: auto 90deg;
            animation: flyAlongArc 8s ease-in-out infinite;
          }
        `}</style>

        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 md:px-12">
          <div className="flex items-center gap-2">
            <MapPin className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold">
              Travel<br className="hidden" />
              <span className="text-foreground">Planner</span>
              <span className="text-primary">AI</span>
            </span>
          </div>
          <Link to="/home">
            <Button variant="outline" className="rounded-full px-6">
              <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
              EasyTrip
            </Button>
          </Link>
        </header>

        {/* Animated Dashed Arc */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <svg
            viewBox="0 0 1200 600"
            className="w-full max-w-5xl h-auto"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Dashed arc path */}
            <path
              id="flightPath"
              d="M 100 500 Q 600 -100 1100 500"
              stroke="currentColor"
              strokeWidth="3"
              strokeDasharray="20 15"
              className="text-foreground/40"
              fill="none"
            />
            {/* Animated plane following the path */}
            <g className="plane-on-path">
              <svg x="-16" y="-16" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>
              </svg>
            </g>
          </svg>
        </div>

        {/* Main Content */}
        <main className="relative z-10 flex flex-col items-start justify-end min-h-[80vh] px-6 md:px-12 pb-20">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="relative">
              <MapPin className="h-12 w-12 text-foreground" strokeWidth={1.5} />
              <Plane className="h-5 w-5 text-foreground absolute -right-1 -bottom-1 transform -rotate-45" />
            </div>
            <div className="text-3xl md:text-4xl font-bold tracking-tight">
              <span className="text-foreground">TRAVEL</span>
              <br />
              <span className="text-foreground">PLANNER </span>
              <span className="text-primary">AI</span>
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-foreground mb-8 max-w-3xl">
            Travel Planner AI is now{" "}
            <span className="font-bold text-primary">EasyTrip</span>
          </h1>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/home">
              <Button 
                size="lg" 
                className="rounded-full px-8 py-6 text-lg bg-primary hover:bg-primary/90 group relative overflow-hidden"
              >
                <span className="relative z-10">Plan Smarter on EasyTrip</span>
                <span className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
              </Button>
            </Link>
            <Link to="/home">
              <Button 
                variant="outline" 
                size="lg" 
                className="rounded-full px-8 py-6 text-lg border-2"
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
