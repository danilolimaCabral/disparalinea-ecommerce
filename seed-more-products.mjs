import { drizzle } from "drizzle-orm/mysql2";
import { products, categories } from "./drizzle/schema.ts";
import { eq } from "drizzle-orm";
import "dotenv/config";

const db = drizzle(process.env.DATABASE_URL);

async function seedMoreProducts() {
  console.log("Adding more tires and fragrances products...");

  // Get category IDs
  const allCategories = await db.select().from(categories);
  const tiresCategory = allCategories.find(c => c.slug === "tires");
  const fragrancesCategory = allCategories.find(c => c.slug === "fragrances");

  if (!tiresCategory || !fragrancesCategory) {
    console.error("Categories not found!");
    process.exit(1);
  }

  // More Tires Products
  const moreTires = [
    {
      slug: "dunlop-sport-maxx-rt2",
      namePt: "Dunlop Sport Maxx RT2",
      nameEn: "Dunlop Sport Maxx RT2",
      descriptionPt: "Pneu de alta performance para condução desportiva. 225/45 R17 94Y XL.",
      descriptionEn: "High-performance tire for sporty driving. 225/45 R17 94Y XL.",
      brand: "Dunlop",
      priceExclVat: "145.00",
      priceInclVat: "178.35",
      imageUrl: "/products/dunlop-tire.jpg",
      categoryId: tiresCategory.id,
      inStock: true,
      isNew: false,
      isBestSeller: true,
    },
    {
      slug: "yokohama-advan-sport-v105",
      namePt: "Yokohama Advan Sport V105",
      nameEn: "Yokohama Advan Sport V105",
      descriptionPt: "Pneu premium para veículos de alto desempenho. 245/40 R18 97Y XL.",
      descriptionEn: "Premium tire for high-performance vehicles. 245/40 R18 97Y XL.",
      brand: "Yokohama",
      priceExclVat: "168.50",
      priceInclVat: "207.26",
      imageUrl: "/products/yokohama-tire.jpg",
      categoryId: tiresCategory.id,
      inStock: true,
      isNew: true,
      isBestSeller: false,
    },
    {
      slug: "hankook-ventus-s1-evo3",
      namePt: "Hankook Ventus S1 evo3",
      nameEn: "Hankook Ventus S1 evo3",
      descriptionPt: "Tecnologia avançada para máxima aderência. 225/50 R17 98Y XL.",
      descriptionEn: "Advanced technology for maximum grip. 225/50 R17 98Y XL.",
      brand: "Hankook",
      priceExclVat: "135.75",
      priceInclVat: "166.97",
      imageUrl: "/products/hankook-tire.jpg",
      categoryId: tiresCategory.id,
      inStock: true,
      isNew: false,
      isBestSeller: false,
    },
    {
      slug: "falken-azenis-fk510",
      namePt: "Falken Azenis FK510",
      nameEn: "Falken Azenis FK510",
      descriptionPt: "Pneu ultra high performance com excelente controle. 235/45 R18 98Y XL.",
      descriptionEn: "Ultra high performance tire with excellent control. 235/45 R18 98Y XL.",
      brand: "Falken",
      priceExclVat: "152.30",
      priceInclVat: "187.33",
      imageUrl: "/products/falken-tire.jpg",
      categoryId: tiresCategory.id,
      inStock: true,
      isNew: true,
      isBestSeller: false,
    },
    {
      slug: "toyo-proxes-sport",
      namePt: "Toyo Proxes Sport",
      nameEn: "Toyo Proxes Sport",
      descriptionPt: "Performance excepcional em todas as condições. 245/45 R18 100Y XL.",
      descriptionEn: "Exceptional performance in all conditions. 245/45 R18 100Y XL.",
      brand: "Toyo",
      priceExclVat: "159.90",
      priceInclVat: "196.68",
      imageUrl: "/products/toyo-tire.jpg",
      categoryId: tiresCategory.id,
      inStock: true,
      isNew: false,
      isBestSeller: true,
    },
  ];

  // More Fragrances Products
  const moreFragrances = [
    {
      slug: "tom-ford-oud-wood",
      namePt: "Tom Ford Oud Wood Eau de Parfum 100ml",
      nameEn: "Tom Ford Oud Wood Eau de Parfum 100ml",
      descriptionPt: "Fragrância luxuosa e sofisticada com notas de oud e especiarias.",
      descriptionEn: "Luxurious and sophisticated fragrance with oud and spice notes.",
      brand: "Tom Ford",
      priceExclVat: "245.00",
      priceInclVat: "301.35",
      imageUrl: "/products/tom-ford-oud-wood.jpg",
      categoryId: fragrancesCategory.id,
      inStock: true,
      isNew: true,
      isBestSeller: true,
    },
    {
      slug: "yves-saint-laurent-y",
      namePt: "Yves Saint Laurent Y Eau de Toilette 100ml",
      nameEn: "Yves Saint Laurent Y Eau de Toilette 100ml",
      descriptionPt: "Fragrância moderna e masculina com notas frescas e amadeiradas.",
      descriptionEn: "Modern masculine fragrance with fresh and woody notes.",
      brand: "Yves Saint Laurent",
      priceExclVat: "89.50",
      priceInclVat: "110.09",
      imageUrl: "/products/ysl-y.jpg",
      categoryId: fragrancesCategory.id,
      inStock: true,
      isNew: false,
      isBestSeller: true,
    },
    {
      slug: "gucci-guilty-pour-homme",
      namePt: "Gucci Guilty Pour Homme Eau de Toilette 90ml",
      nameEn: "Gucci Guilty Pour Homme Eau de Toilette 90ml",
      descriptionPt: "Fragrância provocante e sensual com notas cítricas e amadeiradas.",
      descriptionEn: "Provocative and sensual fragrance with citrus and woody notes.",
      brand: "Gucci",
      priceExclVat: "76.90",
      priceInclVat: "94.59",
      imageUrl: "/products/gucci-guilty.jpg",
      categoryId: fragrancesCategory.id,
      inStock: true,
      isNew: false,
      isBestSeller: false,
    },
    {
      slug: "jean-paul-gaultier-le-male",
      namePt: "Jean Paul Gaultier Le Male Eau de Toilette 125ml",
      nameEn: "Jean Paul Gaultier Le Male Eau de Toilette 125ml",
      descriptionPt: "Fragrância icônica e masculina com notas de lavanda e baunilha.",
      descriptionEn: "Iconic masculine fragrance with lavender and vanilla notes.",
      brand: "Jean Paul Gaultier",
      priceExclVat: "82.50",
      priceInclVat: "101.48",
      imageUrl: "/products/le-male.jpg",
      categoryId: fragrancesCategory.id,
      inStock: true,
      isNew: false,
      isBestSeller: true,
    },
    {
      slug: "carolina-herrera-212-vip",
      namePt: "Carolina Herrera 212 VIP Men Eau de Toilette 100ml",
      nameEn: "Carolina Herrera 212 VIP Men Eau de Toilette 100ml",
      descriptionPt: "Fragrância vibrante e energética para o homem moderno.",
      descriptionEn: "Vibrant and energetic fragrance for the modern man.",
      brand: "Carolina Herrera",
      priceExclVat: "79.90",
      priceInclVat: "98.28",
      imageUrl: "/products/212-vip.jpg",
      categoryId: fragrancesCategory.id,
      inStock: true,
      isNew: true,
      isBestSeller: false,
    },
  ];

  // Insert products
  for (const product of [...moreTires, ...moreFragrances]) {
    try {
      await db.insert(products).values(product);
      console.log(`✓ Added ${product.nameEn}`);
    } catch (error) {
      console.error(`✗ Failed to add ${product.nameEn}:`, error.message);
    }
  }

  console.log("Seed complete!");
  process.exit(0);
}

seedMoreProducts();
