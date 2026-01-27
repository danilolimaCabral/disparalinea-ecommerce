import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider, useLanguage } from "./contexts/LanguageContext";
import { CartProvider, useCart } from "./contexts/CartContext";
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
import SmartphonesCategory from "./pages/SmartphonesCategory";
import TabletsCategory from "./pages/TabletsCategory";
import WearablesCategory from "./pages/WearablesCategory";
import AccessoriesCategory from "./pages/AccessoriesCategory";
import LaptopsCategory from "./pages/LaptopsCategory";
import AboutUs from "./pages/AboutUs";
import About from "./pages/About";
import Contact from "./pages/Contact";
import SearchPage from "./pages/SearchPage";
import { trpc } from "./lib/trpc";

function AppContent() {
  const { language, setLanguage } = useLanguage();
  const { totalItems } = useCart();

  const cartItemCount = totalItems;

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
          <Route path="/smartphones" component={SmartphonesCategory} />
          <Route path="/tablets" component={TabletsCategory} />
          <Route path="/wearables" component={WearablesCategory} />
          <Route path="/accessories" component={AccessoriesCategory} />
          <Route path="/laptops" component={LaptopsCategory} />
          <Route path="/tires" component={TiresCategory} />
          <Route path="/fragrances" component={FragrancesCategory} />
          <Route path="/about-us" component={AboutUs} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/search" component={SearchPage} />
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
          <CartProvider>
            <TooltipProvider>
              <Toaster />
              <AppContent />
            </TooltipProvider>
          </CartProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
