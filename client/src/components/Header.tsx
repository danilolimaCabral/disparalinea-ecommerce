import { useState } from "react";
import { Link } from "wouter";
import { ShoppingCart, Search, Globe, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  cartItemCount?: number;
  currentLanguage?: "pt" | "en";
  onLanguageChange?: (lang: "pt" | "en") => void;
  onSearch?: (query: string) => void;
}

const translations = {
  pt: {
    home: "Início",
    smartphones: "Smartphones",
    tablets: "Tablets",
    wearables: "Wearables",
    accessories: "Acessórios",
    laptops: "Laptops",
    tires: "Pneus",
    fragrances: "Fragrâncias",
    about: "Sobre Nós",
    contact: "Contacto",
    search: "Buscar produtos...",
    login: "Entrar",
  },
  en: {
    home: "Home",
    smartphones: "Smartphones",
    tablets: "Tablets",
    wearables: "Wearables",
    accessories: "Accessories",
    laptops: "Laptops",
    tires: "Tires",
    fragrances: "Fragrances",
    about: "About Us",
    contact: "Contact",
    search: "Search products...",
    login: "Login",
  },
};

export function Header({
  cartItemCount = 0,
  currentLanguage = "en",
  onLanguageChange,
  onSearch,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const t = translations[currentLanguage];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  const categories = [
    { name: t.smartphones, path: "/smartphones" },
    { name: t.tablets, path: "/tablets" },
    { name: t.wearables, path: "/wearables" },
    { name: t.accessories, path: "/accessories" },
    { name: t.laptops, path: "/laptops" },
    { name: t.tires, path: "/tires" },
    { name: t.fragrances, path: "/fragrances" },
  ];

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="container">
        {/* Main Header - Single Line with Navigation */}
        <div className="flex items-center justify-between py-4 gap-4">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center cursor-pointer flex-shrink-0">
              <img 
                src="/logo-disparalinea.png" 
                alt="DISPARALINEA TRADING LDA" 
                className="h-14 w-auto object-contain"
              />
            </div>
          </Link>

          {/* Navigation - Desktop */}
          <nav className="hidden lg:flex items-center gap-1 flex-1">
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-sm">
                {t.home}
              </Button>
            </Link>
            {categories.map((category) => (
              <Link key={category.path} href={category.path}>
                <Button variant="ghost" size="sm" className="text-sm">
                  {category.name}
                </Button>
              </Link>
            ))}
            <Link href="/about-us">
              <Button variant="ghost" size="sm" className="text-sm">
                {t.about}
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="ghost" size="sm" className="text-sm">
                {t.contact}
              </Button>
            </Link>
          </nav>

          {/* Actions - Right Side */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Search Icon */}
            <Button variant="ghost" size="icon" className="hidden sm:flex h-9 w-9 rounded-full hover:bg-accent">
              <Search className="h-4 w-4" />
            </Button>
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="hidden sm:flex h-9 w-9 rounded-full hover:bg-accent">
                  <Globe className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem
                  onClick={() => onLanguageChange?.("pt")}
                  className={currentLanguage === "pt" ? "bg-accent font-semibold" : ""}
                >
                  🇵🇹 Português
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onLanguageChange?.("en")}
                  className={currentLanguage === "en" ? "bg-accent font-semibold" : ""}
                >
                  🇺🇸 English
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Login Button */}
            <Button 
              variant="outline" 
              size="sm"
              className="hidden sm:flex h-9 px-4 rounded-full text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
              onClick={() => window.location.href = '/api/oauth/login'}
            >
              {t.login}
            </Button>

            {/* Cart */}
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative h-9 w-9 rounded-full hover:bg-accent">
                <ShoppingCart className="h-4 w-4" />
                {cartItemCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs font-bold rounded-full"
                  >
                    {cartItemCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden h-9 w-9 rounded-full"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border space-y-2">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder={t.search}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </form>

            <Link href="/">
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t.home}
              </Button>
            </Link>
            {categories.map((category) => (
              <Link key={category.path} href={category.path}>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {category.name}
                </Button>
              </Link>
            ))}
            <Link href="/about">
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t.about}
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t.contact}
              </Button>
            </Link>

            {/* Mobile Language Selector */}
            <div className="pt-4 border-t border-border">
              <p className="text-sm font-medium mb-2 px-3">Language</p>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => {
                  onLanguageChange?.("pt");
                  setMobileMenuOpen(false);
                }}
              >
                🇵🇹 Português
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => {
                  onLanguageChange?.("en");
                  setMobileMenuOpen(false);
                }}
              >
                🇺🇸 English
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
