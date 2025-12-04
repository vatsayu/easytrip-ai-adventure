import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plane,
  MapPin,
  Calendar,
  Users,
  Wallet,
  Sparkles,
  Loader2,
  Save,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AnimatedPage } from "@/components/AnimatedPage";

const budgetOptions = [
  { value: "budget", label: "Budget-Friendly ($)", description: "Hostels, street food, public transport" },
  { value: "moderate", label: "Moderate ($$)", description: "Mid-range hotels, local restaurants" },
  { value: "luxury", label: "Luxury ($$$)", description: "Premium hotels, fine dining, private tours" },
];

const travelStyleOptions = [
  { value: "adventure", label: "Adventure & Outdoors" },
  { value: "cultural", label: "Cultural & Historical" },
  { value: "relaxation", label: "Relaxation & Wellness" },
  { value: "foodie", label: "Food & Culinary" },
  { value: "nightlife", label: "Nightlife & Entertainment" },
  { value: "family", label: "Family-Friendly" },
];

const PlanTrip = () => {
  const { toast } = useToast();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    travelers: "2",
    budget: "",
    travelStyle: "",
    interests: "",
  });

  // Redirect to auth if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to plan and save your trips.",
      });
      navigate("/auth");
    }
  }, [user, authLoading, navigate, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.destination || !formData.startDate || !formData.endDate) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    setGeneratedPlan(null);

    try {
      const response = await supabase.functions.invoke("generate-itinerary", {
        body: {
          destination: formData.destination,
          startDate: formData.startDate,
          endDate: formData.endDate,
          travelers: formData.travelers,
          budget: budgetOptions.find(b => b.value === formData.budget)?.label || "Flexible",
          travelStyle: travelStyleOptions.find(s => s.value === formData.travelStyle)?.label || "Mixed",
          interests: formData.interests,
        },
      });

      if (response.error) {
        throw new Error(response.error.message || "Failed to generate itinerary");
      }

      const data = response.data;
      if (data.error) {
        throw new Error(data.error);
      }

      setGeneratedPlan(data.itinerary);
      toast({
        title: "Itinerary Generated!",
        description: "Your personalized travel plan is ready. Click 'Save Trip' to keep it.",
      });
    } catch (error: any) {
      toast({
        title: "Generation failed",
        description: error.message || "Failed to generate itinerary. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const saveTrip = async () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to save your trip.",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }

    setIsSaving(true);

    try {
      const { error } = await supabase.from("trips").insert({
        user_id: user.id,
        destination: formData.destination,
        start_date: formData.startDate,
        end_date: formData.endDate,
        travelers: parseInt(formData.travelers),
        budget: formData.budget || null,
        travel_style: formData.travelStyle || null,
        interests: formData.interests ? formData.interests.split(",").map(i => i.trim()) : null,
        itinerary: generatedPlan,
      });

      if (error) throw error;

      toast({
        title: "Trip saved!",
        description: "Your trip has been saved to your account.",
      });

      navigate("/my-trips");
    } catch (error: any) {
      toast({
        title: "Error saving trip",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const calculateDays = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays + 1;
  };

  if (authLoading) {
    return (
      <AnimatedPage>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
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
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              AI Trip Planner
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Plan Your Perfect Trip with EasyTrip AI
            </h1>
            <p className="text-lg text-muted-foreground">
              Tell us about your dream destination and let our AI create a personalized itinerary just for you.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Form */}
            <div className="bg-card rounded-2xl shadow-card p-8 border border-border/50">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Destination */}
                <div className="space-y-2">
                  <Label htmlFor="destination" className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    Where do you want to go? *
                  </Label>
                  <Input
                    id="destination"
                    placeholder="e.g., Tokyo, Japan or Paris, France"
                    className="h-12"
                    value={formData.destination}
                    onChange={(e) =>
                      setFormData({ ...formData, destination: e.target.value })
                    }
                    required
                  />
                </div>

                {/* Dates */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate" className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary" />
                      Start Date *
                    </Label>
                    <Input
                      id="startDate"
                      type="date"
                      className="h-12"
                      value={formData.startDate}
                      onChange={(e) =>
                        setFormData({ ...formData, startDate: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">End Date *</Label>
                    <Input
                      id="endDate"
                      type="date"
                      className="h-12"
                      value={formData.endDate}
                      onChange={(e) =>
                        setFormData({ ...formData, endDate: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                {/* Travelers */}
                <div className="space-y-2">
                  <Label htmlFor="travelers" className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-primary" />
                    Number of Travelers
                  </Label>
                  <Select
                    value={formData.travelers}
                    onValueChange={(value) =>
                      setFormData({ ...formData, travelers: value })
                    }
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select travelers" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num} {num === 1 ? "Traveler" : "Travelers"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Budget */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Wallet className="w-4 h-4 text-primary" />
                    Budget Range
                  </Label>
                  <Select
                    value={formData.budget}
                    onValueChange={(value) =>
                      setFormData({ ...formData, budget: value })
                    }
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select your budget" />
                    </SelectTrigger>
                    <SelectContent>
                      {budgetOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <div>
                            <div className="font-medium">{option.label}</div>
                            <div className="text-xs text-muted-foreground">
                              {option.description}
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Travel Style */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    Travel Style
                  </Label>
                  <Select
                    value={formData.travelStyle}
                    onValueChange={(value) =>
                      setFormData({ ...formData, travelStyle: value })
                    }
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select your travel style" />
                    </SelectTrigger>
                    <SelectContent>
                      {travelStyleOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Interests */}
                <div className="space-y-2">
                  <Label htmlFor="interests">Special Interests (Optional)</Label>
                  <Input
                    id="interests"
                    placeholder="e.g., photography, hiking, museums, local cuisine"
                    className="h-12"
                    value={formData.interests}
                    onChange={(e) =>
                      setFormData({ ...formData, interests: e.target.value })
                    }
                  />
                </div>

                <Button
                  type="submit"
                  variant="hero"
                  className="w-full"
                  size="xl"
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Generating Your Itinerary...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Generate My Trip Plan
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Preview/Result */}
            <div className="bg-card rounded-2xl shadow-card p-8 border border-border/50">
              <h3 className="font-display text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                <Plane className="w-5 h-5 text-primary" />
                Your Itinerary Preview
              </h3>

              {isGenerating ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mb-6 animate-pulse">
                    <Sparkles className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <p className="text-muted-foreground text-center">
                    Our AI is crafting your perfect itinerary...
                  </p>
                </div>
              ) : generatedPlan ? (
                <div>
                  <div className="prose prose-sm max-w-none mb-6">
                    <div className="whitespace-pre-wrap text-foreground/90 leading-relaxed max-h-96 overflow-y-auto">
                      {generatedPlan}
                    </div>
                  </div>
                  <Button
                    onClick={saveTrip}
                    variant="hero"
                    className="w-full"
                    disabled={isSaving}
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-5 h-5" />
                        Save Trip
                      </>
                    )}
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-6">
                    <MapPin className="w-10 h-10 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground mb-2">
                    Fill in the form and click "Generate" to see your personalized travel plan.
                  </p>
                  <p className="text-sm text-muted-foreground/70">
                    You have 2 free credits to get started!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        </main>

        <Footer />
      </div>
    </AnimatedPage>
  );
};

export default PlanTrip;
