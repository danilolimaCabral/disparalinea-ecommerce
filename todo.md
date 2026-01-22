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

## Modernização do Header
- [x] Reorganizar header em uma única linha moderna
- [x] Integrar busca e ícones (idioma, login, carrinho) de forma mais limpa
- [x] Melhorar espaçamento e alinhamento dos elementos

## Ajuste do Campo de Busca
- [x] Ajustar estilo do campo de busca para ficar igual ao site de referência
- [x] Verificar bordas, cantos, tamanho e espaçamento

## Ajuste da Navegação
- [x] Mover navegação para a mesma linha do header
- [x] Integrar logo, navegação e ícones em uma única linha horizontal

## Adicionar Produtos de Pneus e Perfumes
- [x] Adicionar produtos de pneus (Michelin, Bridgestone, Pirelli, Continental, Goodyear)
- [x] Adicionar produtos de perfumes (Dior, Chanel, Versace, Paco Rabanne, Hugo Boss)
- [x] Popular banco de dados com imagens e informações dos produtos
- [x] Verificar funcionamento das páginas de categoria Tires e Fragrances

## Ajustes de Layout para Igualar ao Site de Referência
- [x] Analisar site de referência e identificar todas as diferenças de layout
- [x] Ajustar hero section (tamanho, espaçamento, posição da imagem)
- [x] Corrigir seção Trusted Brands (tamanho dos logos, espaçamento)
- [x] Ajustar grid de produtos (espaçamento, tamanho dos cards)
- [x] Corrigir espaçamentos entre seções
- [x] Ajustar tipografia (tamanhos de fonte, pesos, hierarquia)
- [x] Verificar e corrigir footer
- [x] Ajustar cores e contrastes se necessário

## Correções de Moedas e Imagens
- [x] Corrigir ticker de moedas sobrepostas
- [x] Ajustar layout do ticker para melhor visualização
- [x] Remover fundo das imagens dos produtos
- [x] Garantir imagens com fundo transparente ou branco limpo

## Modernização do Layout com Glassmorphism
- [x] Adicionar efeitos de transparência nos cards de produtos
- [x] Implementar glassmorphism no header e footer
- [x] Adicionar backdrop-blur e sombras suaves
- [x] Melhorar hierarquia visual com gradientes sutis
- [x] Adicionar animações suaves de hover e transição

## Expansão do Catálogo de Produtos
- [x] Adicionar mais 10 produtos de pneus (diferentes marcas e tamanhos)
- [x] Adicionar mais 10 produtos de perfumes (diferentes marcas e tipos)
- [x] Buscar imagens de alta qualidade com fundo transparente
- [x] Popular banco de dados com novos produtos

## Páginas de Categoria Dedicadas (Nano Banana Style)
- [x] Criar página /tires com grid completo de produtos de pneus
- [x] Adicionar filtros específicos para pneus (marca, tamanho, tipo, preço)
- [x] Criar página /fragrances com grid completo de perfumes
- [x] Adicionar filtros específicos para perfumes (marca, gênero, volume, preço)
- [x] Implementar animações suaves e transições elegantes
- [x] Adicionar loading skeletons para melhor UX

## Sistema de Autenticação Próprio
- [ ] Remover dependências do OAuth Manus
- [ ] Criar schema de usuários local com senha hash
- [ ] Implementar página de registro com validação
- [ ] Implementar página de login com feedback visual
- [ ] Adicionar recuperação de senha por email
- [ ] Criar página de perfil de usuário editável
- [ ] Implementar sessões JWT locais
- [ ] Atualizar Header para usar novo sistema de auth

## Imagens dos Novos Produtos
- [x] Buscar imagens profissionais dos 5 pneus (Dunlop, Yokohama, Hankook, Falken, Toyo)
- [x] Buscar imagens profissionais dos 5 perfumes (Tom Ford, YSL, Gucci, JPG, Carolina Herrera)
- [x] Garantir fundo transparente ou branco limpo
- [x] Atualizar banco de dados com URLs das novas imagens

## URGENTE: Corrigir Todos os Links de Navegação
- [x] Criar página /smartphones com grid de produtos e filtros
- [x] Criar página /tablets com grid de produtos e filtros
- [x] Criar página /wearables com grid de produtos e filtros
- [x] Criar página /accessories com grid de produtos e filtros
- [x] Criar página /laptops com grid de produtos e filtros
- [x] Criar página /about-us com informações da empresa
- [x] Criar página /contact com formulário de contato
- [x] Atualizar Header com links corretos (usando Link do wouter)
- [x] Testar todos os links do menu

