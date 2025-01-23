import { Link } from "react-router-dom";
import { Instagram, Twitter, Linkedin, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <img
              src="/lovable-uploads/a08a97f6-4435-4dd3-a725-4bde724605bf.png"
              alt="Roots N Returns"
              className="h-12 w-auto mb-4"
            />
            <p className="text-gray-400">
              Connecting Africa's present to its future through powerful stories and actionable insights.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/meet-the-host" className="text-gray-400 hover:text-primary">
                  Meet the Host
                </Link>
              </li>
              <li>
                <Link to="/impact-stories" className="text-gray-400 hover:text-primary">
                  Impact Stories
                </Link>
              </li>
              <li>
                <Link to="/get-involved" className="text-gray-400 hover:text-primary">
                  Get Involved
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary">
                <Youtube className="w-6 h-6" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <p className="text-gray-400">
              Email: hello@rootsnreturns.com
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800">
          <p className="text-gray-400 text-center">
            © 2025 Roots N Returns. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;