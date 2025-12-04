import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { destination, startDate, endDate, travelers, budget, travelStyle, interests } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    const days = Math.ceil((endDateObj.getTime() - startDateObj.getTime()) / (1000 * 60 * 60 * 24)) + 1;

    const budgetDescriptions: Record<string, string> = {
      budget: "budget-friendly with hostels, street food, and public transport",
      moderate: "moderate with mid-range hotels and local restaurants",
      luxury: "luxury with premium hotels, fine dining, and private tours",
    };

    const prompt = `Create a detailed ${days}-day travel itinerary for ${destination}.

Trip Details:
- Duration: ${days} days (${startDate} to ${endDate})
- Travelers: ${travelers} people
- Budget: ${budgetDescriptions[budget] || "flexible budget"}
- Travel Style: ${travelStyle || "mixed experiences"}
- Special Interests: ${interests || "general sightseeing"}

Please provide a comprehensive day-by-day itinerary with:
1. Morning, afternoon, and evening activities for each day
2. Specific places to visit with brief descriptions
3. Restaurant and food recommendations
4. Practical tips and estimated costs
5. Best times to visit each attraction

Format each day clearly with activities, timings, and helpful tips. Make it engaging and practical.`;

    console.log("Generating itinerary for:", destination, "Days:", days);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: "You are an expert travel planner with extensive knowledge of destinations worldwide. Create detailed, personalized travel itineraries that are practical, engaging, and tailored to the traveler's preferences. Include local insights, hidden gems, and practical tips. Use emojis to make the itinerary visually appealing.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add credits to continue." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const itineraryText = data.choices?.[0]?.message?.content;

    if (!itineraryText) {
      throw new Error("No itinerary generated");
    }

    console.log("Itinerary generated successfully");

    return new Response(
      JSON.stringify({ 
        itinerary: itineraryText,
        metadata: {
          destination,
          days,
          travelers,
          budget,
          travelStyle,
        }
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error generating itinerary:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Failed to generate itinerary" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
