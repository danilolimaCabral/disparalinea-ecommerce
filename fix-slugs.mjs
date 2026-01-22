import mysql from 'mysql2/promise';

// Função para criar slug a partir de texto
function createSlug(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^a-z0-9]+/g, '-') // Substitui caracteres especiais por hífen
    .replace(/^-+|-+$/g, ''); // Remove hífens do início e fim
}

async function fixSlugs() {
  console.log('🔧 Iniciando correção de slugs...\n');

  // Conectar ao banco
  const connection = await mysql.createConnection(process.env.DATABASE_URL);

  try {
    // Buscar todos os produtos
    const [allProducts] = await connection.execute('SELECT id, nameEn, slug FROM products ORDER BY id');
    console.log(`📦 Encontrados ${allProducts.length} produtos\n`);

    let updated = 0;
    let unchanged = 0;
    const usedSlugs = new Set();

    for (const product of allProducts) {
      const oldSlug = product.slug;
      let newSlug = createSlug(product.nameEn);

      // Se o slug já foi usado, adicionar sufixo numérico
      if (usedSlugs.has(newSlug)) {
        let counter = 2;
        let uniqueSlug = `${newSlug}-${counter}`;
        while (usedSlugs.has(uniqueSlug)) {
          counter++;
          uniqueSlug = `${newSlug}-${counter}`;
        }
        newSlug = uniqueSlug;
        console.log(`⚠️  Slug duplicado detectado, usando: ${newSlug}`);
      }

      usedSlugs.add(newSlug);

      if (oldSlug !== newSlug) {
        // Atualizar slug no banco
        await connection.execute(
          'UPDATE products SET slug = ? WHERE id = ?',
          [newSlug, product.id]
        );

        console.log(`✅ Atualizado: ${product.nameEn}`);
        console.log(`   Antigo: ${oldSlug}`);
        console.log(`   Novo: ${newSlug}\n`);
        updated++;
      } else {
        unchanged++;
      }
    }

    console.log('\n📊 Resumo:');
    console.log(`   ✅ Atualizados: ${updated}`);
    console.log(`   ⏭️  Inalterados: ${unchanged}`);
    console.log(`   📦 Total: ${allProducts.length}`);
    console.log('\n✨ Correção concluída com sucesso!');

  } catch (error) {
    console.error('❌ Erro ao corrigir slugs:', error);
    throw error;
  } finally {
    await connection.end();
  }
}

// Executar script
fixSlugs().catch(console.error);
