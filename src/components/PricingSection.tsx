import { Button } from "@/components/ui/button";
import { Check, Sparkles, Building2 } from "lucide-react";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Free Plan",
    credits: "2 Credits",
    price: "$0",
    originalPrice: "$10",
    description: "Free Forever. No subscription required.",
    features: [
      "Top Spots Unveiled",
      "Tailored Itineraries (up to 7 days)",
      "Optimal Timing",
      "Foodie Hotspots",
      "Prime Experiences",
      "Expense Tracking",
      "Community Plans",
      "City & Country Guides",
      "Smart Travel Optimization",
      "Invite Others (1 collaborator)",
      "Meta-searched Booking Links",
    ],
    cta: "Try Now - 2 Free Credits",
    popular: false,
    icon: Sparkles,
  },
  {
    name: "Paid Plan",
    credits: "5 Credits",
    price: "$5",
    originalPrice: "$20",
    description: "One-time payment. No subscription required.",
    features: [
      "Top Spots Unveiled",
      "Tailored Itineraries (up to 30 days)",
      "Optimal Timing",
      "Foodie Hotspots",
      "Prime Experiences",
      "Expense Tracking",
      "Community Plans",
      "City & Country Guides",
      "Smart Travel Optimization",
      "Invite Others (up to 5 collaborators)",
      "Meta-searched Booking Links",
    ],
    cta: "Sign in to Buy Credits",
    popular: true,
    icon: Sparkles,
  },
  {
    name: "Business Plan",
    credits: "Let's Talk",
    price: "Custom",
    originalPrice: "",
    description: "Perfect for travel agencies and enterprise partners.",
    features: [
      "All Paid Plan Features",
      "Itineraries (30+ days, advanced)",
      "White-labeled Experience",
      "Bulk Credit Packages",
      "API Access (on request)",
      "Early Access to New Features",
      "Custom Booking Flows",
      "Dedicated Account Manager",
      "Enhanced Analytics",
    ],
    cta: "Contact Us",
    popular: false,
    icon: Building2,
  },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-20 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Pricing
          </h2>
          <p className="text-lg text-muted-foreground">
            Make your Travel Plan Today
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-card rounded-2xl p-8 shadow-card hover:shadow-hover transition-all duration-300 border ${
                plan.popular
                  ? "border-primary ring-2 ring-primary/20 scale-105"
                  : "border-border/50"
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 gradient-primary text-primary-foreground text-sm font-semibold rounded-full">
                  Most Popular
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-4">
                  <plan.icon className="w-4 h-4" />
                  {plan.name}
                </div>

                <div className="mb-2">
                  <span className="font-display text-4xl font-bold text-foreground">
                    {plan.credits}
                  </span>
                </div>

                <div className="flex items-center justify-center gap-2">
                  {plan.originalPrice && (
                    <span className="text-muted-foreground line-through">
                      {plan.originalPrice}
                    </span>
                  )}
                  <span className="text-2xl font-bold text-primary">
                    {plan.price}
                  </span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Description */}
              <p className="text-sm text-muted-foreground text-center mb-6">
                {plan.description}
              </p>

              {/* CTA Button */}
              <Link to={plan.name === "Business Plan" ? "/contact" : "/auth"}>
                <Button
                  variant={plan.popular ? "hero" : "outline"}
                  className="w-full"
                  size="lg"
                >
                  {plan.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
