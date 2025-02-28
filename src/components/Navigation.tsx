
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { BookOpen, Handshake, Info, Menu } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerClose,
} from "@/components/ui/drawer";
import { useTranslation } from "react-i18next";
import LanguageSelector from "./LanguageSelector";

const Navigation = () => {
  const isMobile = useIsMobile();
  const { t } = useTranslation();

  const navLinks = [
    {
      to: "/about",
      icon: <Info className="h-4 w-4" />,
      label: t("navigation.about"),
    },
    {
      to: "/posts",
      icon: <BookOpen className="h-4 w-4" />,
      label: t("navigation.stories"),
    },
    {
      to: "/get-involved",
      icon: <Handshake className="h-4 w-4" />,
      label: t("navigation.getInvolved"),
    },
  ];

  const MobileMenu = () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden text-white">
          <Menu className="h-6 w-6" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="bg-black p-6">
        <div className="flex flex-col space-y-4">
          {navLinks.map((link) => (
            <DrawerClose asChild key={link.to}>
              <Link
                to={link.to}
                className="text-white hover:text-primary px-3 py-2 flex items-center gap-2 text-lg"
              >
                {link.icon}
                {link.label}
              </Link>
            </DrawerClose>
          ))}
          <DrawerClose asChild>
            <Link 
              to="/sponsor" 
              className="bg-white text-black hover:bg-gray-100 px-4 py-2 rounded-md transition-colors text-center"
            >
              {t("navigation.sponsor")}
            </Link>
          </DrawerClose>
          <div className="pt-2">
            <LanguageSelector />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );

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
          
          {/* Mobile Menu */}
          {isMobile ? (
            <div className="flex items-center">
              <LanguageSelector />
              <MobileMenu />
            </div>
          ) : (
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="text-white hover:text-primary px-3 py-2 flex items-center gap-2"
                  >
                    {link.icon}
                    {link.label}
                  </Link>
                ))}
                <Link 
                  to="/sponsor" 
                  className="bg-white text-black hover:bg-gray-100 px-4 py-2 rounded-md transition-colors"
                >
                  {t("navigation.sponsor")}
                </Link>
                <LanguageSelector />
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
