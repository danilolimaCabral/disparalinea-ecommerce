# 🚂 Guia Completo de Deploy no Railway

Este guia detalha todos os passos necessários para fazer o deploy do **DisparaLinea Trading** no Railway.

---

## 📋 Pré-requisitos

Antes de começar, você precisa ter:

1. **Conta no Railway** - Crie em [railway.app](https://railway.app)
2. **Conta no GitHub** - O código precisa estar em um repositório GitHub
3. **Banco de Dados MySQL** - Pode ser criado no próprio Railway
4. **Conta Stripe** - Para processar pagamentos (opcional para testes)

---

## 🗂️ Passo 1: Preparar o Repositório GitHub

### 1.1 Criar Repositório no GitHub

```bash
# Se ainda não criou o repositório
gh repo create disparalinea-trading --private --source=. --remote=origin --push
```

### 1.2 Fazer Push do Código

```bash
git add .
git commit -m "Preparar para deploy no Railway"
git push origin main
```

---

## 🚀 Passo 2: Criar Projeto no Railway

### 2.1 Acessar Railway Dashboard

1. Acesse [railway.app](https://railway.app)
2. Faça login com sua conta
3. Clique em **"New Project"**

### 2.2 Conectar Repositório GitHub

1. Selecione **"Deploy from GitHub repo"**
2. Autorize o Railway a acessar seus repositórios
3. Selecione o repositório **disparalinea-trading**
4. Clique em **"Deploy Now"**

---

## 🗄️ Passo 3: Configurar Banco de Dados MySQL

### 3.1 Adicionar MySQL ao Projeto

1. No dashboard do Railway, clique em **"+ New"**
2. Selecione **"Database"** → **"Add MySQL"**
3. Aguarde a criação do banco de dados

### 3.2 Obter Connection String

1. Clique no serviço **MySQL** criado
2. Vá para a aba **"Connect"**
3. Copie a **MySQL Connection URL**
4. Formato: `mysql://root:password@containers-us-west-123.railway.app:3306/railway`

---

## ⚙️ Passo 4: Configurar Variáveis de Ambiente

### 4.1 Acessar Configurações do Serviço

1. Clique no serviço da aplicação (não o MySQL)
2. Vá para a aba **"Variables"**
3. Clique em **"+ New Variable"**

### 4.2 Adicionar Variáveis Obrigatórias

Adicione as seguintes variáveis uma por uma:

#### **DATABASE_URL** (OBRIGATÓRIO)
```
mysql://root:password@host:port/railway
```
*Cole a connection string copiada do MySQL*

#### **JWT_SECRET** (OBRIGATÓRIO)
```bash
# Gere uma chave segura no terminal:
openssl rand -base64 32
```
*Cole o resultado gerado*

#### **NODE_ENV** (OBRIGATÓRIO)
```
production
```

#### **VITE_APP_TITLE** (OBRIGATÓRIO)
```
DisparaLinea Trading
```

### 4.3 Adicionar Variáveis do Stripe (para checkout funcionar)

#### **STRIPE_SECRET_KEY**
```
sk_test_your_stripe_secret_key
```
*Obtenha em: [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys)*

#### **VITE_STRIPE_PUBLISHABLE_KEY**
```
pk_test_your_stripe_publishable_key
```

#### **STRIPE_WEBHOOK_SECRET**
```
whsec_your_webhook_secret
```
*Será configurado após o deploy (Passo 6)*

### 4.4 Variáveis Opcionais

Se quiser manter autenticação Manus OAuth:

```env
VITE_APP_ID=your_manus_app_id
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://portal.manus.im
OWNER_OPEN_ID=your_owner_open_id
OWNER_NAME=Your Name
```

---

## 🔨 Passo 5: Configurar Build e Deploy

### 5.1 Verificar Configurações de Build

O Railway detectará automaticamente as configurações do `railway.json`:

```json
{
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "pnpm install && pnpm run build"
  },
  "deploy": {
    "startCommand": "node server/index.js"
  }
}
```

### 5.2 Aguardar Build

1. O Railway iniciará o build automaticamente
2. Acompanhe os logs na aba **"Deployments"**
3. Aguarde até ver **"Build successful"** e **"Deployment successful"**

### 5.3 Obter URL da Aplicação

1. Vá para a aba **"Settings"**
2. Role até **"Domains"**
3. Clique em **"Generate Domain"**
4. Copie a URL gerada (ex: `disparalinea-trading-production.up.railway.app`)

---

## 🗃️ Passo 6: Migrar Banco de Dados

### 6.1 Conectar ao Banco via Railway CLI

```bash
# Instalar Railway CLI
npm install -g @railway/cli

# Fazer login
railway login

# Conectar ao projeto
railway link

# Executar migração
railway run pnpm db:push
```

### 6.2 Ou Migrar Localmente

```bash
# Definir DATABASE_URL temporariamente
export DATABASE_URL="mysql://root:password@host:port/railway"

# Executar migração
pnpm db:push
```

---

## 💳 Passo 7: Configurar Webhook do Stripe

### 7.1 Criar Webhook no Stripe

1. Acesse [Stripe Dashboard → Webhooks](https://dashboard.stripe.com/test/webhooks)
2. Clique em **"Add endpoint"**
3. Cole a URL: `https://sua-app.railway.app/api/stripe/webhook`
4. Selecione eventos:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Clique em **"Add endpoint"**

### 7.2 Copiar Webhook Secret

1. Clique no webhook criado
2. Copie o **"Signing secret"** (começa com `whsec_`)
3. Volte ao Railway Dashboard
4. Adicione a variável **STRIPE_WEBHOOK_SECRET** com o valor copiado

### 7.3 Reiniciar Aplicação

1. No Railway, vá para **"Deployments"**
2. Clique em **"Redeploy"**

---

## ✅ Passo 8: Testar a Aplicação

### 8.1 Acessar o Site

Abra a URL da aplicação no navegador:
```
https://sua-app.railway.app
```

### 8.2 Testes Essenciais

- [ ] Homepage carrega corretamente
- [ ] Produtos aparecem com imagens
- [ ] Carrinho funciona (adicionar/remover)
- [ ] Troca de idioma PT/EN funciona
- [ ] Busca de produtos funciona
- [ ] Checkout redireciona para Stripe
- [ ] Pagamento teste funciona (cartão: `4242 4242 4242 4242`)

---

## 🔧 Passo 9: Configurar Domínio Personalizado (Opcional)

### 9.1 Adicionar Domínio no Railway

1. No Railway, vá para **"Settings"** → **"Domains"**
2. Clique em **"Custom Domain"**
3. Digite seu domínio (ex: `disparalinea.com`)

### 9.2 Configurar DNS

Adicione um registro CNAME no seu provedor de DNS:

```
Type: CNAME
Name: @ (ou www)
Value: sua-app.railway.app
```

### 9.3 Aguardar Propagação

- Pode levar de 5 minutos a 48 horas
- O Railway gerará certificado SSL automaticamente

---

## 📊 Monitoramento e Logs

### Ver Logs em Tempo Real

```bash
railway logs
```

### Ver Métricas

1. No Railway Dashboard, vá para **"Metrics"**
2. Monitore CPU, RAM e requisições

---

## 🐛 Troubleshooting

### Build Falha

**Erro:** `pnpm: command not found`

**Solução:** O Railway deve detectar automaticamente. Se não, adicione ao `railway.json`:
```json
{
  "build": {
    "builder": "NIXPACKS"
  }
}
```

### Aplicação Não Inicia

**Erro:** `Error: Cannot find module 'server/index.js'`

**Solução:** Verifique se o build gerou os arquivos em `dist/`:
```bash
railway run ls -la dist/
```

### Banco de Dados Não Conecta

**Erro:** `ECONNREFUSED` ou `Access denied`

**Solução:**
1. Verifique se `DATABASE_URL` está correta
2. Verifique se o MySQL está rodando no Railway
3. Teste conexão localmente:
```bash
mysql -h host -P port -u root -p
```

### Webhook do Stripe Falha

**Erro:** `No signatures found matching the expected signature`

**Solução:**
1. Verifique se `STRIPE_WEBHOOK_SECRET` está correto
2. Verifique se a URL do webhook está correta
3. Teste com Stripe CLI:
```bash
stripe listen --forward-to https://sua-app.railway.app/api/stripe/webhook
```

---

## 📝 Checklist Final

Antes de considerar o deploy concluído:

- [ ] Aplicação acessível via URL do Railway
- [ ] Banco de dados conectado e migrado
- [ ] Todas as variáveis de ambiente configuradas
- [ ] Stripe webhook configurado e testado
- [ ] Pagamento teste funcionando
- [ ] Imagens carregando corretamente
- [ ] Multi-idioma funcionando
- [ ] Carrinho e checkout funcionando
- [ ] Logs sem erros críticos
- [ ] (Opcional) Domínio personalizado configurado

---

## 🎉 Deploy Concluído!

Seu e-commerce **DisparaLinea Trading** está no ar! 🚀

### Próximos Passos

1. **Modo Produção Stripe:** Troque as chaves de teste (`sk_test_`, `pk_test_`) pelas chaves de produção (`sk_live_`, `pk_live_`)
2. **Analytics:** Configure Google Analytics ou similar
3. **SEO:** Adicione meta tags e sitemap
4. **Backup:** Configure backup automático do banco de dados
5. **Monitoramento:** Configure alertas para erros críticos

---

## 📞 Suporte

- **Railway Docs:** [docs.railway.app](https://docs.railway.app)
- **Stripe Docs:** [stripe.com/docs](https://stripe.com/docs)
- **GitHub Issues:** Reporte problemas no repositório

---

**Desenvolvido com 💙 usando Railway**
