# 🚀 Deploy Rápido no Railway - 3 Passos Simples

Este guia te leva do zero ao site no ar em **menos de 10 minutos**!

---

## 📋 Antes de Começar

Você vai precisar de:
- Conta no Railway (gratuita): https://railway.app
- O código já está no GitHub: https://github.com/danilolimaCabral/disparalinea-ecommerce

---

## ✨ PASSO 1: Criar Projeto no Railway (2 minutos)

1. **Acesse Railway**: https://railway.app
2. **Faça login** (pode usar GitHub)
3. Clique no botão **"New Project"**
4. Selecione **"Deploy from GitHub repo"**
5. **Autorize o Railway** a acessar seus repositórios
6. Selecione **`danilolimaCabral/disparalinea-ecommerce`**
7. Clique em **"Deploy Now"**

✅ O Railway vai começar a fazer o build automaticamente!

---

## 🗄️ PASSO 2: Adicionar Banco de Dados (3 minutos)

### 2.1 Criar MySQL

1. No dashboard do projeto, clique em **"+ New"**
2. Selecione **"Database"** → **"Add MySQL"**
3. Aguarde 30 segundos (o banco será criado automaticamente)

### 2.2 Copiar Connection String

1. Clique no card **"MySQL"** que apareceu
2. Vá para a aba **"Connect"**
3. Procure por **"MySQL Connection URL"**
4. Clique no ícone de **copiar** ao lado da URL
5. **Guarde essa URL** (você vai usar no próximo passo)

Exemplo da URL:
```
mysql://root:abc123xyz@containers-us-west-123.railway.app:3306/railway
```

### 2.3 Configurar Variáveis de Ambiente

1. Volte para o dashboard principal
2. Clique no card da **aplicação** (o primeiro que foi criado, não o MySQL)
3. Vá para a aba **"Variables"**
4. Clique em **"+ New Variable"** e adicione **4 variáveis**:

**Variável 1: DATABASE_URL**
```
Nome: DATABASE_URL
Valor: [cole aqui a MySQL Connection URL que você copiou]
```

**Variável 2: JWT_SECRET**
```
Nome: JWT_SECRET
Valor: DisparaLinea2024SecretKey!@#$%
```

**Variável 3: NODE_ENV**
```
Nome: NODE_ENV
Valor: production
```

**Variável 4: VITE_APP_TITLE**
```
Nome: VITE_APP_TITLE
Valor: DisparaLinea Trading
```

5. Clique em **"Deploy"** (o Railway vai reiniciar automaticamente)

---

## 🚀 PASSO 3: Migrar Banco e Acessar Site (5 minutos)

### 3.1 Obter URL do Site

1. No card da aplicação, vá para **"Settings"**
2. Role até a seção **"Domains"**
3. Clique em **"Generate Domain"**
4. **Copie a URL gerada** (exemplo: `disparalinea-trading-production.up.railway.app`)

### 3.2 Migrar Banco de Dados

Abra o terminal no seu computador e execute:

```bash
# Definir a DATABASE_URL (cole a mesma que você usou no Railway)
export DATABASE_URL="mysql://root:abc123xyz@containers-us-west-123.railway.app:3306/railway"

# Navegar até o projeto (ajuste o caminho se necessário)
cd ~/disparalinea-trading

# Executar migração
pnpm db:push
```

**Você verá algo como:**
```
✓ Pushing schema changes to database
✓ Database schema updated successfully
```

### 3.3 Popular Banco com Produtos (Opcional mas Recomendado)

Se quiser já ter os 36 produtos com imagens:

```bash
# Ainda no terminal, com a DATABASE_URL definida
node seed-products.mjs
```

### 3.4 Acessar o Site

Abra a URL gerada no navegador:
```
https://sua-app.railway.app
```

---

## ✅ Checklist de Validação

Teste estas funcionalidades:

- [ ] Homepage carrega com hero section
- [ ] Ticker de moedas funcionando
- [ ] Produtos aparecem com imagens
- [ ] Filtros funcionam (marca, preço, categoria)
- [ ] Busca funciona
- [ ] Troca de idioma PT/EN funciona
- [ ] Carrinho adiciona/remove produtos
- [ ] Contador do carrinho atualiza

---

## 🎉 Pronto! Seu Site Está no Ar!

**URL do seu site:** `https://sua-app.railway.app`

---

## 🔧 Configurações Opcionais

### Adicionar Domínio Personalizado

1. No Railway, vá para **"Settings"** → **"Domains"**
2. Clique em **"Custom Domain"**
3. Digite seu domínio (ex: `disparalinea.com`)
4. Configure o DNS no seu provedor:
   ```
   Type: CNAME
   Name: @ ou www
   Value: sua-app.railway.app
   ```

### Configurar Stripe (para checkout funcionar)

1. Acesse: https://dashboard.stripe.com/test/apikeys
2. Copie as chaves **Secret Key** e **Publishable Key**
3. No Railway, adicione as variáveis:
   ```
   STRIPE_SECRET_KEY=sk_test_...
   VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
   ```
4. Clique em **"Deploy"**

---

## 🐛 Problemas Comuns

### Site não carrega / Erro 500

**Solução:** Verifique se todas as 4 variáveis de ambiente estão configuradas corretamente.

### Produtos não aparecem

**Solução:** Execute a migração do banco (`pnpm db:push`) e popule com produtos (`node seed-products.mjs`).

### Imagens não carregam

**Solução:** As imagens estão no repositório GitHub. Verifique se o build foi concluído com sucesso nos logs do Railway.

---

## 📞 Precisa de Ajuda?

- **Railway Docs:** https://docs.railway.app
- **Railway Discord:** https://discord.gg/railway
- **Logs do Railway:** Clique em "View Logs" no dashboard

---

**Desenvolvido com 💙 por DisparaLinea Trading**

🚂 Powered by Railway
