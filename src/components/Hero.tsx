
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const { t } = useTranslation();

  const handleSubscribe = () => {
    window.open('https://rootsnreturns.beehiiv.com/subscribe', '_blank');
  };

  return (
    <div className="relative h-[120vh] md:h-screen flex items-center justify-center overflow-hidden bg-secondary">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40 z-10" />
        <img
          src="/lovable-uploads/086ff8ab-83b0-4cd9-b22b-961374220df8.png"
          alt="African cultural background"
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="container relative mx-auto px-4 z-20 text-center max-w-4xl translate-y-12">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
          {t("hero.headline")}
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 mb-8 mx-auto">
          {t("hero.subheader")}
        </p>
        <ul className="text-left md:text-center space-y-3 text-gray-200 mb-10">
          <li className="flex items-start md:justify-center gap-3">
            <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
            <span>{t("hero.bullets.deepDives")}</span>
          </li>
          <li className="flex items-start md:justify-center gap-3">
            <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
            <span>{t("hero.bullets.stories")}</span>
          </li>
          <li className="flex items-start md:justify-center gap-3">
            <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
            <span>{t("hero.bullets.checklists")}</span>
          </li>
        </ul>
        <Button 
          size="lg" 
          className="bg-primary hover:bg-primary/90 text-lg"
          onClick={handleSubscribe}
        >
          {t("hero.subscribeNow")} <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default Hero;
