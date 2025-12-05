import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { AnimatedPage } from "@/components/AnimatedPage";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Plane,
  MapPin,
  Calendar,
  Users,
  Wallet,
  Trash2,
  Eye,
  Plus,
  Loader2,
} from "lucide-react";
import { format } from "date-fns";

interface Trip {
  id: string;
  destination: string;
  start_date: string;
  end_date: string;
  travelers: number;
  budget: string | null;
  travel_style: string | null;
  interests: string[] | null;
  itinerary: any;
  created_at: string;
}

const MyTrips = () => {
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchTrips();
    }
  }, [user]);

  const fetchTrips = async () => {
    try {
      const { data, error } = await supabase
        .from("trips")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setTrips(data || []);
    } catch (error: any) {
      toast({
        title: "Error loading trips",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteTrip = async (id: string) => {
    try {
      const { error } = await supabase.from("trips").delete().eq("id", id);

      if (error) throw error;

      setTrips(trips.filter((trip) => trip.id !== id));
      if (selectedTrip?.id === id) {
        setSelectedTrip(null);
      }

      toast({
        title: "Trip deleted",
        description: "Your trip has been removed.",
      });
    } catch (error: any) {
      toast({
        title: "Error deleting trip",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const budgetLabels: Record<string, string> = {
    budget: "Budget-Friendly ($)",
    moderate: "Moderate ($$)",
    luxury: "Luxury ($$$)",
  };

  const styleLabels: Record<string, string> = {
    adventure: "Adventure & Outdoors",
    cultural: "Cultural & Historical",
    relaxation: "Relaxation & Wellness",
    foodie: "Food & Culinary",
    nightlife: "Nightlife & Entertainment",
    family: "Family-Friendly",
  };

  if (authLoading || loading) {
    return (
      <AnimatedPage>
        <div className="min-h-screen bg-background">
          <Navbar />
          <main className="pt-24 pb-20 flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </main>
        </div>
      </AnimatedPage>
    );
  }

  return (
    <AnimatedPage>
      <div className="min-h-screen bg-background">
        <Navbar />

        <main className="pt-24 pb-20">
          <div className="container mx-auto px-4 md:px-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <div>
                <h1 className="font-display text-3xl font-bold text-foreground mb-2">
                  My Trips
                </h1>
                <p className="text-muted-foreground">
                  View and manage your saved travel plans
                </p>
              </div>
              <Link to="/plan" className="mt-4 md:mt-0">
                <Button variant="hero">
                  <Plus className="w-4 h-4 mr-2" />
                  Plan New Trip
                </Button>
              </Link>
            </div>

            {trips.length === 0 ? (
              <div className="bg-card rounded-2xl shadow-card p-12 border border-border/50 text-center">
                <div className="w-20 h-20 rounded-full bg-secondary mx-auto flex items-center justify-center mb-6">
                  <Plane className="w-10 h-10 text-muted-foreground" />
                </div>
                <h2 className="font-display text-xl font-semibold text-foreground mb-2">
                  No trips yet
                </h2>
                <p className="text-muted-foreground mb-6">
                  Start planning your first adventure!
                </p>
                <Link to="/plan">
                  <Button variant="hero">
                    <Plus className="w-4 h-4 mr-2" />
                    Plan Your First Trip
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Trip List */}
                <div className="space-y-4">
                  {trips.map((trip) => (
                    <div
                      key={trip.id}
                      className={`bg-card rounded-xl p-6 border transition-all cursor-pointer ${
                        selectedTrip?.id === trip.id
                          ? "border-primary shadow-lg"
                          : "border-border/50 hover:border-primary/50"
                      }`}
                      onClick={() => setSelectedTrip(trip)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-display text-lg font-semibold text-foreground mb-2 flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-primary" />
                            {trip.destination}
                          </h3>
                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {format(new Date(trip.start_date), "MMM d")} -{" "}
                              {format(new Date(trip.end_date), "MMM d, yyyy")}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {trip.travelers} traveler{trip.travelers > 1 ? "s" : ""}
                            </span>
                            {trip.budget && (
                              <span className="flex items-center gap-1">
                                <Wallet className="w-4 h-4" />
                                {budgetLabels[trip.budget] || trip.budget}
                              </span>
                            )}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteTrip(trip.id);
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Trip Details */}
                <div className="bg-card rounded-2xl shadow-card p-8 border border-border/50 sticky top-24">
                  {selectedTrip ? (
                    <div>
                      <h3 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                        <Plane className="w-5 h-5 text-primary" />
                        {selectedTrip.destination} Itinerary
                      </h3>

                      <div className="space-y-3 mb-6 text-sm">
                        <div className="flex justify-between py-2 border-b border-border/50">
                          <span className="text-muted-foreground">Dates</span>
                          <span className="text-foreground">
                            {format(new Date(selectedTrip.start_date), "MMM d")} -{" "}
                            {format(new Date(selectedTrip.end_date), "MMM d, yyyy")}
                          </span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-border/50">
                          <span className="text-muted-foreground">Travelers</span>
                          <span className="text-foreground">{selectedTrip.travelers}</span>
                        </div>
                        {selectedTrip.budget && (
                          <div className="flex justify-between py-2 border-b border-border/50">
                            <span className="text-muted-foreground">Budget</span>
                            <span className="text-foreground">
                              {budgetLabels[selectedTrip.budget] || selectedTrip.budget}
                            </span>
                          </div>
                        )}
                        {selectedTrip.travel_style && (
                          <div className="flex justify-between py-2 border-b border-border/50">
                            <span className="text-muted-foreground">Style</span>
                            <span className="text-foreground">
                              {styleLabels[selectedTrip.travel_style] || selectedTrip.travel_style}
                            </span>
                          </div>
                        )}
                      </div>

                      {selectedTrip.itinerary && (
                        <div className="prose prose-sm max-w-none">
                          {/* Destination Image */}
                          {selectedTrip.itinerary?.image && (
                            <div className="mb-4 rounded-xl overflow-hidden">
                              <img
                                src={selectedTrip.itinerary.image}
                                alt={`${selectedTrip.destination}`}
                                className="w-full h-48 object-cover"
                              />
                            </div>
                          )}
                          <h4 className="font-semibold text-foreground mb-2">Itinerary</h4>
                          <div className="whitespace-pre-wrap text-foreground/90 leading-relaxed bg-secondary/30 rounded-lg p-4 max-h-96 overflow-y-auto">
                            {typeof selectedTrip.itinerary === "string"
                              ? selectedTrip.itinerary
                              : selectedTrip.itinerary?.text
                              ? selectedTrip.itinerary.text
                              : JSON.stringify(selectedTrip.itinerary, null, 2)}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
                        <Eye className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <p className="text-muted-foreground">
                        Select a trip to view details
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </AnimatedPage>
  );
};

export default MyTrips;