## Remover Autenticação Manus OAuth
- [ ] Atualizar schema de users para adicionar campo password (hash)
- [ ] Remover campo openId do schema de users
- [ ] Implementar hash de senhas com bcrypt
- [ ] Criar tRPC procedure para registro (signup)
- [ ] Criar tRPC procedure para login com email/senha
- [ ] Criar tRPC procedure para recuperação de senha
- [ ] Criar tRPC procedure para atualizar perfil de usuário
- [ ] Criar página /register com formulário de cadastro
- [ ] Criar página /login com formulário de login
- [ ] Criar página /profile para editar informações do usuário
- [ ] Criar página /forgot-password para recuperação de senha
- [ ] Remover botão "Login" que redireciona para OAuth Manus
- [ ] Atualizar Header com link para /login
- [ ] Remover dependências de OAuth Manus do código
- [ ] Testar fluxo completo de registro, login e recuperação de senha

## Teste Completo do Site
### Navegação e Links
- [x] Testar todos os links do menu (Home, Smartphones, Tablets, Wearables, Accessories, Laptops, Tires, Fragrances, About Us, Contact)
- [x] Verificar se todas as páginas carregam corretamente
- [ ] Testar botão de voltar em páginas internas
- [ ] Verificar links do footer

### Imagens
- [x] Verificar se logo DisparaLinea carrega corretamente
- [x] Verificar imagem do hero section (smartphone)
- [x] Verificar logos das marcas (Apple, Samsung, Google, Xiaomi, OnePlus)
- [x] Verificar imagens de todos os produtos (36 produtos)
- [x] Verificar imagens nas páginas de detalhes dos produtos
- [x] Verificar fotos dos depoimentos de clientes

### Funcionalidades do Carrinho
- [ ] Testar adicionar produto ao carrinho
- [ ] Verificar contador do carrinho no header
- [ ] Testar página do carrinho (/cart)
- [ ] Testar remover produto do carrinho
- [ ] Testar atualizar quantidade no carrinho
- [ ] Verificar cálculo de totais (com e sem IVA)

### Checkout e Pagamento
- [ ] Testar botão "Proceed to Checkout"
- [ ] Verificar formulário de endereço de entrega
- [ ] Testar integração Stripe
- [ ] Verificar página de confirmação do pedido

### Filtros e Busca
- [ ] Testar filtros em cada página de categoria
- [ ] Verificar ordenação de produtos (preço, relevância)
- [ ] Testar ícone de busca no header
- [ ] Verificar resultados de busca

### Multi-idioma
- [ ] Testar seletor de idioma PT/EN
- [ ] Verificar traduções em todas as páginas
- [ ] Verificar persistência da escolha de idioma

### Outros
- [ ] Testar ticker de câmbio (animação e valores)
- [ ] Testar cookie banner (Customize, Reject All, Accept All)
- [ ] Verificar responsividade em mobile
- [ ] Testar formulário de newsletter
- [ ] Testar formulário de contato

## Preparação para Deploy no Railway

- [x] Criar arquivo railway.json com configurações de build
- [x] Criar Procfile para definir comando de start
- [x] Ajustar package.json com scripts de produção
- [x] Criar arquivo .railwayignore
- [x] Documentar variáveis de ambiente necessárias
- [x] Criar guia completo de deploy no Railway (RAILWAY_DEPLOY.md)
- [x] Testar configurações de build localmente

## Modernização Visual com Glassmorphism

- [x] Aplicar backdrop-blur e transparências nos cards de produtos
- [x] Adicionar efeitos glassmorphism no header e footer
- [x] Implementar gradientes modernos no hero section
- [x] Adicionar animações suaves de fade-in e slide-up
- [x] Melhorar sombras e profundidade visual
- [x] Implementar hover effects elegantes
- [x] Adicionar micro-interações nos botões

## Geração de Imagens com IA

- [ ] Gerar imagens profissionais para 36 produtos usando IA
- [ ] Fazer upload das imagens para S3
- [ ] Atualizar banco de dados com novas URLs
- [ ] Verificar carregamento de todas as imagens

## CI/CD Automático

- [x] Criar workflow do GitHub Actions (.github/workflows/deploy.yml)
- [x] Configurar testes automatizados no CI
- [x] Configurar deploy automático no Railway
- [x] Adicionar documentação completa (CI_CD_SETUP.md)

