import { Link } from "wouter";
import { Mail } from "lucide-react";

interface FooterProps {
  language?: "pt" | "en";
}

const translations = {
  pt: {
    products: "Produtos",
    smartphones: "Smartphones",
    tablets: "Tablets",
    wearables: "Wearables",
    accessories: "Acessórios",
    laptops: "Laptops",
    company: "Empresa",
    about: "Sobre Nós",
    markets: "Mercados",
    processes: "Processos",
    compliance: "Conformidade",
    certificates: "Certificados",
    contact: "Contacto",
    email: "disparalinea.lda@gmail.com",
    legal: "Legal",
    privacy: "Privacidade",
    terms: "Termos de Uso",
    rights: "© 2024 DisparaLinea Trading LDA. Todos os direitos reservados.",
  },
  en: {
    products: "Products",
    smartphones: "Smartphones",
    tablets: "Tablets",
    wearables: "Wearables",
    accessories: "Accessories",
    laptops: "Laptops",
    company: "Company",
    about: "About Us",
    markets: "Markets",
    processes: "Processes",
    compliance: "Compliance",
    certificates: "Certificates",
    contact: "Contact",
    email: "disparalinea.lda@gmail.com",
    legal: "Legal",
    privacy: "Privacy",
    terms: "Terms of Use",
    rights: "© 2024 DisparaLinea Trading LDA. All rights reserved.",
  },
};

export function Footer({ language = "en" }: FooterProps) {
  const t = translations[language];

  return (
    <footer className="bg-primary text-primary-foreground border-t border-primary-foreground/10">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Products */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{t.products}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/category/smartphones">
                  <span className="text-primary-foreground/80 hover:text-primary-foreground transition-colors cursor-pointer">
                    {t.smartphones}
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/category/tablets">
                  <span className="text-primary-foreground/80 hover:text-primary-foreground transition-colors cursor-pointer">
                    {t.tablets}
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/category/wearables">
                  <span className="text-primary-foreground/80 hover:text-primary-foreground transition-colors cursor-pointer">
                    {t.wearables}
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/category/accessories">
                  <span className="text-primary-foreground/80 hover:text-primary-foreground transition-colors cursor-pointer">
                    {t.accessories}
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/category/laptops">
                  <span className="text-primary-foreground/80 hover:text-primary-foreground transition-colors cursor-pointer">
                    {t.laptops}
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{t.company}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about">
                  <span className="text-primary-foreground/80 hover:text-primary-foreground transition-colors cursor-pointer">
                    {t.about}
                  </span>
                </Link>
              </li>
              <li>
                <span className="text-primary-foreground/80">{t.markets}</span>
              </li>
              <li>
                <span className="text-primary-foreground/80">{t.processes}</span>
              </li>
              <li>
                <span className="text-primary-foreground/80">{t.compliance}</span>
              </li>
              <li>
                <span className="text-primary-foreground/80">{t.certificates}</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{t.contact}</h3>
            <div className="flex items-center gap-2 text-primary-foreground/80">
              <Mail className="h-4 w-4" />
              <a href={`mailto:${t.email}`} className="hover:text-primary-foreground transition-colors">
                {t.email}
              </a>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{t.legal}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy">
                  <span className="text-primary-foreground/80 hover:text-primary-foreground transition-colors cursor-pointer">
                    {t.privacy}
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/terms">
                  <span className="text-primary-foreground/80 hover:text-primary-foreground transition-colors cursor-pointer">
                    {t.terms}
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-primary-foreground/10 text-center text-primary-foreground/60 text-sm">
          {t.rights}
        </div>
      </div>
    </footer>
  );
}
