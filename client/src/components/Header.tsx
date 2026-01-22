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
    { name: t.smartphones, path: "/category/smartphones" },
    { name: t.tablets, path: "/category/tablets" },
    { name: t.wearables, path: "/category/wearables" },
    { name: t.accessories, path: "/category/accessories" },
    { name: t.laptops, path: "/category/laptops" },
    { name: t.tires, path: "/category/tires" },
    { name: t.fragrances, path: "/category/fragrances" },
  ];

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50 shadow-professional">
      <div className="container">
        {/* Main Header */}
        <div className="flex items-center justify-between py-4 gap-4">
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center cursor-pointer">
            <img 
              src="/logo-disparalinea.png" 
              alt="DISPARALINEA TRADING LDA" 
              className="h-20 w-auto object-contain"
            />
          </div>
        </Link>

        {/* Search Bar - Desktop */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-xl"
          >
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder={t.search}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4"
              />
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="hidden sm:flex">
                  <Globe className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => onLanguageChange?.("pt")}
                  className={currentLanguage === "pt" ? "bg-accent" : ""}
                >
                  🇵🇹 Português
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onLanguageChange?.("en")}
                  className={currentLanguage === "en" ? "bg-accent" : ""}
                >
                  🇺🇸 English
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Login Button */}
            <Button 
              variant="ghost" 
              size="sm"
              className="hidden sm:flex"
              onClick={() => window.location.href = '/api/oauth/login'}
            >
              {t.login}
            </Button>

            {/* Cart */}
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
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
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center gap-1 pb-3 border-t border-border pt-3">
          <Link href="/">
            <Button variant="ghost" size="sm">
              {t.home}
            </Button>
          </Link>
          {categories.map((category) => (
            <Link key={category.path} href={category.path}>
              <Button variant="ghost" size="sm">
                {category.name}
              </Button>
            </Link>
          ))}
          <Link href="/about">
            <Button variant="ghost" size="sm">
              {t.about}
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="ghost" size="sm">
              {t.contact}
            </Button>
          </Link>
        </nav>

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
