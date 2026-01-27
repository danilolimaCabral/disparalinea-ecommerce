import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { products } from './drizzle/schema.js';

console.log('🌱 Iniciando seed do banco de dados...\n');

// Verificar se DATABASE_URL está definida
if (!process.env.DATABASE_URL) {
  console.error('❌ Erro: DATABASE_URL não está definida!');
  console.log('Execute: export DATABASE_URL="sua-connection-string"');
  process.exit(1);
}

const connection = await mysql.createConnection(process.env.DATABASE_URL);
const db = drizzle(connection);

console.log('✅ Conectado ao banco de dados\n');

// Verificar se já existem produtos
const existingProducts = await db.select().from(products);

if (existingProducts.length > 0) {
  console.log(`⚠️  Banco já contém ${existingProducts.length} produtos.`);
  console.log('Deseja continuar e adicionar mais produtos? (Ctrl+C para cancelar)\n');
  // Aguardar 3 segundos
  await new Promise(resolve => setTimeout(resolve, 3000));
}

console.log('📦 Populando banco com produtos...\n');

// Produtos de Technology - Smartphones
const smartphones = [
  {
    name: 'Samsung Galaxy S24 Ultra 512GB',
    slug: 'samsung-galaxy-s24-ultra',
    description: 'Latest flagship with AI features, 200MP camera, and S Pen',
    category: 'Technology',
    subcategory: 'Smartphones',
    brand: 'Samsung',
    price: 1035.32,
    currency: 'EUR',
    vatRate: 23,
    stock: 15,
    imageUrl: '/products/samsung-galaxy-s24-ultra.png',
    featured: true,
    isNew: true,
    specifications: JSON.stringify({
      display: '6.8" Dynamic AMOLED 2X',
      processor: 'Snapdragon 8 Gen 3',
      ram: '12GB',
      storage: '512GB',
      camera: '200MP + 50MP + 12MP + 10MP',
      battery: '5000mAh'
    })
  },
  {
    name: 'Apple iPhone 15 Pro Max 256GB',
    slug: 'iphone-15-pro-max',
    description: 'Titanium design, A17 Pro chip, and advanced camera system',
    category: 'Technology',
    subcategory: 'Smartphones',
    brand: 'Apple',
    price: 1114.97,
    currency: 'EUR',
    vatRate: 23,
    stock: 20,
    imageUrl: '/products/iphone-15-pro-max.png',
    featured: true,
    isNew: true
  },
  {
    name: 'Google Pixel 8 Pro 256GB',
    slug: 'google-pixel-8-pro',
    description: 'Google Tensor G3, best-in-class AI photography',
    category: 'Technology',
    subcategory: 'Smartphones',
    brand: 'Google',
    price: 900.00,
    currency: 'EUR',
    vatRate: 23,
    stock: 12,
    imageUrl: '/products/google-pixel-8-pro.png',
    featured: true
  }
];

// Produtos de Tires
const tires = [
  {
    name: 'Michelin Pilot Sport 4 225/45R17',
    slug: 'michelin-pilot-sport-4',
    description: 'High-performance summer tire with excellent grip',
    category: 'Tires',
    subcategory: 'Summer',
    brand: 'Michelin',
    price: 145.00,
    currency: 'EUR',
    vatRate: 23,
    stock: 50,
    imageUrl: '/products/michelin-pilot-sport-4.png',
    featured: true
  },
  {
    name: 'Bridgestone Turanza T005 205/55R16',
    slug: 'bridgestone-turanza-t005',
    description: 'Premium touring tire for comfort and safety',
    category: 'Tires',
    subcategory: 'All-Season',
    brand: 'Bridgestone',
    price: 120.00,
    currency: 'EUR',
    vatRate: 23,
    stock: 60,
    imageUrl: '/products/bridgestone-turanza-t005.png',
    featured: false
  },
  {
    name: 'Goodyear Eagle F1 Asymmetric 5 245/40R18',
    slug: 'goodyear-eagle-f1-asymmetric-5',
    description: 'Ultra-high performance with superior handling',
    category: 'Tires',
    subcategory: 'Summer',
    brand: 'Goodyear',
    price: 165.00,
    currency: 'EUR',
    vatRate: 23,
    stock: 40,
    imageUrl: '/products/goodyear-eagle-f1-asymmetric-5.png',
    featured: true
  }
];

// Produtos de Fragrances
const fragrances = [
  {
    name: 'Dior Sauvage Eau de Toilette 100ml',
    slug: 'dior-sauvage',
    description: 'Fresh and woody fragrance for men',
    category: 'Fragrances',
    subcategory: 'Men',
    brand: 'Dior',
    price: 110.08,
    currency: 'EUR',
    vatRate: 23,
    stock: 25,
    imageUrl: '/products/dior-sauvage.png',
    featured: true
  },
  {
    name: 'Chanel Bleu de Chanel Eau de Parfum 100ml',
    slug: 'chanel-bleu-de-chanel',
    description: 'Sophisticated woody aromatic fragrance',
    category: 'Fragrances',
    subcategory: 'Men',
    brand: 'Chanel',
    price: 135.00,
    currency: 'EUR',
    vatRate: 23,
    stock: 30,
    imageUrl: '/products/chanel-bleu.png',
    featured: true,
    isNew: true
  },
  {
    name: 'Versace Eros Eau de Toilette 100ml',
    slug: 'versace-eros',
    description: 'Passionate and masculine fragrance',
    category: 'Fragrances',
    subcategory: 'Men',
    brand: 'Versace',
    price: 83.52,
    currency: 'EUR',
    vatRate: 23,
    stock: 35,
    imageUrl: '/products/versace-eros.png',
    featured: false,
    isNew: true
  }
];

// Inserir produtos
const allProducts = [...smartphones, ...tires, ...fragrances];

let insertedCount = 0;

for (const product of allProducts) {
  try {
    await db.insert(products).values(product);
    console.log(`✅ ${product.name}`);
    insertedCount++;
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      console.log(`⏭️  ${product.name} (já existe)`);
    } else {
      console.error(`❌ Erro ao inserir ${product.name}:`, error.message);
    }
  }
}

console.log(`\n✨ Seed concluído! ${insertedCount}/${allProducts.length} produtos inseridos.`);
console.log('\n📊 Resumo:');
console.log(`   - ${smartphones.length} Smartphones`);
console.log(`   - ${tires.length} Pneus`);
console.log(`   - ${fragrances.length} Perfumes`);

await connection.end();
