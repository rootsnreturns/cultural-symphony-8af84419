
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import heroFarm from "@/assets/hero-farm-q1.jpg";

const Hero = () => {
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert([{ email, name: email }]);

      if (error) throw error;

      toast({
        title: "Successfully subscribed!",
        description: "Welcome to our community of changemakers!",
      });

      setEmail("");
    } catch (error: any) {
      toast({
        title: "Subscription failed",
        description: error.message === "duplicate key value violates unique constraint \"newsletter_subscribers_email_key\""
          ? "This email is already subscribed."
          : "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative h-[110vh] md:h-screen flex items-center justify-center overflow-hidden bg-secondary">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40 z-10" />
        <img
          src={heroFarm}
          alt="Clean, vibrant African farm landscape background"
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
        <form onSubmit={handleSubmit} className="mx-auto flex w-full max-w-xl gap-3">
          <Input
            type="email"
            placeholder="Enter your email"
            aria-label="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button type="submit" size="lg" className="text-lg font-semibold">
            {isLoading ? "Subscribing..." : t("hero.subscribeNow")}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Hero;
