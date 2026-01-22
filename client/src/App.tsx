import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider, useLanguage } from "./contexts/LanguageContext";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { CurrencyTicker } from "./components/CurrencyTicker";
import { CookieBanner } from "./components/CookieBanner";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import TiresCategory from "./pages/TiresCategory";
import FragrancesCategory from "./pages/FragrancesCategory";
import { trpc } from "./lib/trpc";

function AppContent() {
  const { language, setLanguage } = useLanguage();
  const { data: cartItems } = trpc.cart.list.useQuery(undefined, {
    retry: false,
    refetchOnWindowFocus: false,
  });

  const cartItemCount = cartItems?.length || 0;

  return (
    <div className="flex flex-col min-h-screen">
      <CurrencyTicker />
      <Header
        cartItemCount={cartItemCount}
        currentLanguage={language}
        onLanguageChange={setLanguage}
      />
      <main className="flex-1">
        <Switch>
          <Route path={"/"} component={Home} />
          <Route path="/product/:slug" component={ProductDetail} />
          <Route path="/cart" component={Cart} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/order-confirmation" component={OrderConfirmation} />
          <Route path="/tires" component={TiresCategory} />
          <Route path="/fragrances" component={FragrancesCategory} />
          <Route path={"/404"} component={NotFound} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer language={language} />
      <CookieBanner language={language} />
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <AppContent />
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
