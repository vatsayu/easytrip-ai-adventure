import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const trips = [
  {
    id: 1,
    title: "Georgia",
    image: "https://images.unsplash.com/photo-1565008576549-57569a49371d?w=800&q=80",
    days: 7,
  },
  {
    id: 2,
    title: "Thailand | Vietnam | Cambodia",
    image: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=800&q=80",
    days: 14,
  },
  {
    id: 3,
    title: "New Zealand | Bora Bora | Fiji",
    image: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=800&q=80",
    days: 21,
  },
  {
    id: 4,
    title: "Japan | South Korea",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80",
    days: 12,
  },
  {
    id: 5,
    title: "Spain | France | Italy",
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&q=80",
    days: 18,
  },
  {
    id: 6,
    title: "Egypt | Cairo | Luxor",
    image: "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?w=800&q=80",
    days: 10,
  },
];

const CommunityTrips = () => {
  return (
    <section id="community" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Community's Favorite Trips
          </h2>
          <p className="text-lg text-muted-foreground">
            Get inspired by itineraries created by fellow EasyTrip travelers
          </p>
        </div>

        {/* Trips Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.map((trip) => (
            <Link
              key={trip.id}
              to={`/trip/${trip.id}`}
              className="group relative rounded-2xl overflow-hidden shadow-card hover:shadow-hover transition-all duration-500 hover:-translate-y-2"
            >
              {/* Image */}
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={trip.image}
                  alt={`${trip.title} travel destination`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-2 text-primary-foreground/80 text-sm mb-2">
                  <MapPin className="w-4 h-4" />
                  <span>{trip.days} Days</span>
                </div>
                <h3 className="font-display text-xl font-bold text-primary-foreground group-hover:text-primary transition-colors">
                  {trip.title}
                </h3>
              </div>

              {/* Hover Arrow */}
              <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-card/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ArrowRight className="w-5 h-5 text-primary-foreground" />
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link to="/community">
            <Button variant="outline" size="lg" className="group">
              View All Community Plans
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CommunityTrips;