## Sistema de Reviews

- [x] Criar schema de reviews no banco de dados
- [x] Implementar tRPC procedures para reviews (criar, listar, atualizar)
- [x] Criar componente de exibição de reviews
- [x] Criar formulário de adicionar review
- [x] Adicionar sistema de estrelas (rating)
- [x] Adicionar verificação de compra
- [x] Adicionar botão "Helpful" para reviews
- [x] Integrar reviews na página de detalhes do produto

## Validação de Categorias

- [x] Testar categoria Smartphones (3 produtos)
- [x] Testar categoria Tablets (2 produtos)
- [x] Testar categoria Wearables (2 produtos)
- [x] Testar categoria Accessories (2 produtos)
- [x] Testar categoria Laptops (2 produtos)
- [x] Testar categoria Tires (12 produtos)
- [x] Testar categoria Fragrances (13 produtos)
- [x] Verificar contagem de produtos por categoria (36 total)
- [x] Nenhum problema encontrado - todas funcionando perfeitamente

## Validação Individual de Todos os Produtos (36 total)

**Status:** Validação por amostragem estratégica (7 produtos testados)
**Problema Crítico Encontrado:** Inconsistência de slugs PT/EN

### Smartphones (3)
- [x] Samsung Galaxy S24 Ultra 512GB ✅ PERFEITO
- [ ] Apple iPhone 15 Pro Max 256GB
- [ ] Google Pixel 8 Pro 256GB

### Tablets (2)
- [x] Apple iPad Pro 11" 256GB ✅ PERFEITO
- [ ] Samsung Galaxy Tab S9 Ultra

### Wearables (2)
- [x] Apple Watch Series 9 45mm ✅ PERFEITO
- [ ] Samsung Galaxy Watch 6 Classic

### Acessórios (2)
- [ ] Apple AirPods Pro 2ª Geração USB-C ❌ SLUG INCONSISTENTE
- [ ] Samsung Galaxy Buds2 Pro

### Laptops (2)
- [x] Apple MacBook Pro 14" M3 512GB ✅ PERFEITO
- [ ] Dell XPS 15 Intel i9

### Pneus (12)
- [ ] Dunlop Sport Maxx RT2
- [ ] Yokohama Advan Sport V105
- [ ] Hankook Ventus S1 evo3
- [ ] Falken Azenis FK510
- [ ] Toyo Proxes Sport
- [ ] Pirelli P Zero
- [ ] Continental PremiumContact 6
- [ ] Goodyear Eagle F1 Asymmetric 5
- [x] Michelin Pilot Sport 4 ✅ PERFEITO
- [ ] Bridgestone Turanza T005
- [ ] Michelin Pilot Sport 4S 245/40 R18
- [ ] Continental WinterContact TS 860 205/55 R16

### Fragrâncias (13)
- [ ] Carolina Herrera 212 VIP Men
- [ ] Tom Ford Oud Wood
- [ ] Jean Paul Gaultier Le Male
- [ ] Gucci Guilty Pour Homme
- [ ] Yves Saint Laurent Y
- [ ] Chanel No. 5 (variação 1)
- [ ] Hugo Boss Bottled
- [ ] Giorgio Armani Acqua di Giò
- [ ] Paco Rabanne 1 Million
- [ ] Versace Eros
- [ ] Dior Sauvage EDT ❌ SLUG INCONSISTENTE
- [ ] Dior Sauvage EDP
- [ ] Chanel No. 5 (variação 2)

## 🔴 PROBLEMA CRÍTICO: Inconsistência de Slugs

- [ ] URGENTE: Corrigir slugs PT/EN no banco de dados
- [ ] Opção A: Regenerar todos os slugs em inglês (recomendado)
- [ ] Opção B: Atualizar código para usar slugs em português
- [ ] Validar TODOS os 36 produtos após correção
- [ ] Implementar testes automatizados para validação de slugs


## 🚨 CORREÇÃO URGENTE: Slugs Inconsistentes

- [x] Criar script para regenerar slugs em inglês baseados em nameEn
- [x] Executar script no banco de dados (10 produtos atualizados, 26 inalterados)
- [x] Validar produtos problemáticos (AirPods Pro e Dior Sauvage) - FUNCIONANDO
- [x] Testar amostra adicional de produtos
- [x] Verificar funcionalidade de busca com novos slugs - 2 produtos Dior encontrados
