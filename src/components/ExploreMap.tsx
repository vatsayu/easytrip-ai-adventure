import { useEffect, useRef, useState } from "react";
import { Loader2, Compass } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type Destination = {
  name: string;
  country: string;
  description: string;
  position: { lat: number; lng: number };
  suggestedStyle: "adventure" | "cultural" | "relaxation" | "foodie" | "nightlife" | "family";
  suggestedBudget: "budget" | "moderate" | "luxury";
  suggestedInterests: string;
};

const POPULAR_DESTINATIONS: Destination[] = [
  { name: "Paris", country: "France", description: "City of Lights — Eiffel Tower, Louvre, world-class cuisine.", position: { lat: 48.8566, lng: 2.3522 }, suggestedStyle: "cultural", suggestedBudget: "moderate", suggestedInterests: "museums, architecture, French cuisine, wine tasting" },
  { name: "Tokyo", country: "Japan", description: "Neon-lit streets, ancient temples, sushi & cherry blossoms.", position: { lat: 35.6762, lng: 139.6503 }, suggestedStyle: "cultural", suggestedBudget: "moderate", suggestedInterests: "sushi, anime, temples, technology, cherry blossoms" },
  { name: "New York", country: "USA", description: "The city that never sleeps — Times Square, Central Park.", position: { lat: 40.7128, lng: -74.006 }, suggestedStyle: "nightlife", suggestedBudget: "moderate", suggestedInterests: "Broadway, museums, skyline, food tours" },
  { name: "Bali", country: "Indonesia", description: "Tropical beaches, rice terraces, spiritual retreats.", position: { lat: -8.3405, lng: 115.092 }, suggestedStyle: "relaxation", suggestedBudget: "budget", suggestedInterests: "beaches, yoga, surfing, rice terraces, temples" },
  { name: "Rome", country: "Italy", description: "Colosseum, Vatican, pasta & 2000 years of history.", position: { lat: 41.9028, lng: 12.4964 }, suggestedStyle: "cultural", suggestedBudget: "moderate", suggestedInterests: "ancient history, Italian food, art, gelato" },
  { name: "Dubai", country: "UAE", description: "Futuristic skyline, desert safaris, luxury shopping.", position: { lat: 25.2048, lng: 55.2708 }, suggestedStyle: "relaxation", suggestedBudget: "luxury", suggestedInterests: "shopping, desert safari, skyscrapers, fine dining" },
  { name: "Sydney", country: "Australia", description: "Iconic Opera House, harbor views, golden beaches.", position: { lat: -33.8688, lng: 151.2093 }, suggestedStyle: "adventure", suggestedBudget: "moderate", suggestedInterests: "beaches, Opera House, harbor cruise, Bondi" },
  { name: "Cape Town", country: "South Africa", description: "Table Mountain, vineyards, dramatic coastlines.", position: { lat: -33.9249, lng: 18.4241 }, suggestedStyle: "adventure", suggestedBudget: "moderate", suggestedInterests: "Table Mountain, safari, wine, coastal hikes" },
  { name: "Reykjavik", country: "Iceland", description: "Northern lights, geysers, glaciers & black sand beaches.", position: { lat: 64.1466, lng: -21.9426 }, suggestedStyle: "adventure", suggestedBudget: "luxury", suggestedInterests: "northern lights, glaciers, hot springs, hiking" },
  { name: "Rio de Janeiro", country: "Brazil", description: "Christ the Redeemer, Copacabana, vibrant carnival.", position: { lat: -22.9068, lng: -43.1729 }, suggestedStyle: "nightlife", suggestedBudget: "moderate", suggestedInterests: "samba, beaches, Christ the Redeemer, carnival" },
  { name: "Bangkok", country: "Thailand", description: "Street food, ornate temples, bustling markets.", position: { lat: 13.7563, lng: 100.5018 }, suggestedStyle: "foodie", suggestedBudget: "budget", suggestedInterests: "street food, temples, markets, Thai massage" },
  { name: "Marrakech", country: "Morocco", description: "Souks, palaces, riads & Sahara adventures.", position: { lat: 31.6295, lng: -7.9811 }, suggestedStyle: "cultural", suggestedBudget: "budget", suggestedInterests: "souks, riads, Sahara, Moroccan cuisine" },
];

let mapsScriptPromise: Promise<void> | null = null;

