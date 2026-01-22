import { Link } from "wouter";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { trpc } from "@/lib/trpc";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";

const translations = {
  pt: {
    cart: "Carrinho de Compras",
    emptyCart: "Seu carrinho está vazio",
    continueShopping: "Continuar Comprando",
    product: "Produto",
    price: "Preço",
    quantity: "Quantidade",
    total: "Total",
    subtotal: "Subtotal",
    vat: "IVA (23%)",
    grandTotal: "Total Geral",
    proceedToCheckout: "Finalizar Compra",
    remove: "Remover",
    inclVat: "IVA incluído",
    exclVat: "excl. IVA",
  },
  en: {
    cart: "Shopping Cart",
    emptyCart: "Your cart is empty",
    continueShopping: "Continue Shopping",
    product: "Product",
    price: "Price",
    quantity: "Quantity",
    total: "Total",
    subtotal: "Subtotal",
    vat: "VAT (23%)",
    grandTotal: "Grand Total",
    proceedToCheckout: "Proceed to Checkout",
    remove: "Remove",
    inclVat: "VAT included",
    exclVat: "excl. VAT",
  },
};

export default function Cart() {
  const { language } = useLanguage();
  const t = translations[language];
  const utils = trpc.useUtils();

  const { data: cartItems, isLoading } = trpc.cart.list.useQuery();

  const updateQuantityMutation = trpc.cart.updateQuantity.useMutation({
    onSuccess: () => {
      utils.cart.list.invalidate();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const removeItemMutation = trpc.cart.remove.useMutation({
    onSuccess: () => {
      utils.cart.list.invalidate();
      toast.success(t.remove);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleUpdateQuantity = (cartItemId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantityMutation.mutate({ cartItemId, quantity: newQuantity });
  };

  const handleRemoveItem = (cartItemId: number) => {
    removeItemMutation.mutate({ cartItemId });
  };

  // Calculate totals
  const subtotalExclVat = cartItems?.reduce((sum, item) => {
    if (!item.product) return sum;
    return sum + parseFloat(item.product.priceExclVat) * item.quantity;
  }, 0) || 0;

  const vatAmount = subtotalExclVat * 0.23;
  const grandTotal = subtotalExclVat + vatAmount;

  if (isLoading) {
    return (
      <div className="container py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-48"></div>
          <div className="h-32 bg-muted rounded"></div>
          <div className="h-32 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="container py-16">
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <ShoppingBag className="h-24 w-24 text-muted-foreground mb-4" />
            <h2 className="text-2xl font-bold mb-2">{t.emptyCart}</h2>
            <p className="text-muted-foreground mb-6">
              {language === "pt"
                ? "Adicione produtos ao seu carrinho para continuar"
                : "Add products to your cart to continue"}
            </p>
            <Link href="/">
              <Button size="lg">{t.continueShopping}</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-8">{t.cart}</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => {
              if (!item.product) return null;
              
              const productName =
                language === "pt"
                  ? item.product.namePt
                  : item.product.nameEn;
              const itemTotal =
                parseFloat(item.product.priceInclVat) * item.quantity;

              return (
                <Card key={item.id}>
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <Link href={`/product/${item.product.slug}`}>
                        <div className="w-24 h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity">
                          {item.product.imageUrl ? (
                            <img
                              src={item.product.imageUrl}
                              alt={productName}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                              No Image
                            </div>
                          )}
                        </div>
                      </Link>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <Link href={`/product/${item.product.slug}`}>
                          <h3 className="font-semibold hover:text-primary transition-colors cursor-pointer line-clamp-2">
                            {productName}
                          </h3>
                        </Link>
                        {item.product.brand && (
                          <p className="text-sm text-muted-foreground mt-1">
                            {item.product.brand}
                          </p>
                        )}
                        <div className="mt-2">
                          <div className="font-semibold">
                            {parseFloat(item.product.priceInclVat).toFixed(2)} €
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {parseFloat(item.product.priceExclVat).toFixed(2)} €{" "}
                            {t.exclVat}
                          </div>
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex flex-col items-end gap-2">
                        <div className="flex items-center gap-2 border rounded-lg">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              handleUpdateQuantity(
                                item.id,
                                item.quantity - 1
                              )
                            }
                            disabled={
                              item.quantity <= 1 ||
                              updateQuantityMutation.isPending
                            }
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center font-medium">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              handleUpdateQuantity(
                                item.id,
                                item.quantity + 1
                              )
                            }
                            disabled={updateQuantityMutation.isPending}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="font-semibold text-lg">
                          {itemTotal.toFixed(2)} €
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive"
                          onClick={() => handleRemoveItem(item.id)}
                          disabled={removeItemMutation.isPending}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          {t.remove}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardContent className="p-6 space-y-4">
                <h2 className="text-xl font-bold">
                  {language === "pt" ? "Resumo do Pedido" : "Order Summary"}
                </h2>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{t.subtotal}</span>
                    <span className="font-medium">
                      {subtotalExclVat.toFixed(2)} €
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{t.vat}</span>
                    <span className="font-medium">
                      {vatAmount.toFixed(2)} €
                    </span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-bold">
                  <span>{t.grandTotal}</span>
                  <span className="text-primary">{grandTotal.toFixed(2)} €</span>
                </div>

                <div className="text-xs text-muted-foreground text-center">
                  {t.inclVat}
                </div>

                <Link href="/checkout">
                  <Button size="lg" className="w-full">
                    {t.proceedToCheckout}
                  </Button>
                </Link>

                <Link href="/">
                  <Button variant="outline" className="w-full">
                    {t.continueShopping}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
