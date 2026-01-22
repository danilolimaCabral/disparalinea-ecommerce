import { drizzle } from "drizzle-orm/mysql2";
import { categories, products, testimonials } from "./drizzle/schema.js";
import "dotenv/config";

const db = drizzle(process.env.DATABASE_URL);

async function seed() {
  console.log("🌱 Seeding database...");

  // Clear existing data
  console.log("Clearing existing data...");
  await db.delete(products);
  await db.delete(categories);
  await db.delete(testimonials);

  // Insert categories
  console.log("Inserting categories...");
  const categoryData = [
    {
      slug: "smartphones",
      nameEn: "Smartphones",
      namePt: "Smartphones",
      descriptionEn: "Latest generation smartphones",
      descriptionPt: "Smartphones de última geração",
      parentId: null,
    },
    {
      slug: "tablets",
      nameEn: "Tablets",
      namePt: "Tablets",
      descriptionEn: "Tablets for work and entertainment",
      descriptionPt: "Tablets para trabalho e entretenimento",
      parentId: null,
    },
    {
      slug: "wearables",
      nameEn: "Wearables",
      namePt: "Wearables",
      descriptionEn: "Smartwatches and wearable devices",
      descriptionPt: "Smartwatches e dispositivos vestíveis",
      parentId: null,
    },
    {
      slug: "accessories",
      nameEn: "Accessories",
      namePt: "Acessórios",
      descriptionEn: "Accessories for your devices",
      descriptionPt: "Acessórios para os seus dispositivos",
      parentId: null,
    },
    {
      slug: "laptops",
      nameEn: "Laptops",
      namePt: "Laptops",
      descriptionEn: "High-performance notebooks and laptops",
      descriptionPt: "Notebooks e laptops de alto desempenho",
      parentId: null,
    },
    {
      slug: "tires",
      nameEn: "Tires",
      namePt: "Pneus",
      descriptionEn: "Premium quality tires",
      descriptionPt: "Pneus de qualidade premium",
      parentId: null,
    },
    {
      slug: "fragrances",
      nameEn: "Fragrances",
      namePt: "Fragrâncias",
      descriptionEn: "Exclusive perfumes and fragrances",
      descriptionPt: "Perfumes e fragrâncias exclusivas",
      parentId: null,
    },
  ];

  await db.insert(categories).values(categoryData);
  console.log(`✅ Inserted ${categoryData.length} categories`);

  // Get category IDs
  const allCategories = await db.select().from(categories);
  const categoryMap = Object.fromEntries(
    allCategories.map((cat) => [cat.slug, cat.id])
  );

  // Insert products
  console.log("Inserting products...");
  const productsData = [
    // Smartphones
    {
      slug: "samsung-galaxy-s24-ultra-512gb",
      nameEn: "Samsung Galaxy S24 Ultra 512GB",
      namePt: "Samsung Galaxy S24 Ultra 512GB",
      descriptionEn: "The ultimate flagship smartphone with advanced AI features, stunning display, and professional camera system.",
      descriptionPt: "O smartphone flagship definitivo com recursos avançados de IA, ecrã deslumbrante e sistema de câmara profissional.",
      brand: "Samsung",
      categoryId: categoryMap.smartphones,
      priceExclVat: "841.72",
      priceInclVat: "1035.32",
      imageUrl: "/products/MVkIdua3k1Y6.jpg",
      isNew: true,
      isBestSeller: true,
      inStock: true,
      stockQuantity: 15,
    },
    {
      slug: "apple-iphone-15-pro-max-256gb",
      nameEn: "Apple iPhone 15 Pro Max 256GB",
      namePt: "Apple iPhone 15 Pro Max 256GB",
      descriptionEn: "Premium iPhone with titanium design, A17 Pro chip, and advanced camera system.",
      descriptionPt: "iPhone premium com design em titânio, chip A17 Pro e sistema de câmara avançado.",
      brand: "Apple",
      categoryId: categoryMap.smartphones,
      priceExclVat: "906.48",
      priceInclVat: "1114.97",
      imageUrl: "/products/Mmy9smymy8Z5.jpg",
      isNew: true,
      isBestSeller: true,
      inStock: true,
      stockQuantity: 20,
    },
    {
      slug: "google-pixel-8-pro-256gb",
      nameEn: "Google Pixel 8 Pro 256GB",
      namePt: "Google Pixel 8 Pro 256GB",
      descriptionEn: "Google's flagship with advanced AI photography and pure Android experience.",
      descriptionPt: "Flagship do Google com fotografia AI avançada e experiência Android pura.",
      brand: "Google",
      categoryId: categoryMap.smartphones,
      priceExclVat: "731.71",
      priceInclVat: "900.00",
      imageUrl: "/products/75yrduNLYovX.jpg",
      isNew: false,
      isBestSeller: true,
      inStock: true,
      stockQuantity: 12,
    },
    // Tablets
    {
      slug: "apple-ipad-pro-11-256gb",
      nameEn: "Apple iPad Pro 11\" 256GB",
      namePt: "Apple iPad Pro 11\" 256GB",
      descriptionEn: "Powerful tablet with M2 chip, stunning Liquid Retina display, and Apple Pencil support.",
      descriptionPt: "Tablet poderoso com chip M2, ecrã Liquid Retina deslumbrante e suporte para Apple Pencil.",
      brand: "Apple",
      categoryId: categoryMap.tablets,
      priceExclVat: "712.20",
      priceInclVat: "876.01",
      imageUrl: "/products/u3LynTwk1ZaM.jpg",
      isNew: false,
      isBestSeller: true,
      inStock: true,
      stockQuantity: 18,
    },
    {
      slug: "samsung-galaxy-tab-s9-ultra",
      nameEn: "Samsung Galaxy Tab S9 Ultra",
      namePt: "Samsung Galaxy Tab S9 Ultra",
      descriptionEn: "Premium Android tablet with large AMOLED display and S Pen included.",
      descriptionPt: "Tablet Android premium com grande ecrã AMOLED e S Pen incluída.",
      brand: "Samsung",
      categoryId: categoryMap.tablets,
      priceExclVat: "813.01",
      priceInclVat: "1000.00",
      imageUrl: "/products/QzN1z7Zfg3Iq.jpg",
      isNew: true,
      isBestSeller: false,
      inStock: true,
      stockQuantity: 10,
    },
    // Wearables
    {
      slug: "apple-watch-series-9-45mm",
      nameEn: "Apple Watch Series 9 45mm",
      namePt: "Apple Watch Series 9 45mm",
      descriptionEn: "Advanced smartwatch with health monitoring, fitness tracking, and always-on display.",
      descriptionPt: "Smartwatch avançado com monitorização de saúde, rastreamento de fitness e ecrã sempre ligado.",
      brand: "Apple",
      categoryId: categoryMap.wearables,
      priceExclVat: "517.93",
      priceInclVat: "637.06",
      imageUrl: "/products/ZD7Dz6x81tWi.jpg",
      isNew: true,
      isBestSeller: true,
      inStock: true,
      stockQuantity: 25,
    },
    {
      slug: "samsung-galaxy-watch-6-classic",
      nameEn: "Samsung Galaxy Watch 6 Classic",
      namePt: "Samsung Galaxy Watch 6 Classic",
      descriptionEn: "Premium smartwatch with rotating bezel and comprehensive health features.",
      descriptionPt: "Smartwatch premium com moldura rotativa e recursos de saúde abrangentes.",
      brand: "Samsung",
      categoryId: categoryMap.wearables,
      priceExclVat: "325.20",
      priceInclVat: "400.00",
      imageUrl: "/products/XttVwXHdAuiJ.jpg",
      isNew: false,
      isBestSeller: false,
      inStock: true,
      stockQuantity: 15,
    },
    // Accessories
    {
      slug: "apple-airpods-pro-2nd-gen-usbc",
      nameEn: "Apple AirPods Pro 2nd Generation USB-C",
      namePt: "Apple AirPods Pro 2ª Geração USB-C",
      descriptionEn: "Premium wireless earbuds with active noise cancellation and spatial audio.",
      descriptionPt: "Auriculares sem fios premium com cancelamento ativo de ruído e áudio espacial.",
      brand: "Apple",
      categoryId: categoryMap.accessories,
      priceExclVat: "323.66",
      priceInclVat: "398.10",
      imageUrl: "/products/B71mN332J9z9.jpg",
      isNew: false,
      isBestSeller: true,
      inStock: true,
      stockQuantity: 30,
    },
    {
      slug: "samsung-galaxy-buds2-pro",
      nameEn: "Samsung Galaxy Buds2 Pro",
      namePt: "Samsung Galaxy Buds2 Pro",
      descriptionEn: "High-quality wireless earbuds with intelligent ANC and 360 audio.",
      descriptionPt: "Auriculares sem fios de alta qualidade com ANC inteligente e áudio 360.",
      brand: "Samsung",
      categoryId: categoryMap.accessories,
      priceExclVat: "162.60",
      priceInclVat: "200.00",
      imageUrl: "/products/lrB1BoH9IEbE.jpg",
      isNew: false,
      isBestSeller: false,
      inStock: true,
      stockQuantity: 20,
    },
    // Laptops
    {
      slug: "apple-macbook-pro-14-m3-512gb",
      nameEn: "Apple MacBook Pro 14\" M3 512GB",
      namePt: "Apple MacBook Pro 14\" M3 512GB",
      descriptionEn: "Professional laptop with M3 chip, stunning Liquid Retina XDR display, and all-day battery.",
      descriptionPt: "Laptop profissional com chip M3, ecrã Liquid Retina XDR deslumbrante e bateria para todo o dia.",
      brand: "Apple",
      categoryId: categoryMap.laptops,
      priceExclVat: "2590.18",
      priceInclVat: "3185.92",
      imageUrl: "/products/8tPzBUG2Lsij.jpg",
      isNew: true,
      isBestSeller: false,
      inStock: true,
      stockQuantity: 8,
    },
    {
      slug: "dell-xps-15-intel-i9",
      nameEn: "Dell XPS 15 Intel i9",
      namePt: "Dell XPS 15 Intel i9",
      descriptionEn: "High-performance Windows laptop with stunning OLED display and powerful specs.",
      descriptionPt: "Laptop Windows de alto desempenho com ecrã OLED deslumbrante e especificações poderosas.",
      brand: "Dell",
      categoryId: categoryMap.laptops,
      priceExclVat: "2032.52",
      priceInclVat: "2500.00",
      imageUrl: "/products/QGjRnagK5O20.jpg",
      isNew: false,
      isBestSeller: true,
      inStock: true,
      stockQuantity: 6,
    },
    // Tires
    {
      slug: "michelin-pilot-sport-4s-245-40-r18",
      nameEn: "Michelin Pilot Sport 4S 245/40 R18",
      namePt: "Michelin Pilot Sport 4S 245/40 R18",
      descriptionEn: "High-performance summer tire with excellent grip and handling.",
      descriptionPt: "Pneu de verão de alto desempenho com excelente aderência e manuseamento.",
      brand: "Michelin",
      categoryId: categoryMap.tires,
      priceExclVat: "203.25",
      priceInclVat: "250.00",
      imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
      isNew: false,
      isBestSeller: true,
      inStock: true,
      stockQuantity: 40,
    },
    {
      slug: "continental-wintercontact-ts-860-205-55-r16",
      nameEn: "Continental WinterContact TS 860 205/55 R16",
      namePt: "Continental WinterContact TS 860 205/55 R16",
      descriptionEn: "Premium winter tire for maximum safety in cold conditions.",
      descriptionPt: "Pneu de inverno premium para máxima segurança em condições frias.",
      brand: "Continental",
      categoryId: categoryMap.tires,
      priceExclVat: "121.95",
      priceInclVat: "150.00",
      imageUrl: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800",
      isNew: false,
      isBestSeller: false,
      inStock: true,
      stockQuantity: 35,
    },
    // Fragrances
    {
      slug: "dior-sauvage-eau-de-parfum-100ml",
      nameEn: "Dior Sauvage Eau de Parfum 100ml",
      namePt: "Dior Sauvage Eau de Parfum 100ml",
      descriptionEn: "Iconic men's fragrance with fresh and woody notes.",
      descriptionPt: "Fragrância masculina icónica com notas frescas e amadeiradas.",
      brand: "Dior",
      categoryId: categoryMap.fragrances,
      priceExclVat: "97.56",
      priceInclVat: "120.00",
      imageUrl: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=800",
      isNew: false,
      isBestSeller: true,
      inStock: true,
      stockQuantity: 50,
    },
    {
      slug: "chanel-no5-eau-de-parfum-100ml",
      nameEn: "Chanel No. 5 Eau de Parfum 100ml",
      namePt: "Chanel No. 5 Eau de Parfum 100ml",
      descriptionEn: "Timeless women's fragrance with floral and aldehydic notes.",
      descriptionPt: "Fragrância feminina intemporal com notas florais e aldeídicas.",
      brand: "Chanel",
      categoryId: categoryMap.fragrances,
      priceExclVat: "130.08",
      priceInclVat: "160.00",
      imageUrl: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800",
      isNew: false,
      isBestSeller: true,
      inStock: true,
      stockQuantity: 45,
    },
  ];

  await db.insert(products).values(productsData);
  console.log(`✅ Inserted ${productsData.length} products`);

  // Insert testimonials
  console.log("Inserting testimonials...");
  const testimonialsData = [
    {
      nameEn: "Maria Silva",
      namePt: "Maria Silva",
      role: "Business Owner",
      commentEn: "Excellent service and high-quality products. I bought an iPhone 15 Pro and the entire process was smooth and professional.",
      commentPt: "Excelente serviço e produtos de alta qualidade. Comprei um iPhone 15 Pro e todo o processo foi suave e profissional.",
      rating: 5,
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
      isActive: true,
    },
    {
      nameEn: "João Santos",
      namePt: "João Santos",
      role: "IT Manager",
      commentEn: "DisparaLinea Trading is my go-to for technology purchases. Great prices, authentic products, and fast delivery.",
      commentPt: "DisparaLinea Trading é a minha escolha para compras de tecnologia. Ótimos preços, produtos autênticos e entrega rápida.",
      rating: 5,
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
      isActive: true,
    },
    {
      nameEn: "Ana Costa",
      namePt: "Ana Costa",
      role: "Marketing Director",
      commentEn: "I've purchased multiple devices from DisparaLinea and have always been impressed with their professionalism and product quality.",
      commentPt: "Comprei vários dispositivos da DisparaLinea e sempre fiquei impressionada com o profissionalismo e qualidade dos produtos.",
      rating: 5,
      avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200",
      isActive: true,
    },
  ];

  await db.insert(testimonials).values(testimonialsData);
  console.log(`✅ Inserted ${testimonialsData.length} testimonials`);

  console.log("✅ Database seeded successfully!");
  process.exit(0);
}

seed().catch((error) => {
  console.error("❌ Error seeding database:", error);
  process.exit(1);
});
