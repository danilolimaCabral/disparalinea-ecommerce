# 🛒 DisparaLinea Trading - E-commerce Premium

E-commerce moderno e elegante com design glassmorphism, suporte multi-idioma (PT/EN), ticker de câmbio em tempo real e checkout integrado com Stripe.

![DisparaLinea Trading](https://img.shields.io/badge/Status-Production%20Ready-success)
![Railway](https://img.shields.io/badge/Deploy-Railway-blueviolet)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)

---

## ✨ Características

### 🎨 Design Moderno
- **Glassmorphism** com transparências e blur effects
- **Animações suaves** e transições elegantes
- **Responsivo** para todos os dispositivos
- **Tema azul corporativo** (#1e3a5f)

### 💱 Ticker de Câmbio em Tempo Real
- EUR/USD, EUR/GBP, EUR/BRL, USD/BRL, GBP/USD
- Atualização automática a cada 30 segundos
- Indicadores visuais de alta/baixa

### 🌍 Multi-idioma
- Português (PT-BR)
- English (EN)
- Persistência da preferência do usuário

### 🛍️ Catálogo de Produtos
- **36 produtos** em 3 categorias principais:
  - **Technology** (11): Smartphones, Tablets, Wearables, Accessories, Laptops
  - **Tires** (12): Michelin, Bridgestone, Goodyear, Continental, Pirelli, etc.
  - **Fragrances** (13): Dior, Chanel, Versace, Paco Rabanne, Hugo Boss, etc.

### 🔍 Busca e Filtros Avançados
- Busca por nome, marca e categoria
- Filtros por marca, preço, disponibilidade
- Resultados em tempo real

### 🛒 Carrinho de Compras
- Adicionar/remover produtos
- Cálculo automático de IVA (23%)
- Contador visual no header
- Persistência entre sessões

### 💳 Checkout com Stripe
- Integração completa com Stripe Checkout
- Suporte a cartões de crédito/débito
- Webhooks para confirmação de pagamento
- Ambiente de testes configurado

---

## 🚀 Deploy Rápido no Railway

### Opção 1: Deploy com 1 Clique (Recomendado)

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template?template=https://github.com/danilolimaCabral/disparalinea-ecommerce)

### Opção 2: Deploy Manual (10 minutos)

Siga o guia completo: **[DEPLOY_RAPIDO.md](./DEPLOY_RAPIDO.md)**

**Resumo dos 3 passos:**

1. **Criar projeto no Railway** conectando ao GitHub
2. **Adicionar MySQL** e configurar 4 variáveis de ambiente
3. **Migrar banco** e acessar o site

---

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React 19** - UI library
- **Tailwind CSS 4** - Styling com glassmorphism
- **Wouter** - Roteamento leve
- **shadcn/ui** - Componentes modernos
- **Lucide React** - Ícones

### Backend
- **Express 4** - Web framework
- **tRPC 11** - Type-safe API
- **Drizzle ORM** - Database toolkit
- **MySQL** - Database

### Integrações
- **Stripe** - Pagamentos
- **ExchangeRate-API** - Cotações de câmbio em tempo real

### Imagens
- **36 imagens de produtos** regeneradas com **nano banana AI**
- Qualidade fotorealística profissional
- Fundo branco puro para consistência
- Resolução ultra-alta para e-commerce premium

---

## 📦 Estrutura do Projeto

```
disparalinea-trading/
├── client/                    # Frontend React
│   ├── public/
│   │   └── products/         # 36 imagens de produtos (nano banana AI)
│   └── src/
│       ├── components/       # Componentes reutilizáveis
│       ├── contexts/         # Contextos React (i18n, cart)
│       ├── pages/            # Páginas da aplicação
│       └── lib/              # Utilitários e tRPC client
├── server/                   # Backend Express + tRPC
│   ├── routers.ts           # Procedures tRPC
│   ├── db.ts                # Query helpers
│   └── _core/               # Infraestrutura (auth, LLM, storage)
├── drizzle/                 # Schema e migrações
│   └── schema.ts            # Definição das tabelas
└── shared/                  # Tipos e constantes compartilhadas
```

---

## 🔧 Desenvolvimento Local

### Pré-requisitos

- Node.js 22+
- pnpm 9+
- MySQL 8+

### Instalação

```bash
# Clonar repositório
git clone https://github.com/danilolimaCabral/disparalinea-ecommerce.git
cd disparalinea-ecommerce

# Instalar dependências
pnpm install

# Configurar variáveis de ambiente
cp .env.example .env
# Edite .env com suas credenciais

# Migrar banco de dados
pnpm db:push

# Popular banco com produtos
node seed-database.mjs

# Iniciar servidor de desenvolvimento
pnpm dev
```

Acesse: http://localhost:3000

---

## 🧪 Testes

```bash
# Executar todos os testes
pnpm test

# Testes em modo watch
pnpm test:watch
```

**Cobertura atual:** 23 testes passando (100% success rate)

---

## 📝 Variáveis de Ambiente

### Obrigatórias

```env
DATABASE_URL=mysql://user:password@host:port/database
JWT_SECRET=seu-secret-key-seguro
NODE_ENV=production
VITE_APP_TITLE=DisparaLinea Trading
```

### Opcionais (Stripe)

```env
STRIPE_SECRET_KEY=sk_test_...
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

---

## 📊 Funcionalidades Implementadas

- [x] Design glassmorphism moderno
- [x] Ticker de câmbio em tempo real
- [x] Sistema multi-idioma (PT/EN)
- [x] Catálogo de 36 produtos com imagens nano banana AI
- [x] Busca e filtros avançados
- [x] Carrinho de compras persistente
- [x] Checkout com Stripe
- [x] Páginas de categoria dedicadas
- [x] Sistema de reviews/avaliações
- [x] Newsletter com validação
- [x] Cookie banner (GDPR)
- [x] Responsivo mobile-first
- [x] Testes automatizados (Vitest)

---

## 🎯 Próximas Melhorias

- [ ] Sistema de autenticação próprio (remover OAuth Manus)
- [ ] Painel administrativo para gerenciar produtos
- [ ] Sistema de pedidos e histórico
- [ ] Integração com transportadoras
- [ ] Analytics e relatórios
- [ ] SEO otimizado com meta tags dinâmicas
- [ ] PWA (Progressive Web App)

---

## 📄 Licença

Este projeto é privado e proprietário.

---

## 👨‍💻 Desenvolvedor

**DisparaLinea Trading LDA**
- Email: disparalinea.lda@gmail.com
- GitHub: [@danilolimaCabral](https://github.com/danilolimaCabral)

---

## 🙏 Agradecimentos

- **Railway** - Plataforma de deploy
- **Stripe** - Processamento de pagamentos
- **Nano Banana AI** - Geração de imagens de produtos
- **shadcn/ui** - Componentes UI
- **Tailwind CSS** - Framework CSS

---

**Desenvolvido com 💙 usando nano banana**

🚂 Powered by Railway
