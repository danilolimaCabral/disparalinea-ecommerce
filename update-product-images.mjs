import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { products } from './drizzle/schema.js';
import { eq } from 'drizzle-orm';

const connection = await mysql.createConnection(process.env.DATABASE_URL);
const db = drizzle(connection);

// Mapeamento de slug para nome de arquivo da imagem
const imageMapping = {
  // Smartphones
  'samsung-galaxy-s24-ultra': 'samsung-galaxy-s24-ultra.png',
  'iphone-15-pro-max': 'iphone-15-pro-max.png',
  'google-pixel-8-pro': 'google-pixel-8-pro.png',
  
  // Tablets
  'ipad-pro-11': 'ipad-pro-11.png',
  'samsung-galaxy-tab-s9-ultra': 'samsung-tab-s9-ultra.png',
  
  // Wearables
  'apple-watch-series-9': 'apple-watch-series-9.png',
  'samsung-galaxy-watch-6-classic': 'samsung-galaxy-watch-6-classic.png',
  
  // Accessories
  'airpods-pro-2nd-gen': 'airpods-pro-2.png',
  'galaxy-buds2-pro': 'galaxy-buds2-pro.png',
  
  // Laptops
  'macbook-pro-14-m3': 'macbook-pro-14-m3.png',
  'dell-xps-15': 'dell-xps-15.png',
  
  // Tires
  'michelin-pilot-sport-4': 'michelin-pilot-sport-4.png',
  'bridgestone-turanza-t005': 'bridgestone-turanza-t005.png',
  'goodyear-eagle-f1-asymmetric-5': 'goodyear-eagle-f1-asymmetric-5.png',
  'continental-premiumcontact-6': 'continental-premiumcontact-6.png',
  'pirelli-p-zero': 'pirelli-p-zero.png',
  'toyo-proxes-sport': 'toyo-proxes-sport.png',
  'falken-azenis-fk510': 'falken-azenis-fk510.png',
  'hankook-ventus-s1-evo3': 'hankook-ventus-s1-evo3.png',
  'yokohama-advan-sport-v105': 'yokohama-advan-sport-v105.png',
  'dunlop-sport-maxx-rt2': 'dunlop-sport-maxx-rt2.png',
  'michelin-pilot-sport-4s': 'michelin-pilot-sport-4s.png',
  'continental-wintercontact-ts-860': 'continental-wintercontact-ts860.png',
  
  // Fragrances
  'dior-sauvage': 'dior-sauvage.png',
  'chanel-bleu-de-chanel': 'chanel-bleu.png',
  'versace-eros': 'versace-eros.png',
  'paco-rabanne-1-million': 'paco-rabanne-1-million.png',
  'hugo-boss-bottled': 'hugo-boss-bottled.png',
  'armani-acqua-di-gio': 'armani-acqua-di-gio.png',
  'tom-ford-noir': 'tom-ford-noir.png',
  'ysl-y': 'ysl-y.png',
  'gucci-guilty': 'gucci-guilty.png',
  'jean-paul-gaultier-le-male': 'jean-paul-gaultier-le-male.png',
  'carolina-herrera-212-vip': 'carolina-herrera-212-vip.png',
  'dolce-gabbana-the-one': 'dolce-gabbana-the-one.png',
  'burberry-brit': 'burberry-brit.png'
};

console.log('🔄 Atualizando URLs das imagens de produtos...\n');

let updatedCount = 0;

for (const [slug, imageName] of Object.entries(imageMapping)) {
  const newImageUrl = `/products/${imageName}`;
  
  try {
    await db
      .update(products)
      .set({ imageUrl: newImageUrl })
      .where(eq(products.slug, slug));
    
    console.log(`✅ ${slug} -> ${newImageUrl}`);
    updatedCount++;
  } catch (error) {
    console.error(`❌ Erro ao atualizar ${slug}:`, error.message);
  }
}

console.log(`\n✨ Atualização concluída! ${updatedCount}/${Object.keys(imageMapping).length} produtos atualizados.`);

await connection.end();
