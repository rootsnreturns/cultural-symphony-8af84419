import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const About = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken = "YOUR_MAPBOX_TOKEN"; // Replace with your token
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [0, 0],
      zoom: 2,
    });

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
        <div className="relative h-[400px] md:h-[600px] rounded-lg overflow-hidden">
          <div ref={mapContainer} className="absolute inset-0" />
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-secondary via-transparent to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default About;