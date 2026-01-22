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
    <Card className="group glass-card glass-hover overflow-hidden border-0 transition-all duration-300">
      <Link href={`/product/${slug}`}>
        <div className="relative aspect-square overflow-hidden bg-muted">
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

      <CardContent className="p-4">
        {brand && (
          <p className="text-sm text-muted-foreground font-medium mb-1">
            {brand}
          </p>
        )}
        <Link href={`/product/${slug}`}>
          <h3 className="font-semibold text-base line-clamp-2 hover:text-primary transition-colors cursor-pointer">
            {name}
          </h3>
        </Link>

        <div className="mt-3 space-y-1">
          <div className="price-with-vat">
            {parseFloat(priceInclVat).toFixed(2)} €
          </div>
          <div className="price-excl-vat">
            {t.inclVat}
          </div>
          <div className="price-excl-vat">
            {parseFloat(priceExclVat).toFixed(2)} € {t.exclVat}
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex gap-2">
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
