import { useState } from "react";
import { useRoute, Link } from "wouter";
import { ShoppingCart, ChevronLeft, ZoomIn, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { trpc } from "@/lib/trpc";
import { useLanguage } from "@/contexts/LanguageContext";
import { ProductCard } from "@/components/ProductCard";
import { ProductReviews } from "@/components/ProductReviews";
import { toast } from "sonner";

const translations = {
  pt: {
    backToProducts: "Voltar aos Produtos",
    addToCart: "Adicionar ao Carrinho",
    inclVat: "IVA incluído (23% IVA)",
    exclVat: "excl. IVA",
    inStock: "Em Stock",
    outOfStock: "Esgotado",
    new: "Novo",
    bestSeller: "Mais Vendido",
    description: "Descrição",
    specifications: "Especificações",
    brand: "Marca",
    category: "Categoria",
    sku: "SKU",
    availability: "Disponibilidade",
    relatedProducts: "Produtos Relacionados",
    reviews: "Avaliações",
    noReviews: "Ainda não há avaliações para este produto.",
    addedToCart: "Produto adicionado ao carrinho!",
    productNotFound: "Produto não encontrado",
  },
  en: {
    backToProducts: "Back to Products",
    addToCart: "Add to Cart",
    inclVat: "VAT included (23% VAT)",
    exclVat: "excl. VAT",
    inStock: "In Stock",
    outOfStock: "Out of Stock",
    new: "New",
    bestSeller: "Best Seller",
    description: "Description",
    specifications: "Specifications",
    brand: "Brand",
    category: "Category",
    sku: "SKU",
    availability: "Availability",
    relatedProducts: "Related Products",
    reviews: "Reviews",
    noReviews: "No reviews yet for this product.",
    addedToCart: "Product added to cart!",
    productNotFound: "Product not found",
  },
};

export default function ProductDetail() {
  const [, params] = useRoute("/product/:slug");
  const { language } = useLanguage();
  const t = translations[language];
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const { data: product, isLoading } = trpc.products.getBySlug.useQuery(
    { slug: params?.slug || "" },
    { enabled: !!params?.slug }
  );

  const { data: allRelatedProducts } = trpc.products.filter.useQuery(
    {
      categoryIds: product?.categoryId ? [product.categoryId] : [],
    },
    { enabled: !!product?.categoryId }
  );

  const relatedProducts = allRelatedProducts?.slice(0, 4);

  const addToCartMutation = trpc.cart.add.useMutation({
    onSuccess: () => {
      toast.success(t.addedToCart);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleAddToCart = () => {
    if (product) {
      addToCartMutation.mutate({ productId: product.id, quantity: 1 });
    }
  };

  if (isLoading) {
    return (
      <div className="container py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-48 mb-8"></div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="aspect-square bg-muted rounded"></div>
            <div className="space-y-4">
              <div className="h-8 bg-muted rounded w-3/4"></div>
              <div className="h-6 bg-muted rounded w-1/2"></div>
              <div className="h-24 bg-muted rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">{t.productNotFound}</h1>
        <Link href="/">
          <Button>
            <ChevronLeft className="h-4 w-4 mr-2" />
            {t.backToProducts}
          </Button>
        </Link>
      </div>
    );
  }

  const productName = language === "pt" ? product.namePt : product.nameEn;
  const productDescription =
    language === "pt" ? product.descriptionPt : product.descriptionEn;

  // For now, we'll use the same image. In a real scenario, you'd have multiple images
  const images = [product.imageUrl, product.imageUrl, product.imageUrl].filter(
    Boolean
  ) as string[];

  const filteredRelatedProducts = relatedProducts?.filter(
    (p) => p.id !== product.id
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        {/* Back Button */}
        <Link href="/">
          <Button variant="ghost" className="mb-6">
            <ChevronLeft className="h-4 w-4 mr-2" />
            {t.backToProducts}
          </Button>
        </Link>

        {/* Product Details */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div
              className="relative aspect-square overflow-hidden rounded-lg bg-muted cursor-zoom-in"
              onClick={() => setIsZoomed(!isZoomed)}
            >
              {product.imageUrl ? (
                <img
                  src={product.imageUrl}
                  alt={productName}
                  className={`w-full h-full object-cover transition-transform duration-300 ${
                    isZoomed ? "scale-150" : "scale-100"
                  }`}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  No Image
                </div>
              )}
              <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm p-2 rounded-full">
                <ZoomIn className="h-5 w-5" />
              </div>
            </div>

            {/* Thumbnail Gallery */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === idx
                        ? "border-primary"
                        : "border-transparent hover:border-muted-foreground/50"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${productName} ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Badges */}
            <div className="flex gap-2">
              {product.isNew && <Badge className="badge-new">{t.new}</Badge>}
              {product.isBestSeller && (
                <Badge className="badge-bestseller">{t.bestSeller}</Badge>
              )}
            </div>

            {/* Brand */}
            {product.brand && (
              <p className="text-sm text-muted-foreground font-medium">
                {product.brand}
              </p>
            )}

            {/* Title */}
            <h1 className="text-3xl lg:text-4xl font-bold">{productName}</h1>

            {/* Price */}
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">
                {parseFloat(product.priceInclVat).toFixed(2)} €
              </div>
              <div className="text-sm text-muted-foreground">{t.inclVat}</div>
              <div className="text-sm text-muted-foreground">
                {parseFloat(product.priceExclVat).toFixed(2)} € {t.exclVat}
              </div>
            </div>

            {/* Availability */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{t.availability}:</span>
              <Badge
                variant={product.inStock ? "default" : "destructive"}
                className={product.inStock ? "bg-green-600" : ""}
              >
                {product.inStock ? t.inStock : t.outOfStock}
              </Badge>
              {product.inStock && product.stockQuantity && (
                <span className="text-sm text-muted-foreground">
                  ({product.stockQuantity} units)
                </span>
              )}
            </div>

            {/* Description */}
            <div>
              <h2 className="text-lg font-semibold mb-2">{t.description}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {productDescription}
              </p>
            </div>

            <Separator />

            {/* Specifications */}
            <div>
              <h2 className="text-lg font-semibold mb-3">{t.specifications}</h2>
              <dl className="grid grid-cols-2 gap-3 text-sm">
                {product.brand && (
                  <>
                    <dt className="font-medium text-muted-foreground">
                      {t.brand}:
                    </dt>
                    <dd className="font-medium">{product.brand}</dd>
                  </>
                )}
                <dt className="font-medium text-muted-foreground">{t.sku}:</dt>
                <dd className="font-medium">{product.slug.toUpperCase()}</dd>
              </dl>
            </div>

            {/* Add to Cart Button */}
            <Button
              size="lg"
              className="w-full"
              onClick={handleAddToCart}
              disabled={!product.inStock || addToCartMutation.isPending}
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              {t.addToCart}
            </Button>
          </div>
        </div>
        
        {/* Reviews Section */}
        <ProductReviews productId={product.id} language={language} />
        
        {/* Related Products */}
        {filteredRelatedProducts && filteredRelatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">{t.relatedProducts}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredRelatedProducts.map((relatedProduct) => (
                <ProductCard
                  key={relatedProduct.id}
                  id={relatedProduct.id}
                  slug={relatedProduct.slug}
                  name={
                    language === "pt"
                      ? relatedProduct.namePt
                      : relatedProduct.nameEn
                  }
                  brand={relatedProduct.brand || undefined}
                  priceExclVat={relatedProduct.priceExclVat}
                  priceInclVat={relatedProduct.priceInclVat}
                  imageUrl={relatedProduct.imageUrl || undefined}
                  isNew={relatedProduct.isNew || undefined}
                  isBestSeller={relatedProduct.isBestSeller || undefined}
                  inStock={relatedProduct.inStock || undefined}
                  language={language}
                  onAddToCart={(productId) => {
                    addToCartMutation.mutate({ productId, quantity: 1 });
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
