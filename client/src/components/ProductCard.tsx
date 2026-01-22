import { Link } from "wouter";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  id: number;
  slug: string;
  name: string;
  brand?: string;
  priceExclVat: string;
  priceInclVat: string;
  imageUrl?: string;
  isNew?: boolean;
  isBestSeller?: boolean;
  inStock?: boolean;
  onAddToCart?: (productId: number) => void;
  language?: "pt" | "en";
}

const translations = {
  pt: {
    inclVat: "IVA incluído (23% IVA)",
    exclVat: "excl. IVA",
    viewDetails: "Ver Detalhes",
    addToCart: "Adicionar",
    outOfStock: "Esgotado",
    new: "Novo",
    bestSeller: "Mais Vendido",
  },
  en: {
    inclVat: "VAT included (23% VAT)",
    exclVat: "excl. VAT",
    viewDetails: "View Details",
    addToCart: "Add to Cart",
    outOfStock: "Out of Stock",
    new: "New",
    bestSeller: "Best Seller",
  },
};

export function ProductCard({
  id,
  slug,
  name,
  brand,
  priceExclVat,
  priceInclVat,
  imageUrl,
  isNew,
  isBestSeller,
  inStock = true,
  onAddToCart,
  language = "en",
}: ProductCardProps) {
  const t = translations[language];

  return (
    <Card className="group overflow-hidden border border-border/50 hover:border-primary/50 hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur-sm">
      <Link href={`/product/${slug}`}>
        <div className="relative aspect-square overflow-hidden bg-muted/30">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              No Image
            </div>
          )}
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-2">
            {isNew && (
              <Badge className="badge-new">{t.new}</Badge>
            )}
            {isBestSeller && (
              <Badge className="badge-bestseller">{t.bestSeller}</Badge>
            )}
          </div>

          {!inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-semibold">{t.outOfStock}</span>
            </div>
          )}
        </div>
      </Link>

      <CardContent className="p-5">
        {brand && (
          <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide mb-2">
            {brand}
          </p>
        )}
        <Link href={`/product/${slug}`}>
          <h3 className="font-semibold text-base line-clamp-2 hover:text-primary transition-colors cursor-pointer leading-snug">
            {name}
          </h3>
        </Link>

        <div className="mt-4 space-y-0.5">
          <div className="text-2xl font-bold text-primary">
            {parseFloat(priceInclVat).toFixed(2)} €
          </div>
          <div className="text-xs text-muted-foreground">
            {t.inclVat}
          </div>
          <div className="text-xs text-muted-foreground">
            {parseFloat(priceExclVat).toFixed(2)} € {t.exclVat}
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-5 pt-0 flex gap-2">
        <Link href={`/product/${slug}`} className="flex-1">
          <Button variant="outline" className="w-full" size="sm">
            {t.viewDetails}
          </Button>
        </Link>
        {inStock && onAddToCart && (
          <Button
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              onAddToCart(id);
            }}
            className="flex-shrink-0"
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
