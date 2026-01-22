import { useEffect } from "react";
import { Link, useLocation } from "wouter";
import { CheckCircle, Package, Truck, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { trpc } from "@/lib/trpc";
import { useLanguage } from "@/contexts/LanguageContext";

const translations = {
  pt: {
    orderConfirmed: "Pedido Confirmado!",
    thankYou: "Obrigado pela sua compra",
    orderNumber: "Número do Pedido",
    confirmationEmail: "Enviámos um email de confirmação para",
    orderDetails: "Detalhes do Pedido",
    product: "Produto",
    quantity: "Quantidade",
    price: "Preço",
    subtotal: "Subtotal",
    vat: "IVA (23%)",
    shipping: "Envio",
    free: "Grátis",
    total: "Total",
    whatNext: "O que acontece a seguir?",
    step1Title: "Confirmação do Pedido",
    step1Desc: "Receberá um email com os detalhes do seu pedido",
    step2Title: "Processamento",
    step2Desc: "Estamos a preparar o seu pedido para envio",
    step3Title: "Envio",
    step3Desc: "Receberá um código de rastreamento quando o pedido for enviado",
    continueShopping: "Continuar Comprando",
    viewOrders: "Ver Meus Pedidos",
    loading: "A carregar...",
    orderNotFound: "Pedido não encontrado",
  },
  en: {
    orderConfirmed: "Order Confirmed!",
    thankYou: "Thank you for your purchase",
    orderNumber: "Order Number",
    confirmationEmail: "We've sent a confirmation email to",
    orderDetails: "Order Details",
    product: "Product",
    quantity: "Quantity",
    price: "Price",
    subtotal: "Subtotal",
    vat: "VAT (23%)",
    shipping: "Shipping",
    free: "Free",
    total: "Total",
    whatNext: "What happens next?",
    step1Title: "Order Confirmation",
    step1Desc: "You'll receive an email with your order details",
    step2Title: "Processing",
    step2Desc: "We're preparing your order for shipment",
    step3Title: "Shipping",
    step3Desc: "You'll receive a tracking code when your order ships",
    continueShopping: "Continue Shopping",
    viewOrders: "View My Orders",
    loading: "Loading...",
    orderNotFound: "Order not found",
  },
};

export default function OrderConfirmation() {
  const { language } = useLanguage();
  const t = translations[language];
  const [location] = useLocation();

  // Extract order number from URL query params
  const searchParams = new URLSearchParams(location.split("?")[1]);
  const orderNumber = searchParams.get("order");

  const { data: order, isLoading } = trpc.orders.getByNumber.useQuery(
    { orderNumber: orderNumber || "" },
    { enabled: !!orderNumber }
  );

  useEffect(() => {
    // Clear cart items from local state if needed
    // This is handled by the webhook, but we can also clear it here for immediate feedback
  }, []);

  if (isLoading) {
    return (
      <div className="container py-16">
        <div className="max-w-3xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-12 bg-muted rounded w-64 mx-auto"></div>
            <div className="h-96 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container py-16">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <h2 className="text-2xl font-bold mb-4">{t.orderNotFound}</h2>
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
      <div className="container py-16">
        <div className="max-w-3xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 dark:bg-green-900 mb-4">
              <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
            </div>
            <h1 className="text-3xl font-bold mb-2">{t.orderConfirmed}</h1>
            <p className="text-lg text-muted-foreground">{t.thankYou}</p>
          </div>

          {/* Order Number */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">
                  {t.orderNumber}
                </p>
                <p className="text-2xl font-bold text-primary">
                  {order.orderNumber}
                </p>
                <p className="text-sm text-muted-foreground mt-4">
                  {t.confirmationEmail}
                </p>
                <p className="font-medium">{order.shippingEmail}</p>
              </div>
            </CardContent>
          </Card>

          {/* Order Details */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>{t.orderDetails}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Products */}
              <div className="space-y-3">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-3 rounded-lg bg-muted/50"
                  >
                    {item.productImage && (
                      <img
                        src={item.productImage}
                        alt={item.productName}
                        className="w-16 h-16 object-cover rounded"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium line-clamp-1">
                        {item.productName}
                      </p>
                      {item.productBrand && (
                        <p className="text-sm text-muted-foreground">
                          {item.productBrand}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        {parseFloat(item.priceInclVat).toFixed(2)} €
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {t.quantity}: {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Separator />

              {/* Totals */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{t.subtotal}</span>
                  <span className="font-medium">
                    {parseFloat(order.subtotal).toFixed(2)} €
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{t.vat}</span>
                  <span className="font-medium">
                    {parseFloat(order.vatAmount).toFixed(2)} €
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{t.shipping}</span>
                  <span className="font-medium text-green-600">{t.free}</span>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between text-lg font-bold">
                <span>{t.total}</span>
                <span className="text-primary">
                  {parseFloat(order.total).toFixed(2)} €
                </span>
              </div>
            </CardContent>
          </Card>

          {/* What's Next */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{t.whatNext}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{t.step1Title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t.step1Desc}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Package className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{t.step2Title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t.step2Desc}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Truck className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{t.step3Title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t.step3Desc}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button size="lg" variant="outline">
                {t.continueShopping}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
