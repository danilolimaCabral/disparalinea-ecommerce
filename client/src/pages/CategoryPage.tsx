import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, SlidersHorizontal } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface CategoryPageProps {
  categorySlug: string;
  title: { en: string; pt: string };
  description: { en: string; pt: string };
}

export default function CategoryPage({ categorySlug, title, description }: CategoryPageProps) {
  const { language } = useLanguage();
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState("relevance");

  const { data: categories } = trpc.categories.list.useQuery();
  const category = categories?.find((c) => c.slug === categorySlug);
  const { data: products, isLoading } = trpc.products.getByCategory.useQuery(
    { categoryId: category?.id || 0 },
    { enabled: !!category }
  );

  const brands = products
    ? Array.from(new Set(products.map((p) => p.brand).filter((b): b is string => Boolean(b))))
    : [];

  const filteredProducts = products
    ?.filter((p) => {
      const price = parseFloat(p.priceInclVat);
      const matchesPrice = price >= priceRange[0] && price <= priceRange[1];
      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(p.brand || "");
      const matchesStock = !inStockOnly || p.inStock;
      return matchesPrice && matchesBrand && matchesStock;
    })
    .sort((a, b) => {
      if (sortBy === "price-asc") return parseFloat(a.priceInclVat) - parseFloat(b.priceInclVat);
      if (sortBy === "price-desc") return parseFloat(b.priceInclVat) - parseFloat(a.priceInclVat);
      if (sortBy === "name") {
        const aName = language === "en" ? a.nameEn : a.namePt;
        const bName = language === "en" ? b.nameEn : b.namePt;
        return aName.localeCompare(bName);
      }
      return 0;
    });

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const t = {
    filters: language === "en" ? "Filters" : "Filtros",
    price: language === "en" ? "Price Range" : "Faixa de Preço",
    brand: language === "en" ? "Brand" : "Marca",
    inStock: language === "en" ? "In Stock Only" : "Apenas em Estoque",
    sortBy: language === "en" ? "Sort By" : "Ordenar Por",
    relevance: language === "en" ? "Relevance" : "Relevância",
    priceAsc: language === "en" ? "Price: Low to High" : "Preço: Menor para Maior",
    priceDesc: language === "en" ? "Price: High to Low" : "Preço: Maior para Menor",
    name: language === "en" ? "Name" : "Nome",
    products: language === "en" ? "Products" : "Produtos",
    noProducts: language === "en" ? "No products found" : "Nenhum produto encontrado",
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary/90 to-primary py-16 border-b border-border">
        <div className="container relative z-10">
          <h1 className="text-4xl font-bold text-primary-foreground mb-3">
            {language === "en" ? title.en : title.pt}
          </h1>
          <p className="text-lg text-primary-foreground/90 max-w-2xl">
            {language === "en" ? description.en : description.pt}
          </p>
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/10"></div>
      </div>

      {/* Main Content */}
      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-lg p-6 sticky top-24 shadow-sm">
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-border">
                <SlidersHorizontal className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-bold text-foreground">{t.filters}</h2>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <Label className="text-sm font-semibold text-foreground mb-3 block">{t.price}</Label>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={5000}
                  step={50}
                  className="mb-2"
                />
                <div className="flex justify-between text-xs font-medium text-muted-foreground">
                  <span>€{priceRange[0]}</span>
                  <span>€{priceRange[1]}</span>
                </div>
              </div>

              {/* Brands */}
              {brands.length > 0 && (
                <div className="mb-6">
                  <Label className="text-sm font-semibold text-foreground mb-3 block">{t.brand}</Label>
                  <div className="space-y-2">
                    {brands.map((brand) => (
                      <div key={brand} className="flex items-center space-x-2">
                        <Checkbox
                          id={`brand-${brand}`}
                          checked={selectedBrands.includes(brand)}
                          onCheckedChange={() => toggleBrand(brand)}
                        />
                        <label
                          htmlFor={`brand-${brand}`}
                          className="text-sm text-foreground cursor-pointer hover:text-primary transition-colors"
                        >
                          {brand}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* In Stock */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="in-stock"
                  checked={inStockOnly}
                  onCheckedChange={(checked) => setInStockOnly(checked as boolean)}
                />
                <label htmlFor="in-stock" className="text-sm text-foreground cursor-pointer hover:text-primary transition-colors">
                  {t.inStock}
                </label>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Sort Bar */}
            <div className="flex items-center justify-between mb-6 bg-muted/30 p-4 rounded-lg border border-border/50">
              <p className="text-sm font-semibold text-foreground">
                {filteredProducts?.length || 0} {t.products}
              </p>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[200px] bg-background border-border">
                  <SelectValue placeholder={t.sortBy} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">{t.relevance}</SelectItem>
                  <SelectItem value="price-asc">{t.priceAsc}</SelectItem>
                  <SelectItem value="price-desc">{t.priceDesc}</SelectItem>
                  <SelectItem value="name">{t.name}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Products */}
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : filteredProducts && filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    slug={product.slug}
                    name={language === "en" ? product.nameEn : product.namePt}
                    brand={product.brand || undefined}
                    priceExclVat={product.priceExclVat}
                    priceInclVat={product.priceInclVat}
                    imageUrl={product.imageUrl || undefined}
                    isNew={product.isNew || undefined}
                    isBestSeller={product.isBestSeller || undefined}
                    inStock={product.inStock || undefined}
                    language={language}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-gray-400 text-lg">{t.noProducts}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
