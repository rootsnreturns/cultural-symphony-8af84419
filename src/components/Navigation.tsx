
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const Navigation = () => {
  return (
    <nav className="bg-black/90 fixed w-full z-50 top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          <div className="flex-shrink-0">
            <Link to="/">
              <img
                src="/lovable-uploads/a08a97f6-4435-4dd3-a725-4bde724605bf.png"
                alt="Roots N Returns"
                className="h-20 w-auto py-2"
              />
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/meet-the-host" className="text-white hover:text-primary px-3 py-2">
                Meet the Founder
              </Link>
              <Link to="/get-involved" className="text-white hover:text-primary px-3 py-2">
                Get Involved
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
