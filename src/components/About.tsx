const About = () => {
  return (
    <section className="py-20 bg-secondary" id="about">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">About Our Mission</h2>
        <p className="text-lg text-gray-300 mb-12 max-w-3xl mx-auto text-center">
          Roots N Returns is more than just a podcast - it's a bridge connecting African innovation, culture, and success stories with the global diaspora. Through meaningful conversations, we explore the journeys of those making an impact across continents.
        </p>
        <div className="relative h-[400px] md:h-[600px] rounded-lg overflow-hidden">
          <img 
            src="/lovable-uploads/051b5c2a-cb4f-4394-83a8-1850f36ebb3c.png"
            alt="African connectivity map"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-secondary via-transparent to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default About;