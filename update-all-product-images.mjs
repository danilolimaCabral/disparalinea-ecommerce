import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';

const DATABASE_URL = process.env.DATABASE_URL;

const connection = await mysql.createConnection(DATABASE_URL);
const db = drizzle(connection);

// Mapeamento de slugs para nomes de arquivos de imagem
const imageMap = {
  // Smartphones
  'samsung-galaxy-s24-ultra-512gb': 'samsung-galaxy-s24-ultra.png',
  'apple-iphone-15-pro-max-256gb': 'iphone-15-pro-max.png',
  'google-pixel-8-pro-256gb': 'google-pixel-8-pro.png',
  
  // Tablets
  'apple-ipad-pro-11-256gb': 'ipad-pro-11.png',
  'samsung-galaxy-tab-s9-ultra': 'samsung-tab-s9-ultra.png',
  
  // Wearables
  'apple-watch-series-9-45mm': 'apple-watch-series-9.png',
  'samsung-galaxy-watch-6-classic': 'samsung-galaxy-watch-6-classic.png',
  
  // Acessórios
  'apple-airpods-pro-2nd-generation-usb-c': 'airpods-pro-2.png',
  'samsung-galaxy-buds2-pro': 'galaxy-buds2-pro.png',
  
  // Laptops
  'apple-macbook-pro-14-m3-512gb': 'macbook-pro-14-m3.png',
  'dell-xps-15-intel-i9': 'dell-xps-15.png',
  
  // Pneus
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
  'michelin-pilot-sport-4s-245-40-r18': 'michelin-pilot-sport-4s.png',
  'continental-wintercontact-ts-860-205-55-r16': 'continental-wintercontact-ts860.png',
  
  // Fragrâncias
  'dior-sauvage-eau-de-toilette-100ml': 'dior-sauvage-edt.png',
  'dior-sauvage-eau-de-parfum-100ml': 'dior-sauvage-edp.png',
  'chanel-no-5-eau-de-parfum-100ml': 'chanel-no5-edp.png',
  'versace-eros-eau-de-toilette-100ml': 'versace-eros.png',
  'paco-rabanne-1-million-eau-de-toilette-100ml': 'paco-rabanne-1-million.png',
  'giorgio-armani-acqua-di-gio-eau-de-toilette-100ml': 'giorgio-armani-acqua-di-gio.png',
  'hugo-boss-bottled-eau-de-toilette-100ml': 'hugo-boss-bottled.png',
  'chanel-no-5-eau-de-toilette-100ml': 'chanel-no5-edt.png',
  'yves-saint-laurent-y-eau-de-toilette-100ml': 'yves-saint-laurent-y.png',
  'gucci-guilty-pour-homme-eau-de-toilette-90ml': 'gucci-guilty-pour-homme.png',
  'jean-paul-gaultier-le-male-eau-de-toilette-125ml': 'jean-paul-gaultier-le-male.png',
  'tom-ford-oud-wood-eau-de-parfum-100ml': 'tom-ford-oud-wood.png',
  'carolina-herrera-212-vip-men-eau-de-toilette-100ml': 'carolina-herrera-212-vip-men.png',
};

console.log('🖼️  Atualizando imagens dos produtos...\n');

let updated = 0;
let notFound = 0;

for (const [slug, imageName] of Object.entries(imageMap)) {
  const imagePath = `/products/${imageName}`;
  
  try {
    const [result] = await connection.execute(
      'UPDATE product SET image = ? WHERE slug = ?',
      [imagePath, slug]
    );
    
    if (result.affectedRows > 0) {
      console.log(`✅ ${slug} → ${imagePath}`);
      updated++;
    } else {
      console.log(`⚠️  Produto não encontrado: ${slug}`);
      notFound++;
    }
  } catch (error) {
    console.error(`❌ Erro ao atualizar ${slug}:`, error.message);
  }
}

console.log(`\n📊 Resumo:`);
console.log(`   ✅ Atualizados: ${updated}`);
console.log(`   ⚠️  Não encontrados: ${notFound}`);
console.log(`   📦 Total: ${Object.keys(imageMap).length}`);

await connection.end();
console.log('\n✨ Concluído!');