const loadGoogleMaps = (apiKey: string): Promise<void> => {
  if (typeof window === "undefined") return Promise.reject("No window");
  if ((window as any).google?.maps) return Promise.resolve();
  if (mapsScriptPromise) return mapsScriptPromise;

  mapsScriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=marker&v=weekly`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Google Maps"));
    document.head.appendChild(script);
  });
  return mapsScriptPromise;
};

interface ExploreMapProps {
  onSelectDestination?: (destination: {
    name: string;
    country: string;
    description: string;
    suggestedStyle: string;
    suggestedBudget: string;
    suggestedInterests: string;
  }) => void;
}

export const ExploreMap = ({ onSelectDestination }: ExploreMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<Destination | null>(null);

  useEffect(() => {
    let cancelled = false;

    const init = async () => {
      try {
        const { data, error: fnError } = await supabase.functions.invoke("get-maps-key");
        if (fnError || !data?.key) throw new Error(fnError?.message || "Could not load map key");
        await loadGoogleMaps(data.key);
        if (cancelled || !mapRef.current) return;

        const google = (window as any).google;
        const map = new google.maps.Map(mapRef.current, {
          center: { lat: 20, lng: 0 },
          zoom: 2,
          minZoom: 2,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          styles: [
            { elementType: "geometry", stylers: [{ color: "#1d2c4d" }] },
            { elementType: "labels.text.fill", stylers: [{ color: "#8ec3b9" }] },
            { elementType: "labels.text.stroke", stylers: [{ color: "#1a3646" }] },
            { featureType: "administrative.country", elementType: "geometry.stroke", stylers: [{ color: "#4b6878" }] },
            { featureType: "landscape", elementType: "geometry", stylers: [{ color: "#0e1626" }] },
            { featureType: "poi", stylers: [{ visibility: "off" }] },
            { featureType: "road", stylers: [{ visibility: "off" }] },
            { featureType: "transit", stylers: [{ visibility: "off" }] },
            { featureType: "water", elementType: "geometry", stylers: [{ color: "#0e1626" }] },
            { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#4e6d70" }] },
          ],
        });

        const infoWindow = new google.maps.InfoWindow();

        POPULAR_DESTINATIONS.forEach((dest) => {
          const marker = new google.maps.Marker({
            position: dest.position,
            map,
            title: dest.name,
            animation: google.maps.Animation.DROP,
          });

          marker.addListener("click", () => {
            setSelected(dest);
            infoWindow.setContent(`
              <div style="font-family: system-ui; padding: 4px 8px; max-width: 220px;">
                <div style="font-weight: 600; font-size: 14px; color: #111;">${dest.name}, ${dest.country}</div>
                <div style="font-size: 12px; color: #555; margin-top: 4px;">${dest.description}</div>
              </div>
            `);
            infoWindow.open({ anchor: marker, map });
            map.panTo(dest.position);
          });
        });

        setLoading(false);
      } catch (e: any) {
        if (!cancelled) {
          setError(e.message || "Failed to load map");
          setLoading(false);
        }
      }
    };

    init();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="bg-card rounded-2xl shadow-card border border-border/50 overflow-hidden">
      <div className="px-6 py-4 border-b border-border/50 flex items-center gap-2">
        <Compass className="w-5 h-5 text-primary" />
        <div>
          <h3 className="font-display text-lg font-bold text-foreground">Explore Popular Destinations</h3>
          <p className="text-xs text-muted-foreground">Click any pin to learn more & plan your trip</p>
        </div>
      </div>

      <div className="relative">
        <div ref={mapRef} className="w-full h-[400px] bg-muted" />
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted/80">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        )}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted p-6 text-center">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}
      </div>

      {selected && (
        <div className="p-4 border-t border-border/50 flex items-center justify-between gap-4">
          <div>
            <div className="font-semibold text-foreground">{selected.name}, {selected.country}</div>
            <div className="text-xs text-muted-foreground">{selected.description}</div>
          </div>
          {onSelectDestination && (
            <button
              onClick={() => onSelectDestination({
                name: selected.name,
                country: selected.country,
                description: selected.description,
                suggestedStyle: selected.suggestedStyle,
                suggestedBudget: selected.suggestedBudget,
                suggestedInterests: selected.suggestedInterests,
              })}
              className="shrink-0 text-xs font-medium px-3 py-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Plan trip here
            </button>
          )}
        </div>
      )}
    </div>
  );
};