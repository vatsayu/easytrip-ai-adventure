import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { MapPin, Plane, Globe, Compass, Map, Palmtree } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedPage } from "@/components/AnimatedPage";

const Landing = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const getParallaxStyle = (depth: number) => ({
    transform: `translate(${mousePosition.x * depth}px, ${mousePosition.y * depth}px)`,
    transition: 'transform 0.1s ease-out',
  });

  return (
    <AnimatedPage>
      <div className="min-h-screen bg-background relative overflow-hidden flex flex-col">
        {/* World map SVG background */}
        <div 
          className="absolute inset-0 pointer-events-none flex items-center justify-center"
          style={getParallaxStyle(5)}
        >
          <svg
            viewBox="0 0 1000 500"
            className="w-[120%] h-auto opacity-[0.04] dark:opacity-[0.06]"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
          >
            {/* Simplified world map outline */}
            {/* North America */}
            <path d="M150 120 Q180 100 220 110 Q260 105 280 120 Q300 140 290 160 Q280 180 250 190 Q220 195 200 180 Q180 165 160 170 Q140 175 130 160 Q120 145 150 120" />
            <path d="M180 190 Q200 200 220 210 Q240 230 250 260 Q245 280 220 285 Q190 280 170 260 Q155 240 160 220 Q165 200 180 190" />
            {/* South America */}
            <path d="M250 280 Q270 275 285 290 Q295 310 290 340 Q280 370 265 400 Q250 420 240 410 Q225 390 230 360 Q235 330 240 310 Q245 290 250 280" />
            {/* Europe */}
            <path d="M450 100 Q470 95 490 100 Q510 105 520 120 Q525 140 510 150 Q490 155 470 150 Q455 145 450 130 Q448 115 450 100" />
            {/* Africa */}
            <path d="M460 170 Q490 165 510 180 Q530 200 535 240 Q530 280 515 310 Q495 340 470 350 Q445 345 435 320 Q430 290 440 260 Q450 230 455 200 Q458 180 460 170" />
            {/* Asia */}
            <path d="M530 80 Q580 70 640 75 Q700 80 750 100 Q800 120 830 150 Q850 180 840 210 Q820 230 780 235 Q740 240 700 230 Q660 220 620 200 Q580 180 550 150 Q530 130 525 110 Q525 90 530 80" />
            {/* India */}
            <path d="M620 200 Q640 195 655 210 Q670 230 665 260 Q655 285 635 290 Q615 285 605 265 Q600 245 610 225 Q615 210 620 200" />
            {/* Southeast Asia */}
            <path d="M700 230 Q720 225 740 235 Q755 250 750 270 Q740 285 720 290 Q700 285 695 270 Q692 255 700 230" />
            {/* Australia */}
            <path d="M760 320 Q800 310 840 320 Q870 340 875 370 Q870 400 840 420 Q800 430 770 415 Q745 395 750 360 Q755 335 760 320" />
            {/* Japan */}
            <path d="M820 140 Q835 135 845 145 Q850 160 840 175 Q825 180 815 170 Q810 155 820 140" />
            {/* UK */}
            <path d="M435 105 Q445 100 450 110 Q448 120 440 125 Q432 120 435 105" />
            {/* Greenland */}
            <path d="M320 50 Q360 45 380 60 Q390 80 375 95 Q350 100 330 90 Q315 75 320 50" />
            {/* Iceland */}
            <path d="M400 70 Q415 65 420 75 Q418 85 405 88 Q395 85 400 70" />
            {/* New Zealand */}
            <path d="M890 400 Q905 395 910 410 Q905 425 895 430 Q880 425 885 410 Q888 400 890 400" />
            {/* Madagascar */}
            <path d="M560 340 Q575 335 580 350 Q578 370 565 380 Q555 375 555 360 Q555 345 560 340" />
          </svg>
        </div>

        {/* Animated gradient orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div 
            className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" 
            style={getParallaxStyle(15)}
          />
          <div 
            className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" 
            style={{ ...getParallaxStyle(20), animationDelay: '1s' }} 
          />
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" 
            style={getParallaxStyle(10)}
          />
        </div>

        {/* Floating travel icons with parallax */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <Plane 
            className="absolute top-[15%] left-[10%] w-8 h-8 text-primary/20 animate-float" 
            style={{ ...getParallaxStyle(30), animationDelay: '0s' }} 
          />
          <Globe 
            className="absolute top-[25%] right-[15%] w-10 h-10 text-primary/15 animate-float" 
            style={{ ...getParallaxStyle(25), animationDelay: '0.5s' }} 
          />
          <Compass 
            className="absolute bottom-[30%] left-[20%] w-6 h-6 text-primary/20 animate-float" 
            style={{ ...getParallaxStyle(35), animationDelay: '1s' }} 
          />
          <Map 
            className="absolute top-[60%] right-[10%] w-8 h-8 text-primary/15 animate-float" 
            style={{ ...getParallaxStyle(20), animationDelay: '1.5s' }} 
          />
          <Palmtree 
            className="absolute bottom-[20%] left-[8%] w-10 h-10 text-primary/10 animate-float" 
            style={{ ...getParallaxStyle(28), animationDelay: '2s' }} 
          />
          <Plane 
            className="absolute top-[40%] right-[25%] w-6 h-6 text-primary/10 animate-float rotate-45" 
            style={{ ...getParallaxStyle(40), animationDelay: '2.5s' }} 
          />
          <MapPin 
            className="absolute bottom-[40%] right-[30%] w-7 h-7 text-primary/15 animate-float" 
            style={{ ...getParallaxStyle(22), animationDelay: '3s' }} 
          />
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
