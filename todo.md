# DisparaLinea Trading - TODO List

## Database & Backend
- [x] Criar schema de produtos com categorias, preços, imagens e metadados
- [x] Criar schema de carrinho de compras
- [x] Criar schema de newsletter
- [x] Criar schema de depoimentos de clientes
- [x] Implementar tRPC procedures para produtos (listar, buscar, filtrar)
- [x] Implementar tRPC procedures para carrinho (adicionar, remover, listar)
- [x] Implementar tRPC procedure para newsletter
- [x] Popular banco com produtos exemplo (Technology, Tires, Fragrances)

## Design System & Visual Identity
- [x] Configurar tema azul escuro (#1e3a5f) em index.css
- [x] Criar logo DT dourada circular
- [x] Configurar tipografia e espaçamentos profissionais
- [x] Ajustar cores do tema para design corporativo

## Header & Navigation
- [x] Implementar header com logo DT dourada circular
- [x] Criar ticker de câmbio em tempo real (EUR/USD, EUR/GBP, EUR/BRL, USD/BRL, GBP/USD)
- [x] Adicionar navegação por categorias
- [x] Implementar seletor de idioma (PT/EN)
- [x] Adicionar ícone de carrinho com contador
- [x] Adicionar campo de busca no header

## Product Catalog
- [x] Criar página de catálogo com grid de produtos
- [x] Implementar cards de produtos com imagem, nome, marca, preços (com/sem IVA)
- [x] Adicionar badges (New, Best Seller)
- [ ] Criar página de detalhes do produto
- [x] Implementar seção de categorias visuais

## Shopping Cart
- [x] Implementar funcionalidade de adicionar ao carrinho
- [ ] Criar página/modal do carrinho
- [x] Implementar remoção de produtos do carrinho
- [x] Calcular totais com IVA (23%) e sem IVA
- [x] Atualizar contador visual no header

## Search & Filters
- [x] Implementar busca de produtos por nome, categoria e marca
- [x] Criar sistema de filtros por categoria
- [x] Adicionar filtro por faixa de preço
- [x] Adicionar filtro por marca
- [x] Adicionar filtro por disponibilidade
- [x] Implementar resultados em tempo real

## Multi-language System
- [x] Criar sistema de internacionalização (i18n)
- [x] Adicionar traduções PT/EN para todas as strings
- [x] Implementar persistência da preferência de idioma
- [x] Traduzir categorias e descrições de produtos

## Customer Testimonials
- [x] Criar seção de depoimentos na home
- [x] Implementar cards de depoimentos com foto, nome e comentário
- [x] Adicionar avaliações por estrelas

## Newsletter
- [x] Criar formulário de newsletter no footer
- [x] Implementar validação de email
- [x] Adicionar confirmação visual de inscrição
- [x] Salvar inscrições no banco de dados

## Testing & Polish
- [ ] Testar todas as funcionalidades do carrinho
- [ ] Testar busca e filtros
- [ ] Testar troca de idioma
- [ ] Verificar cálculos de IVA
- [ ] Testar ticker de câmbio
- [ ] Verificar responsividade mobile

## Imagens e Assets
- [x] Adicionar imagens reais para todos os produtos
- [x] Atualizar banco de dados com URLs de imagens de produtos
- [x] Adicionar imagens de categorias
- [x] Adicionar fotos de clientes nos depoimentos

## Correções Urgentes
- [x] Verificar por que as imagens dos produtos não estão aparecendo
- [x] Corrigir logo DT dourada circular no header
- [x] Garantir que todas as imagens estejam acessíveis

## Página de Detalhes do Produto
- [x] Criar rota e página de detalhes do produto
- [x] Implementar galeria de imagens com navegação
- [x] Adicionar funcionalidade de zoom nas imagens
- [x] Exibir especificações técnicas detalhadas
- [x] Criar sistema de reviews/avaliações
- [x] Adicionar seção de produtos relacionados
- [x] Implementar botão de adicionar ao carrinho na página

## Sistema de Checkout Completo
- [x] Criar página do carrinho de compras
- [x] Implementar atualização de quantidades no carrinho
- [x] Criar página de checkout
- [x] Adicionar formulário de endereço de entrega
- [x] Implementar seleção de método de envio
- [x] Configurar integração Stripe
- [x] Criar webhook do Stripe para processar pagamentos
- [x] Implementar página de confirmação do pedido
- [x] Limpar carrinho após pagamento bem-sucedido[ ] Adicionar sistema de pedidos no banco de dados

## Ajustes para Igualar ao Site de Referência
- [x] Copiar imagem do smartphone do hero section
- [x] Copiar logos das marcas (Apple, Samsung, Google, Xiaomi, OnePlus)
- [x] Ajustar logo do header para texto completo "DISPARALINEA TRADING LDA"
- [x] Adicionar botão "Entrar" no header
- [x] Adicionar imagem de produto no lado direito do hero
- [x] Criar seção "Trusted Brands" com logos das marcas
- [x] Adicionar ícone de estrela amarela antes do título "Featured"
- [x] Ajustar estrutura do footer com todas as seções
- [x] Adicionar cookie banner com botões Customize, Reject All, Accept All
- [x] Verificar formato exato dos preços (VAT included/excl. VAT)

## Modernização do Layout (Mantendo Tema)
- [ ] Aplicar glassmorphism nos cards e componentes
- [ ] Adicionar animações suaves (fade-in, slide-up, hover effects)
- [ ] Implementar gradientes modernos no hero section
- [ ] Melhorar sombras e profundidade visual
- [ ] Aumentar espaçamentos para layout mais respirável
- [ ] Adicionar efeitos de parallax no hero
- [ ] Implementar scroll reveal animations
- [ ] Melhorar hover states em todos os elementos interativos
- [ ] Adicionar micro-interações nos botões e cards
- [ ] Otimizar tipografia com hierarquia clara

## Melhorias Visuais Solicitadas
- [x] Aumentar tamanho da logo DisparaLinea no header
- [x] Melhorar visualização do ticker de cotação das moedas (tamanho, espaçamento, legibilidade)
