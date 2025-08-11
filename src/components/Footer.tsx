
import { Link } from "react-router-dom";
import { Linkedin } from "lucide-react";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  
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
              {t("footer.description")}
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">{t("footer.quickLinks")}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/posts" className="text-gray-400 hover:text-primary">
                  {t("navigation.stories")}
                </Link>
              </li>
              <li>
                <Link to="/archives" className="text-gray-400 hover:text-primary">
                  {t("footer.archives")}
                </Link>
              </li>
              <li>
                <Link to="/sponsor" className="text-gray-400 hover:text-primary">
                  {t("footer.sponsor")}
                </Link>
              </li>
              <li>
                <a href="https://rss.beehiiv.com/feeds/O10YsDPvqE.xml" className="text-gray-400 hover:text-primary" target="_blank" rel="noopener noreferrer">
                  {t("footer.rss")}
                </a>
              </li>
              <li>
                <Link to="/get-involved" className="text-gray-400 hover:text-primary">
                  {t("footer.getInvolved")}
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">{t("footer.connect")}</h3>
            <div className="flex space-x-4">
              <a href="https://x.com/rootsnreturns" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary">
                <svg
                  viewBox="0 0 24 24"
                  className="w-6 h-6"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="https://www.linkedin.com/company/roots-n-returns/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary">
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">{t("footer.contact")}</h3>
            <p className="text-gray-400">
              {t("footer.email")}
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800">
          <p className="text-gray-400 text-center">
            {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
