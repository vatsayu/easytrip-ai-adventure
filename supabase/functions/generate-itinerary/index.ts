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

    const days = Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24)) + 1;

    const systemPrompt = `You are an expert travel planner. Create detailed, personalized travel itineraries that are practical and inspiring. Format your response in markdown with emojis for visual appeal. Include specific recommendations for restaurants, attractions, and activities. Be creative but realistic.`;

    const userPrompt = `Create a detailed ${days}-day travel itinerary for ${destination}.

Trip Details:
- Duration: ${days} days (${startDate} to ${endDate})
- Travelers: ${travelers} people
- Budget: ${budget || 'Flexible'}
- Travel Style: ${travelStyle || 'Mixed'}
- Special Interests: ${interests || 'None specified'}

Please include:
1. A trip overview section with key details
2. Day-by-day itinerary with morning, afternoon, and evening activities
3. Specific restaurant recommendations
4. Must-see attractions and hidden gems
5. Practical tips (transportation, best times to visit, etc.)
6. Estimated daily budget breakdown

Format the response in markdown with clear headers and emojis for visual appeal.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
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
          JSON.stringify({ error: "AI credits exhausted. Please add more credits to continue." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("Failed to generate itinerary");
    }

    const data = await response.json();
    const itinerary = data.choices?.[0]?.message?.content;

    if (!itinerary) {
      throw new Error("No itinerary generated");
    }

    return new Response(
      JSON.stringify({ itinerary }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in generate-itinerary:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
