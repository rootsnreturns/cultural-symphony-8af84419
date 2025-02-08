
const About = () => {
  return (
    <section className="py-20 bg-secondary" id="about">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">About Our Newsletter</h2>
          <p className="text-lg text-gray-300 mb-12 max-w-3xl mx-auto text-center">
            Roots N Returns Newsletter brings you exclusive insights, updates, and stories celebrating African innovation and diaspora collaboration—straight to your inbox.
          </p>
          <div className="relative h-[400px] md:h-[600px] rounded-lg overflow-hidden w-full max-w-5xl">
            <img 
              src="/lovable-uploads/051b5c2a-cb4f-4394-83a8-1850f36ebb3c.png"
              alt="African connectivity map"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/80 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
