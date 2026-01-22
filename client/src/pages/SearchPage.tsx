import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { useLanguage } from "@/contexts/LanguageContext";
import { ProductCard } from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

const translations = {
  pt: {
    title: "Resultados da Busca",
    searchPlaceholder: "Buscar produtos...",
    searchButton: "Buscar",
    clearButton: "Limpar",
    noResults: "Nenhum produto encontrado",
    noResultsDescription: "Tente usar palavras-chave diferentes ou navegue pelas nossas categorias.",
    resultsFor: "Resultados para",
    products: "produtos encontrados",
  },
  en: {
    title: "Search Results",
    searchPlaceholder: "Search products...",
    searchButton: "Search",
    clearButton: "Clear",
    noResults: "No products found",
    noResultsDescription: "Try using different keywords or browse our categories.",
    resultsFor: "Results for",
    products: "products found",
  },
};

export default function SearchPage() {
  const { language } = useLanguage();
  const [, setLocation] = useLocation();
  const t = translations[language];

  // Get query from URL
  const urlParams = new URLSearchParams(window.location.search);
  const initialQuery = urlParams.get("q") || "";

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [activeQuery, setActiveQuery] = useState(initialQuery);

  const { data: products, isLoading } = trpc.products.search.useQuery(
    { query: activeQuery },
    {
      enabled: activeQuery.length > 0,
      retry: false,
    }
  );

  useEffect(() => {
    // Update URL when search query changes
    if (activeQuery) {
      window.history.replaceState({}, "", `/search?q=${encodeURIComponent(activeQuery)}`);
    }
  }, [activeQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setActiveQuery(searchQuery.trim());
    }
  };

  const handleClear = () => {
    setSearchQuery("");
    setActiveQuery("");
    setLocation("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <div className="container py-8">
        {/* Search Bar */}
        <div className="max-w-3xl mx-auto mb-12">
          <form onSubmit={handleSearch} className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-12 h-14 text-lg rounded-full border-2 focus:border-primary"
                autoFocus
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
            <Button type="submit" size="lg" className="h-14 px-8 rounded-full">
              {t.searchButton}
            </Button>
          </form>
        </div>

        {/* Results Header */}
        {activeQuery && (
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">
              {t.resultsFor} "{activeQuery}"
            </h1>
            {!isLoading && products && (
              <p className="text-muted-foreground">
                {products.length} {t.products}
              </p>
            )}
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="h-96 bg-muted/50 rounded-xl animate-pulse"
              />
            ))}
          </div>
        )}

        {/* Results Grid */}
        {!isLoading && products && products.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                slug={product.slug}
                name={language === "pt" ? product.namePt : product.nameEn}
                brand={product.brand || ""}
                priceExclVat={product.priceExclVat}
                priceInclVat={product.priceInclVat}
                imageUrl={product.imageUrl || ""}
                isNew={product.isNew || false}
                isBestSeller={product.isBestSeller || false}
                inStock={product.inStock || false}
              />
            ))}
          </div>
        )}

        {/* No Results */}
        {!isLoading && activeQuery && products && products.length === 0 && (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <div className="mb-6">
                <Search className="h-20 w-20 mx-auto text-muted-foreground/50" />
              </div>
              <h2 className="text-2xl font-bold mb-3">{t.noResults}</h2>
              <p className="text-muted-foreground mb-6">
                {t.noResultsDescription}
              </p>
              <Button onClick={handleClear} variant="outline" size="lg">
                {t.clearButton}
              </Button>
            </div>
          </div>
        )}

        {/* Initial State (no search yet) */}
        {!activeQuery && (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <div className="mb-6">
                <Search className="h-20 w-20 mx-auto text-muted-foreground/50" />
              </div>
              <h2 className="text-2xl font-bold mb-3">{t.title}</h2>
              <p className="text-muted-foreground">
                {t.noResultsDescription}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
