import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { supabase } from "@/integrations/supabase/client";

const About = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapError, setMapError] = useState<string | null>(null);

  const initializeMap = async () => {
    try {
      if (!mapContainer.current) return;

      const { data, error } = await supabase.functions.invoke('get-mapbox-token');
      
      if (error) {
        throw new Error('Failed to fetch Mapbox token');
      }

      const { token } = data as { token: string };
      mapboxgl.accessToken = token;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/dark-v11",
        center: [0, 20], // Centered more on Africa
        zoom: 2,
      });

      // Add navigation controls
      map.current.addControl(new mapboxgl.NavigationControl());

    } catch (error) {
      console.error('Error initializing map:', error);
      setMapError('Failed to load the map. Please try again later.');
    }
  };

  useEffect(() => {
    initializeMap();
    return () => {
      map.current?.remove();
    };
  }, []);

  return (
    <section className="py-20 bg-secondary" id="about">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">About Our Mission</h2>
        <p className="text-lg text-gray-300 mb-12 max-w-3xl mx-auto text-center">
          Roots N Returns is more than just a podcast - it's a bridge connecting African innovation, culture, and success stories with the global diaspora. Through meaningful conversations, we explore the journeys of those making an impact across continents.
        </p>
        {mapError ? (
          <div className="text-red-500 text-center mb-8">{mapError}</div>
        ) : (
          <div className="relative h-[400px] md:h-[600px] rounded-lg overflow-hidden">
            <div ref={mapContainer} className="absolute inset-0" />
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-secondary via-transparent to-transparent" />
          </div>
        )}
      </div>
    </section>
  );
};

export default About;