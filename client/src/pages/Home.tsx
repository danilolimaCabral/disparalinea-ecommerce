import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ProductCard } from "@/components/ProductCard";
import { Smartphone, Tablet, Watch, Headphones, Laptop, Car, Sparkles, Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const translations = {
  pt: {
    hero: {
      badge: "Nova Coleção 2024",
      title: "Tecnologia Premium ao Seu Alcance",
      subtitle: "Descubra os melhores smartphones, tablets, wearables e acessórios das marcas mais prestigiadas do mundo.",
      cta: "Explorar Produtos",
      about: "Sobre Nós",
    },
    brands: {
      title: "Marcas de Confiança",
      subtitle: "Trabalhamos com as marcas mais prestigiadas do mundo",
    },
    categories: {
      title: "Categorias",
      subtitle: "Navegue pelas nossas categorias e encontre exatamente o que procura",
      smartphones: "Smartphones",
      smartphonesDesc: "Smartphones de última geração",
      tablets: "Tablets",
      tabletsDesc: "Tablets para trabalho e entretenimento",
      wearables: "Wearables",
      wearablesDesc: "Smartwatches e dispositivos vestíveis",
      accessories: "Acessórios",
      accessoriesDesc: "Acessórios para os seus dispositivos",
      laptops: "Laptops",
      laptopsDesc: "Notebooks e laptops de alto desempenho",
      tires: "Pneus",
      tiresDesc: "Pneus de qualidade premium",
      fragrances: "Fragrâncias",
      fragrancesDesc: "Perfumes e fragrâncias exclusivas",
    },
    featured: {
      title: "Em Destaque",
      subtitle: "Produtos especialmente selecionados para si",
      viewAll: "Ver Todos",
    },
    testimonials: {
      title: "O Que Dizem os Nossos Clientes",
      subtitle: "Avaliações reais de clientes satisfeitos",
    },
    newsletter: {
      title: "Mantenha-se Atualizado",
      subtitle: "Subscreva a nossa newsletter para receber as últimas novidades e ofertas exclusivas",
      placeholder: "O seu email",
      button: "Subscrever",
      success: "Obrigado por subscrever!",
      error: "Este email já está registado.",
    },
    cta: {
      title: "Pronto para Começar?",
      subtitle: "Explore a nossa coleção completa de produtos premium e encontre a tecnologia perfeita para si.",
      button: "Ver Todos os Produtos",
    },
  },
  en: {
    hero: {
      badge: "New Collection 2024",
      title: "Premium Technology at Your Fingertips",
      subtitle: "Discover the best smartphones, tablets, wearables and accessories from the world's most prestigious brands.",
      cta: "Explore Products",
      about: "About Us",
    },
    brands: {
      title: "Trusted Brands",
      subtitle: "We work with the world's most prestigious brands",
    },
    categories: {
      title: "Categories",
      subtitle: "Browse our categories and find exactly what you're looking for",
      smartphones: "Smartphones",
      smartphonesDesc: "Latest generation smartphones",
      tablets: "Tablets",
      tabletsDesc: "Tablets for work and entertainment",
      wearables: "Wearables",
      wearablesDesc: "Smartwatches and wearable devices",
      accessories: "Accessories",
      accessoriesDesc: "Accessories for your devices",
      laptops: "Laptops",
      laptopsDesc: "High-performance notebooks and laptops",
      tires: "Tires",
      tiresDesc: "Premium quality tires",
      fragrances: "Fragrances",
      fragrancesDesc: "Exclusive perfumes and fragrances",
    },
    featured: {
      title: "Featured",
      subtitle: "Products specially selected for you",
      viewAll: "View All",
    },
    testimonials: {
      title: "What Our Customers Say",
      subtitle: "Real reviews from satisfied customers",
    },
    newsletter: {
      title: "Stay Updated",
      subtitle: "Subscribe to our newsletter to receive the latest news and exclusive offers",
      placeholder: "Your email",
      button: "Subscribe",
      success: "Thank you for subscribing!",
      error: "This email is already registered.",
    },
    cta: {
      title: "Ready to Get Started?",
      subtitle: "Explore our complete collection of premium products and find the perfect technology for you.",
      button: "View All Products",
    },
  },
};

export default function Home() {
  const { language } = useLanguage();
  const t = translations[language];
  const [email, setEmail] = useState("");

  const { data: featuredProducts, isLoading: loadingProducts } = trpc.products.featured.useQuery();
  const { data: testimonials } = trpc.testimonials.list.useQuery();
  const subscribeMutation = trpc.newsletter.subscribe.useMutation();
  const addToCartMutation = trpc.cart.add.useMutation();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await subscribeMutation.mutateAsync({ email });
      if (result.success) {
        toast.success(t.newsletter.success);
        setEmail("");
      } else {
        toast.error(t.newsletter.error);
      }
    } catch (error) {
      toast.error(t.newsletter.error);
    }
  };

  const handleAddToCart = async (productId: number) => {
    try {
      await addToCartMutation.mutateAsync({ productId, quantity: 1 });
      toast.success(language === "pt" ? "Produto adicionado ao carrinho!" : "Product added to cart!");
    } catch (error) {
      toast.error(language === "pt" ? "Erro ao adicionar ao carrinho" : "Error adding to cart");
    }
  };

  const categories = [
    { icon: Smartphone, name: t.categories.smartphones, desc: t.categories.smartphonesDesc, path: "/category/smartphones" },
    { icon: Tablet, name: t.categories.tablets, desc: t.categories.tabletsDesc, path: "/category/tablets" },
    { icon: Watch, name: t.categories.wearables, desc: t.categories.wearablesDesc, path: "/category/wearables" },
    { icon: Headphones, name: t.categories.accessories, desc: t.categories.accessoriesDesc, path: "/category/accessories" },
    { icon: Laptop, name: t.categories.laptops, desc: t.categories.laptopsDesc, path: "/category/laptops" },
    { icon: Car, name: t.categories.tires, desc: t.categories.tiresDesc, path: "/category/tires" },
    { icon: Sparkles, name: t.categories.fragrances, desc: t.categories.fragrancesDesc, path: "/category/fragrances" },
  ];

  const brands = ["Apple", "Samsung", "Google", "Xiaomi", "OnePlus"];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-primary text-primary-foreground py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh opacity-50"></div>
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-3xl animate-fade-in-up">
              <div className="inline-block bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-semibold mb-6">
                {t.hero.badge}
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                {t.hero.title}
              </h1>
              <p className="text-lg lg:text-xl opacity-90 mb-8">
                {t.hero.subtitle}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/products">
                  <Button size="lg" variant="secondary">
                    {t.hero.cta}
                  </Button>
                </Link>
                <Link href="/about">
                  <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                    {t.hero.about}
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden lg:flex justify-center items-center animate-fade-in-up stagger-2">
              <img 
                src="/hero-phone.png" 
                alt="Premium Smartphone" 
                className="w-full max-w-md h-auto object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-16 bg-muted/30">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">{t.brands.title}</h2>
          <p className="text-muted-foreground mb-12">{t.brands.subtitle}</p>
          <div className="flex flex-wrap justify-center items-center gap-16">
            <div className="grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
              <img src="/brand-apple.png" alt="Apple" className="h-12 w-auto object-contain" />
            </div>
            <div className="grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
              <img src="/brand-samsung.png" alt="Samsung" className="h-12 w-auto object-contain" />
            </div>
            <div className="grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
              <img src="/brand-google.webp" alt="Google" className="h-12 w-auto object-contain" />
            </div>
            <div className="grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
              <img src="/brand-xiaomi.jpg" alt="Xiaomi" className="h-12 w-auto object-contain" />
            </div>
            <div className="grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
              <img src="/brand-oneplus.png" alt="OnePlus" className="h-12 w-auto object-contain" />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t.categories.title}</h2>
            <p className="text-muted-foreground">{t.categories.subtitle}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link key={category.path} href={category.path}>
                <Card className="glass-card glass-hover cursor-pointer h-full border-0">
                  <CardContent className="p-6 text-center">
                    <category.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                    <h3 className="font-semibold mb-2">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">{category.desc}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="flex justify-between items-center mb-12">
            <div>
              <div className="flex items-center gap-2">
                <Star className="h-8 w-8 text-yellow-500 fill-yellow-500" />
                <h2 className="text-3xl font-bold">{t.featured.title}</h2>
              </div>
              <p className="text-muted-foreground mt-2">{t.featured.subtitle}</p>
            </div>
            <Link href="/products">
              <Button variant="outline">{t.featured.viewAll}</Button>
            </Link>
          </div>

          {loadingProducts ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <div className="aspect-square bg-muted" />
                  <CardContent className="p-4 space-y-3">
                    <div className="h-4 bg-muted rounded w-3/4" />
                    <div className="h-4 bg-muted rounded w-1/2" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts?.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  slug={product.slug}
                  name={language === "pt" ? product.namePt : product.nameEn}
                  brand={product.brand || undefined}
                  priceExclVat={product.priceExclVat}
                  priceInclVat={product.priceInclVat}
                  imageUrl={product.imageUrl || undefined}
                  isNew={product.isNew || false}
                  isBestSeller={product.isBestSeller || false}
                  inStock={product.inStock || false}
                  onAddToCart={handleAddToCart}
                  language={language}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Testimonials */}
      {testimonials && testimonials.length > 0 && (
        <section className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">{t.testimonials.title}</h2>
              <p className="text-muted-foreground">{t.testimonials.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.slice(0, 3).map((testimonial) => (
                <Card key={testimonial.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      {testimonial.avatarUrl ? (
                        <img
                          src={testimonial.avatarUrl}
                          alt={language === "pt" ? testimonial.namePt : testimonial.nameEn}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                          {(language === "pt" ? testimonial.namePt : testimonial.nameEn).charAt(0)}
                        </div>
                      )}
                      <div>
                        <h4 className="font-semibold">
                          {language === "pt" ? testimonial.namePt : testimonial.nameEn}
                        </h4>
                        {testimonial.role && (
                          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-1 mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                      ))}
                    </div>
                    <p className="text-muted-foreground">
                      {language === "pt" ? testimonial.commentPt : testimonial.commentEn}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container max-w-2xl text-center">
          <h2 className="text-3xl font-bold mb-4">{t.newsletter.title}</h2>
          <p className="opacity-90 mb-8">{t.newsletter.subtitle}</p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
            <Input
              type="email"
              placeholder={t.newsletter.placeholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 bg-primary-foreground text-primary"
            />
            <Button type="submit" variant="secondary" size="lg" disabled={subscribeMutation.isPending}>
              {t.newsletter.button}
            </Button>
          </form>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/30">
        <div className="container text-center max-w-3xl">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">{t.cta.title}</h2>
          <p className="text-lg text-muted-foreground mb-8">{t.cta.subtitle}</p>
          <Link href="/products">
            <Button size="lg">{t.cta.button}</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
