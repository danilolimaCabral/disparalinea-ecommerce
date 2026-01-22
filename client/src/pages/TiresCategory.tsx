import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { trpc } from "@/lib/trpc";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, SlidersHorizontal, X } from "lucide-react";

const translations = {
  pt: {
    title: "Pneus",
    subtitle: "Pneus de alta performance para todos os tipos de veículos",
    filters: "Filtros",
    clearFilters: "Limpar Filtros",
    brand: "Marca",
    priceRange: "Faixa de Preço",
    type: "Tipo",
    size: "Tamanho",
    inStock: "Apenas em Stock",
    sortBy: "Ordenar por",
    sortRelevance: "Relevância",
    sortPriceLow: "Preço: Menor para Maior",
    sortPriceHigh: "Preço: Maior para Menor",
    sortNewest: "Mais Recentes",
    noProducts: "Nenhum produto encontrado com os filtros selecionados",
    loading: "Carregando produtos...",
    addedToCart: "Produto adicionado ao carrinho!",
    summer: "Verão",
    winter: "Inverno",
    allSeason: "Todas as Estações",
    performance: "Performance",
  },
  en: {
    title: "Tires",
    subtitle: "High-performance tires for all types of vehicles",
    filters: "Filters",
    clearFilters: "Clear Filters",
    brand: "Brand",
    priceRange: "Price Range",
    type: "Type",
    size: "Size",
    inStock: "In Stock Only",
    sortBy: "Sort by",
    sortRelevance: "Relevance",
    sortPriceLow: "Price: Low to High",
    sortPriceHigh: "Price: High to Low",
    sortNewest: "Newest",
    noProducts: "No products found with the selected filters",
    loading: "Loading products...",
    addedToCart: "Product added to cart!",
    summer: "Summer",
    winter: "Winter",
    allSeason: "All Season",
    performance: "Performance",
  },
};

