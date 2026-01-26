import { Link } from "wouter";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/CartContext";
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
  const { items, removeItem, updateQuantity, totalPrice } = useCart();

  const handleRemove = (productId: number, name: string) => {
    removeItem(productId);
    toast.success(
      language === "pt"
        ? `${name} removido do carrinho`
        : `${name} removed from cart`
    );
  };

  const handleUpdateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(productId, newQuantity);
  };

  const subtotal = items.reduce((sum, item) => {
    const priceWithoutVat = item.price / 1.23;
    return sum + priceWithoutVat * item.quantity;
  }, 0);

  const vat = subtotal * 0.23;

  if (items.length === 0) {
    return (
      <div className="container py-16">
        <div className="max-w-2xl mx-auto text-center">
          <ShoppingBag className="w-24 h-24 mx-auto text-muted-foreground mb-6" />
          <h1 className="text-3xl font-bold mb-4">{t.emptyCart}</h1>
          <Link href="/">
            <Button size="lg">{t.continueShopping}</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">{t.cart}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <Card key={item.productId}>
              <CardContent className="p-6">
                <div className="flex gap-6">
                  <Link href={`/product/${item.slug}`}>
                    <img
                      src={item.imageUrl}
                      alt={language === "pt" ? item.name : item.nameEn}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                  </Link>

                  <div className="flex-1">
                    <Link href={`/product/${item.slug}`}>
                      <h3 className="font-semibold text-lg mb-2 hover:text-primary transition-colors">
                        {language === "pt" ? item.name : item.nameEn}
                      </h3>
                    </Link>

                    <p className="text-sm text-muted-foreground mb-2">
                      {item.price.toFixed(2)} €
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {(item.price / 1.23).toFixed(2)} € {t.exclVat}
                    </p>

                    <div className="flex items-center gap-4 mt-4">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() =>
                            handleUpdateQuantity(
                              item.productId,
                              item.quantity - 1
                            )
                          }
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-12 text-center font-medium">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() =>
                            handleUpdateQuantity(
                              item.productId,
                              item.quantity + 1
                            )
                          }
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="ml-auto flex items-center gap-4">
                        <span className="font-bold text-lg">
                          {(item.price * item.quantity).toFixed(2)} €
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive"
                          onClick={() =>
                            handleRemove(
                              item.productId,
                              language === "pt" ? item.name : item.nameEn
                            )
                          }
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">
                {language === "pt" ? "Resumo do Pedido" : "Order Summary"}
              </h2>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{t.subtotal}</span>
                  <span className="font-medium">{subtotal.toFixed(2)} €</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{t.vat}</span>
                  <span className="font-medium">{vat.toFixed(2)} €</span>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-bold">
                  <span>{t.grandTotal}</span>
                  <span>{totalPrice.toFixed(2)} €</span>
                </div>

                <p className="text-xs text-muted-foreground text-center">
                  {t.inclVat}
                </p>
              </div>

              <div className="mt-6 space-y-3">
                <Link href="/checkout">
                  <Button className="w-full" size="lg">
                    {t.proceedToCheckout}
                  </Button>
                </Link>
                <Link href="/">
                  <Button variant="outline" className="w-full">
                    {t.continueShopping}
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
