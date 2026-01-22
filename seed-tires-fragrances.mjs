import { drizzle } from 'drizzle-orm/mysql2';
import { products, categories } from './drizzle/schema.ts';

const db = drizzle(process.env.DATABASE_URL);
const VAT_RATE = 1.23; // 23% VAT

async function seedTiresAndFragrances() {
  console.log('🌱 Seeding tires and fragrances products...');

  // Get category IDs
  const allCategories = await db.select().from(categories);
  const tiresCategory = allCategories.find(c => c.slug === 'tires');
  const fragrancesCategory = allCategories.find(c => c.slug === 'fragrances');

  if (!tiresCategory || !fragrancesCategory) {
    console.error('❌ Categories not found. Please run the main seed script first.');
    process.exit(1);
  }

  // Tires products
  const tiresProducts = [
    {
      nameEn: 'Michelin Pilot Sport 4',
      namePt: 'Michelin Pilot Sport 4',
      slug: 'michelin-pilot-sport-4',
      descriptionEn: 'High-performance summer tire with excellent grip and handling. Size: 225/45R17',
      descriptionPt: 'Pneu de alto desempenho para verão com excelente aderência e manuseamento. Tamanho: 225/45R17',
      priceExclVat: '145.50',
      priceInclVat: (145.50 * VAT_RATE).toFixed(2),
      categoryId: tiresCategory.id,
      brand: 'Michelin',
      imageUrl: 'https://images.unsplash.com/photo-1606016159991-4a1d5d0b4c1e?w=800',
      stockQuantity: 50,
      inStock: true,
      isNew: false,
      isBestSeller: true,
    },
    {
      nameEn: 'Bridgestone Turanza T005',
      namePt: 'Bridgestone Turanza T005',
      slug: 'bridgestone-turanza-t005',
      descriptionEn: 'Premium touring tire for superior comfort and safety. Size: 205/55R16',
      descriptionPt: 'Pneu de turismo premium para conforto e segurança superiores. Tamanho: 205/55R16',
      priceExclVat: '112.30',
      priceInclVat: (112.30 * VAT_RATE).toFixed(2),
      categoryId: tiresCategory.id,
      brand: 'Bridgestone',
      imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
      stockQuantity: 45,
      inStock: true,
      isNew: false,
      isBestSeller: false,
    },
    {
      nameEn: 'Pirelli P Zero',
      namePt: 'Pirelli P Zero',
      slug: 'pirelli-p-zero',
      descriptionEn: 'Ultra-high performance tire for sports cars. Size: 245/40R18',
      descriptionPt: 'Pneu de ultra-alto desempenho para carros desportivos. Tamanho: 245/40R18',
      priceExclVat: '198.75',
      priceInclVat: (198.75 * VAT_RATE).toFixed(2),
      categoryId: tiresCategory.id,
      brand: 'Pirelli',
      imageUrl: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=800',
      stockQuantity: 30,
      inStock: true,
      isNew: true,
      isBestSeller: true,
    },
    {
      nameEn: 'Continental PremiumContact 6',
      namePt: 'Continental PremiumContact 6',
      slug: 'continental-premiumcontact-6',
      descriptionEn: 'Premium tire with excellent braking performance. Size: 215/55R17',
      descriptionPt: 'Pneu premium com excelente desempenho de travagem. Tamanho: 215/55R17',
      priceExclVat: '128.90',
      priceInclVat: (128.90 * VAT_RATE).toFixed(2),
      categoryId: tiresCategory.id,
      brand: 'Continental',
      imageUrl: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800',
      stockQuantity: 40,
      inStock: true,
      isNew: false,
      isBestSeller: false,
    },
    {
      nameEn: 'Goodyear Eagle F1 Asymmetric 5',
      namePt: 'Goodyear Eagle F1 Asymmetric 5',
      slug: 'goodyear-eagle-f1-asymmetric-5',
      descriptionEn: 'High-performance tire with superior wet grip. Size: 225/45R18',
      descriptionPt: 'Pneu de alto desempenho com aderência superior em piso molhado. Tamanho: 225/45R18',
      priceExclVat: '156.40',
      priceInclVat: (156.40 * VAT_RATE).toFixed(2),
      categoryId: tiresCategory.id,
      brand: 'Goodyear',
      imageUrl: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800',
      stockQuantity: 35,
      inStock: true,
      isNew: true,
      isBestSeller: false,
    },
  ];

  // Fragrances products
  const fragrancesProducts = [
    {
      nameEn: 'Dior Sauvage Eau de Toilette 100ml',
      namePt: 'Dior Sauvage Eau de Toilette 100ml',
      slug: 'dior-sauvage-edt-100ml',
      descriptionEn: 'Fresh and powerful fragrance with notes of bergamot and pepper. Perfect for modern men.',
      descriptionPt: 'Fragrância fresca e poderosa com notas de bergamota e pimenta. Perfeito para homens modernos.',
      priceExclVat: '89.50',
      priceInclVat: (89.50 * VAT_RATE).toFixed(2),
      categoryId: fragrancesCategory.id,
      brand: 'Dior',
      imageUrl: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800',
      stockQuantity: 80,
      inStock: true,
      isNew: false,
      isBestSeller: true,
    },
    {
      nameEn: 'Chanel No. 5 Eau de Parfum 100ml',
      namePt: 'Chanel No. 5 Eau de Parfum 100ml',
      slug: 'chanel-no-5-edp-100ml',
      descriptionEn: 'Iconic feminine fragrance with floral and aldehyde notes. Timeless elegance.',
      descriptionPt: 'Fragrância feminina icónica com notas florais e aldeídicas. Elegância atemporal.',
      priceExclVat: '125.00',
      priceInclVat: (125.00 * VAT_RATE).toFixed(2),
      categoryId: fragrancesCategory.id,
      brand: 'Chanel',
      imageUrl: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800',
      stockQuantity: 60,
      inStock: true,
      isNew: false,
      isBestSeller: true,
    },
    {
      nameEn: 'Versace Eros Eau de Toilette 100ml',
      namePt: 'Versace Eros Eau de Toilette 100ml',
      slug: 'versace-eros-edt-100ml',
      descriptionEn: 'Vibrant and seductive fragrance with mint, lemon and vanilla notes.',
      descriptionPt: 'Fragrância vibrante e sedutora com notas de menta, limão e baunilha.',
      priceExclVat: '67.90',
      priceInclVat: (67.90 * VAT_RATE).toFixed(2),
      categoryId: fragrancesCategory.id,
      brand: 'Versace',
      imageUrl: 'https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=800',
      stockQuantity: 70,
      inStock: true,
      isNew: true,
      isBestSeller: false,
    },
    {
      nameEn: 'Paco Rabanne 1 Million Eau de Toilette 100ml',
      namePt: 'Paco Rabanne 1 Million Eau de Toilette 100ml',
      slug: 'paco-rabanne-1-million-edt-100ml',
      descriptionEn: 'Bold and luxurious fragrance with cinnamon, rose and leather notes.',
      descriptionPt: 'Fragrância ousada e luxuosa com notas de canela, rosa e couro.',
      priceExclVat: '72.50',
      priceInclVat: (72.50 * VAT_RATE).toFixed(2),
      categoryId: fragrancesCategory.id,
      brand: 'Paco Rabanne',
      imageUrl: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59d75?w=800',
      stockQuantity: 55,
      inStock: true,
      isNew: false,
      isBestSeller: true,
    },
    {
      nameEn: 'Hugo Boss Bottled Eau de Toilette 100ml',
      namePt: 'Hugo Boss Bottled Eau de Toilette 100ml',
      slug: 'hugo-boss-bottled-edt-100ml',
      descriptionEn: 'Classic masculine fragrance with apple, cinnamon and vanilla notes.',
      descriptionPt: 'Fragrância masculina clássica com notas de maçã, canela e baunilha.',
      priceExclVat: '58.30',
      priceInclVat: (58.30 * VAT_RATE).toFixed(2),
      categoryId: fragrancesCategory.id,
      brand: 'Hugo Boss',
      imageUrl: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800',
      stockQuantity: 65,
      inStock: true,
      isNew: false,
      isBestSeller: false,
    },
    {
      nameEn: 'Giorgio Armani Acqua di Giò 100ml',
      namePt: 'Giorgio Armani Acqua di Giò 100ml',
      slug: 'armani-acqua-di-gio-100ml',
      descriptionEn: 'Fresh aquatic fragrance with marine and citrus notes. Perfect for summer.',
      descriptionPt: 'Fragrância aquática fresca com notas marinhas e cítricas. Perfeito para o verão.',
      priceExclVat: '82.00',
      priceInclVat: (82.00 * VAT_RATE).toFixed(2),
      categoryId: fragrancesCategory.id,
      brand: 'Giorgio Armani',
      imageUrl: 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=800',
      stockQuantity: 50,
      inStock: true,
      isNew: true,
      isBestSeller: true,
    },
  ];

  // Insert tires products
  console.log('📦 Adding tires products...');
  for (const product of tiresProducts) {
    await db.insert(products).values(product);
    console.log(`  ✓ Added: ${product.nameEn}`);
  }

  // Insert fragrances products
  console.log('🌸 Adding fragrances products...');
  for (const product of fragrancesProducts) {
    await db.insert(products).values(product);
    console.log(`  ✓ Added: ${product.nameEn}`);
  }

  console.log('✅ Tires and fragrances products seeded successfully!');
  process.exit(0);
}

seedTiresAndFragrances().catch((error) => {
  console.error('❌ Error seeding database:', error);
  process.exit(1);
});