export default function TiresCategory() {
  const { language } = useLanguage();
  const t = translations[language];

  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState("relevance");
  const [showFilters, setShowFilters] = useState(true);

  const { data: categories } = trpc.categories.list.useQuery();
  const tiresCategory = categories?.find(c => c.slug === "tires");
  
  const { data: products, isLoading } = trpc.products.getByCategory.useQuery(
    { categoryId: tiresCategory?.id || 0 },
    { enabled: !!tiresCategory }
  );

  const addToCartMutation = trpc.cart.add.useMutation({
    onSuccess: () => {
      toast.success(t.addedToCart);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const brands = ["Michelin", "Bridgestone", "Pirelli", "Continental", "Goodyear", "Dunlop", "Yokohama", "Hankook", "Falken", "Toyo"];
  const types = [t.summer, t.winter, t.allSeason, t.performance];

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const clearFilters = () => {
    setSelectedBrands([]);
    setPriceRange([0, 500]);
    setSelectedTypes([]);
    setInStockOnly(false);
    setSortBy("relevance");
  };

  const filteredProducts = products
    ?.filter((product) => {
      if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand || "")) {
        return false;
      }
      const price = parseFloat(product.priceExclVat);
      if (price < priceRange[0] || price > priceRange[1]) {
        return false;
      }
      if (inStockOnly && !product.inStock) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "priceLow") {
        return parseFloat(a.priceExclVat) - parseFloat(b.priceExclVat);
      }
      if (sortBy === "priceHigh") {
        return parseFloat(b.priceExclVat) - parseFloat(a.priceExclVat);
      }
      if (sortBy === "newest") {
        return b.isNew ? 1 : -1;
      }
      return 0;
    });

  const handleAddToCart = (productId: number) => {
    addToCartMutation.mutate({ productId, quantity: 1 });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <div className="bg-primary text-primary-foreground py-16 gradient-overlay">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {t.title}
          </h1>
          <p className="text-lg md:text-xl opacity-90 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
            {t.subtitle}
          </p>
        </div>
      </div>

      <div className="container py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <aside
            className={`w-80 flex-shrink-0 transition-all duration-500 ${
              showFilters ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0 hidden"
            }`}
          >
            <Card className="card-glass sticky top-4 p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <SlidersHorizontal className="h-5 w-5" />
                  {t.filters}
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFilters(false)}
                  className="md:hidden"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Brand Filter */}
              <div className="space-y-3 animate-in fade-in slide-in-from-left duration-500">
                <h3 className="font-medium text-sm text-muted-foreground">{t.brand}</h3>
                <div className="space-y-2">
                  {brands.map((brand) => (
                    <div key={brand} className="flex items-center space-x-2">
                      <Checkbox
                        id={`brand-${brand}`}
                        checked={selectedBrands.includes(brand)}
                        onCheckedChange={() => toggleBrand(brand)}
                      />
                      <Label
                        htmlFor={`brand-${brand}`}
                        className="text-sm font-normal cursor-pointer"
                      >
                        {brand}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="space-y-3 animate-in fade-in slide-in-from-left duration-500 delay-100">
                <h3 className="font-medium text-sm text-muted-foreground">{t.priceRange}</h3>
                <div className="pt-2">
                  <Slider
                    value={priceRange}
                    onValueChange={(value) => setPriceRange(value as [number, number])}
                    max={500}
                    step={10}
                    className="mb-4"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>€{priceRange[0]}</span>
                    <span>€{priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Type Filter */}
              <div className="space-y-3 animate-in fade-in slide-in-from-left duration-500 delay-200">
                <h3 className="font-medium text-sm text-muted-foreground">{t.type}</h3>
                <div className="space-y-2">
                  {types.map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox
                        id={`type-${type}`}
                        checked={selectedTypes.includes(type)}
                        onCheckedChange={() => toggleType(type)}
                      />
                      <Label
                        htmlFor={`type-${type}`}
                        className="text-sm font-normal cursor-pointer"
                      >
                        {type}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* In Stock Filter */}
              <div className="flex items-center space-x-2 animate-in fade-in slide-in-from-left duration-500 delay-300">
                <Checkbox
                  id="inStock"
                  checked={inStockOnly}
                  onCheckedChange={(checked) => setInStockOnly(checked as boolean)}
                />
                <Label htmlFor="inStock" className="text-sm font-normal cursor-pointer">
                  {t.inStock}
                </Label>
              </div>

              {/* Clear Filters Button */}
              <Button
                variant="outline"
                className="w-full animate-in fade-in slide-in-from-left duration-500 delay-400"
                onClick={clearFilters}
              >
                {t.clearFilters}
              </Button>
            </Card>
          </aside>

          {/* Products Grid */}
          <main className="flex-1">
            {/* Sort and Filter Toggle */}
            <div className="flex items-center justify-between mb-6 animate-in fade-in slide-in-from-top duration-500">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden"
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                {t.filters}
              </Button>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="ml-auto px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="relevance">{t.sortRelevance}</option>
                <option value="priceLow">{t.sortPriceLow}</option>
                <option value="priceHigh">{t.sortPriceHigh}</option>
                <option value="newest">{t.sortNewest}</option>
              </select>
            </div>

            {/* Products */}
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="ml-3 text-muted-foreground">{t.loading}</span>
              </div>
            ) : filteredProducts && filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className="animate-in fade-in slide-in-from-bottom duration-500"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <ProductCard
                      id={product.id}
                      slug={product.slug}
                      name={language === "pt" ? product.namePt : product.nameEn}
                      brand={product.brand || undefined}
                      priceExclVat={product.priceExclVat}
                      priceInclVat={product.priceInclVat}
                      imageUrl={product.imageUrl || undefined}
                      isNew={product.isNew ?? false}
                      isBestSeller={product.isBestSeller ?? false}
                      inStock={product.inStock ?? true}
                      onAddToCart={handleAddToCart}
                      language={language}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg">{t.noProducts}</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
