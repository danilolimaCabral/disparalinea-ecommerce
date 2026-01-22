import { useState } from "react";
import { useLocation, Link } from "wouter";
import { ChevronLeft, CreditCard, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { trpc } from "@/lib/trpc";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";
import { useAuth } from "@/_core/hooks/useAuth";

const translations = {
  pt: {
    checkout: "Finalizar Compra",
    backToCart: "Voltar ao Carrinho",
    shippingInformation: "Informações de Envio",
    fullName: "Nome Completo",
    email: "Email",
    phone: "Telefone (opcional)",
    address: "Morada",
    city: "Cidade",
    postalCode: "Código Postal",
    country: "País",
    orderSummary: "Resumo do Pedido",
    subtotal: "Subtotal",
    vat: "IVA (23%)",
    shipping: "Envio",
    free: "Grátis",
    total: "Total",
    proceedToPayment: "Proceder ao Pagamento",
    processing: "A processar...",
    emptyCart: "Seu carrinho está vazio",
    continueShopping: "Continuar Comprando",
    secureCheckout: "Checkout Seguro",
    loginRequired: "É necessário fazer login para finalizar a compra",
    login: "Entrar",
  },
  en: {
    checkout: "Checkout",
    backToCart: "Back to Cart",
    shippingInformation: "Shipping Information",
    fullName: "Full Name",
    email: "Email",
    phone: "Phone (optional)",
    address: "Address",
    city: "City",
    postalCode: "Postal Code",
    country: "Country",
    orderSummary: "Order Summary",
    subtotal: "Subtotal",
    vat: "VAT (23%)",
    shipping: "Shipping",
    free: "Free",
    total: "Total",
    proceedToPayment: "Proceed to Payment",
    processing: "Processing...",
    emptyCart: "Your cart is empty",
    continueShopping: "Continue Shopping",
    secureCheckout: "Secure Checkout",
    loginRequired: "You need to login to complete checkout",
    login: "Login",
  },
};

export default function Checkout() {
  const { language } = useLanguage();
  const t = translations[language];
  const [, setLocation] = useLocation();
  const { user, isAuthenticated } = useAuth();

  const [formData, setFormData] = useState({
    shippingName: user?.name || "",
    shippingEmail: user?.email || "",
    shippingPhone: "",
    shippingAddress: "",
    shippingCity: "",
    shippingPostalCode: "",
    shippingCountry: "Portugal",
  });

  const { data: cartItems, isLoading: cartLoading } = trpc.cart.list.useQuery();

  const createSessionMutation = trpc.checkout.createSession.useMutation({
    onSuccess: (data) => {
      // Clear cart after successful checkout session creation
      toast.success(
        language === "pt"
          ? "Redirecionando para pagamento..."
          : "Redirecting to payment..."
      );
      
      // Redirect to Stripe Checkout
      if (data.sessionUrl) {
        window.location.href = data.sessionUrl;
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (
      !formData.shippingName ||
      !formData.shippingEmail ||
      !formData.shippingAddress ||
      !formData.shippingCity ||
      !formData.shippingPostalCode ||
      !formData.shippingCountry
    ) {
      toast.error(
        language === "pt"
          ? "Por favor, preencha todos os campos obrigatórios"
          : "Please fill in all required fields"
      );
      return;
    }

    createSessionMutation.mutate(formData);
  };

  // Calculate totals
  const subtotalExclVat =
    cartItems?.reduce((sum, item) => {
      if (!item.product) return sum;
      return sum + parseFloat(item.product.priceExclVat) * item.quantity;
    }, 0) || 0;

  const vatAmount = subtotalExclVat * 0.23;
  const shippingCost = 0; // Free shipping
  const grandTotal = subtotalExclVat + vatAmount + shippingCost;

  if (!isAuthenticated) {
    return (
      <div className="container py-16">
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Lock className="h-24 w-24 text-muted-foreground mb-4" />
            <h2 className="text-2xl font-bold mb-2">{t.loginRequired}</h2>
            <p className="text-muted-foreground mb-6 text-center">
              {language === "pt"
                ? "Você precisa estar logado para finalizar sua compra"
                : "You need to be logged in to complete your purchase"}
            </p>
            <Button size="lg" onClick={() => window.location.href = "/api/oauth/login"}>
              {t.login}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (cartLoading) {
    return (
      <div className="container py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-48"></div>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 h-96 bg-muted rounded"></div>
            <div className="h-64 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="container py-16">
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
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
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">{t.checkout}</h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Lock className="h-4 w-4" />
            <span>{t.secureCheckout}</span>
          </div>
        </div>

        <Link href="/cart">
          <Button variant="ghost" className="mb-6">
            <ChevronLeft className="h-4 w-4 mr-2" />
            {t.backToCart}
          </Button>
        </Link>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Shipping Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>{t.shippingInformation}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="shippingName">
                        {t.fullName} <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="shippingName"
                        name="shippingName"
                        value={formData.shippingName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="shippingEmail">
                        {t.email} <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="shippingEmail"
                        name="shippingEmail"
                        type="email"
                        value={formData.shippingEmail}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="shippingPhone">{t.phone}</Label>
                    <Input
                      id="shippingPhone"
                      name="shippingPhone"
                      type="tel"
                      value={formData.shippingPhone}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="shippingAddress">
                      {t.address} <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="shippingAddress"
                      name="shippingAddress"
                      value={formData.shippingAddress}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="shippingCity">
                        {t.city} <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="shippingCity"
                        name="shippingCity"
                        value={formData.shippingCity}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="shippingPostalCode">
                        {t.postalCode} <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="shippingPostalCode"
                        name="shippingPostalCode"
                        value={formData.shippingPostalCode}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="shippingCountry">
                        {t.country} <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="shippingCountry"
                        name="shippingCountry"
                        value={formData.shippingCountry}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>{t.orderSummary}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Products */}
                  <div className="space-y-2">
                    {cartItems.map((item) => {
                      if (!item.product) return null;
                      const productName =
                        language === "pt"
                          ? item.product.namePt
                          : item.product.nameEn;
                      return (
                        <div
                          key={item.id}
                          className="flex justify-between text-sm"
                        >
                          <span className="text-muted-foreground">
                            {productName} × {item.quantity}
                          </span>
                          <span className="font-medium">
                            {(
                              parseFloat(item.product.priceInclVat) *
                              item.quantity
                            ).toFixed(2)}{" "}
                            €
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <Separator />

                  {/* Totals */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {t.subtotal}
                      </span>
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
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {t.shipping}
                      </span>
                      <span className="font-medium text-green-600">
                        {t.free}
                      </span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between text-lg font-bold">
                    <span>{t.total}</span>
                    <span className="text-primary">
                      {grandTotal.toFixed(2)} €
                    </span>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={createSessionMutation.isPending}
                  >
                    <CreditCard className="h-5 w-5 mr-2" />
                    {createSessionMutation.isPending
                      ? t.processing
                      : t.proceedToPayment}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    {language === "pt"
                      ? "Você será redirecionado para o Stripe para completar o pagamento de forma segura"
                      : "You will be redirected to Stripe to complete your payment securely"}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
