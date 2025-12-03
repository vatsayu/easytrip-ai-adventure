import { MapPin, Users, Wallet, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: MapPin,
    title: "Plan",
    description: "Use our AI tools to plan and organize your perfect itinerary.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Users,
    title: "Refine",
    description: "Refine your plans in collaboration with fellow travelers.",
    color: "from-cyan-500 to-teal-500",
  },
  {
    icon: Wallet,
    title: "Get Deals",
    description: "Metasearch results for all your travels, in one place.",
    color: "from-teal-500 to-emerald-500",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            How it works?
          </h2>
          <p className="text-lg text-muted-foreground">
            Craft Your Ideal Journey in a few easy steps
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-6 relative">
          {steps.map((step, index) => (
            <div key={step.title} className="relative group">
              {/* Connector Arrow (hidden on mobile and last item) */}
              {index < steps.length - 1 && (
                <div className="hidden md:flex absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                  <ArrowRight className="w-6 h-6 text-primary/30" />
                </div>
              )}

              <div className="bg-card rounded-2xl p-8 shadow-card hover:shadow-hover transition-all duration-300 hover:-translate-y-2 h-full border border-border/50">
                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-6 shadow-soft group-hover:scale-110 transition-transform duration-300`}>
                  <step.icon className="w-8 h-8 text-primary-foreground" />
                </div>

                {/* Step Number */}
                <div className="text-sm font-semibold text-primary mb-2">
                  Step {index + 1}
                </div>

                {/* Title */}
                <h3 className="font-display text-xl font-bold text-foreground mb-3">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
