import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Cookie } from "lucide-react";
import { Link } from "wouter";

interface CookieBannerProps {
  language?: "pt" | "en";
}

const translations = {
  pt: {
    title: "Utilizamos Cookies",
    description: "Este website utiliza cookies para melhorar a sua experiência de navegação, personalizar conteúdo e anúncios, fornecer funcionalidades de redes sociais e analisar o nosso tráfego. Ao clicar em \"Aceitar Tudo\", consente a utilização de todos os cookies.",
    privacy: "Política de Privacidade",
    customize: "Personalizar",
    rejectAll: "Rejeitar Tudo",
    acceptAll: "Aceitar Tudo",
  },
  en: {
    title: "We Use Cookies",
    description: "This website uses cookies to improve your browsing experience, personalize content and ads, provide social media features, and analyze our traffic. By clicking \"Accept All\", you consent to the use of all cookies.",
    privacy: "Privacy Policy",
    customize: "Customize",
    rejectAll: "Reject All",
    acceptAll: "Accept All",
  },
};

export function CookieBanner({ language = "en" }: CookieBannerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const t = translations[language];

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem("cookie-consent", "rejected");
    setIsVisible(false);
  };

  const handleCustomize = () => {
    // For now, just accept - can be expanded later
    handleAccept();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 animate-in slide-in-from-bottom-5">
      <Card className="max-w-4xl mx-auto shadow-2xl border-2">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <div className="flex-shrink-0">
              <Cookie className="h-8 w-8 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-2">{t.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.description}
              </p>
              <Link href="/privacy">
                <span className="text-sm text-primary hover:underline cursor-pointer">
                  {t.privacy}
                </span>
              </Link>
            </div>
            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCustomize}
                className="flex-1 md:flex-none"
              >
                {t.customize}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleReject}
                className="flex-1 md:flex-none"
              >
                {t.rejectAll}
              </Button>
              <Button
                size="sm"
                onClick={handleAccept}
                className="flex-1 md:flex-none"
              >
                {t.acceptAll}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
