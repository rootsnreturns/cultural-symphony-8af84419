import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const About = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState(localStorage.getItem('mapbox_token') || '');
  const [showMap, setShowMap] = useState(false);

  const initializeMap = () => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [0, 0],
      zoom: 2,
    });

    return () => {
      map.current?.remove();
    };
  };

  const handleTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('mapbox_token', mapboxToken);
    setShowMap(true);
    initializeMap();
  };

  useEffect(() => {
    if (mapboxToken && !map.current) {
      setShowMap(true);
      initializeMap();
    }
  }, []);

  return (
    <section className="py-20 bg-secondary" id="about">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">About Our Mission</h2>
        <p className="text-lg text-gray-300 mb-12 max-w-3xl mx-auto text-center">
          Roots N Returns is more than just a podcast - it's a bridge connecting African innovation, culture, and success stories with the global diaspora. Through meaningful conversations, we explore the journeys of those making an impact across continents.
        </p>
        {!showMap ? (
          <div className="max-w-md mx-auto mb-8">
            <form onSubmit={handleTokenSubmit} className="space-y-4">
              <div>
                <label htmlFor="mapbox-token" className="block text-white mb-2">
                  Enter your Mapbox Token to view the map
                </label>
                <input
                  id="mapbox-token"
                  type="text"
                  value={mapboxToken}
                  onChange={(e) => setMapboxToken(e.target.value)}
                  placeholder="pk.eyJ1..."
                  className="w-full p-2 rounded border border-gray-300 bg-white text-black"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-white py-2 px-4 rounded hover:bg-primary/90 transition-colors"
              >
                Load Map
              </button>
            </form>
            <p className="text-sm text-gray-400 mt-2">
              Get your token from{" "}
              <a
                href="https://www.mapbox.com/account/access-tokens"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                Mapbox Dashboard
              </a>
            </p>
          </div>
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