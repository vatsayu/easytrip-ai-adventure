import { Clock, Users, Zap, Shield, Sparkles, Globe } from "lucide-react";

const features = [
  {
    icon: Clock,
    title: "Never Miss a Moment",
    description: "Our smart AI tools optimize every hour of your trip, balancing must-see sights, hidden gems, and downtime — all while staying within your budget.",
  },
  {
    icon: Users,
    title: "Collaborate & Book Together",
    description: "Sync with friends or family in real-time, agree on plans, and book flights, hotels, and activities in seconds — no more endless debates.",
  },
  {
    icon: Zap,
    title: "Zero Effort, Best Deals",
    description: "We partner with trusted providers worldwide to bring real-time meta searched and curated offers, so you save money without hunting for deals.",
  },
  {
    icon: Sparkles,
    title: "AI-Powered Recommendations",
    description: "Get personalized suggestions based on your preferences, travel history, and trending destinations that match your style.",
  },
  {
    icon: Globe,
    title: "Global Coverage",
    description: "Plan trips to over 190 countries with local insights, cultural tips, and verified recommendations from our travel community.",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your travel data is encrypted and protected. Share itineraries securely with your travel companions without worries.",
  },
];

const WhyChoose = () => {
  return (
    <section id="why-easytrip" className="py-20 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Choose EasyTrip?
          </h2>
          <p className="text-lg text-muted-foreground">
            Budget-friendly travel planning made easy
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group bg-card rounded-2xl p-8 shadow-card hover:shadow-hover transition-all duration-300 hover:-translate-y-2 border border-border/50"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>

              {/* Title */}
              <h3 className="font-display text-xl font-bold text-foreground mb-3">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
