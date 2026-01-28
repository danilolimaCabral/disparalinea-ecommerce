# 🚂 GUIA COMPLETO: Deploy DisparaLinea Trading no Railway

Este guia te leva passo a passo para colocar seu e-commerce no ar no Railway em **menos de 15 minutos**.

---

## 📋 **PRÉ-REQUISITOS**

Antes de começar, você precisa ter:
- ✅ Conta no GitHub (com o repositório `danilolimaCabral/disparalinea-ecommerce`)
- ✅ Navegador web (Chrome, Firefox, Edge, Safari)
- ✅ 15 minutos de tempo

**NÃO precisa:**
- ❌ Instalar nada no computador
- ❌ Saber programar
- ❌ Ter cartão de crédito (Railway tem plano gratuito)

---

## 🎯 **PARTE 1: CRIAR CONTA E PROJETO NO RAILWAY**

### **Passo 1.1: Acessar o Railway**

1. Abra seu navegador
2. Acesse: **https://railway.app/new**
3. Você verá a tela inicial do Railway

### **Passo 1.2: Fazer Login com GitHub**

1. Clique no botão **"Login"** (canto superior direito)
2. Clique em **"Login with GitHub"** (botão roxo)
3. **Faça login no GitHub** com seu usuário e senha
4. **Autorize o Railway** quando o GitHub pedir permissão
5. Você será redirecionado de volta para o Railway

### **Passo 1.3: Criar Novo Projeto**

1. Na tela "New Project", você verá várias opções
2. Clique em **"GitHub Repository"**
3. Uma lista de seus repositórios vai aparecer
4. **Procure e clique em:** `danilolimaCabral/disparalinea-ecommerce`
5. Clique no botão **"Deploy Now"**

✅ **O Railway vai começar a fazer o build automaticamente!**

Você verá uma tela com logs aparecendo. Aguarde **2-3 minutos**.

---

## 🗄️ **PARTE 2: ADICIONAR BANCO DE DADOS MYSQL**

### **Passo 2.1: Adicionar MySQL**

1. No dashboard do projeto (você já está nele), procure o botão **"+ New"** no canto superior direito
2. Clique em **"+ New"**
3. Selecione **"Database"**
4. Clique em **"Add MySQL"**

✅ **Um novo card "MySQL" vai aparecer no dashboard!**

Aguarde **30 segundos** até o MySQL estar pronto (o card vai ficar verde).

### **Passo 2.2: Copiar Connection String do MySQL**

1. **Clique no card "MySQL"** que acabou de aparecer
2. Você verá várias abas (Connect, Variables, Settings, etc)
3. Clique na aba **"Connect"**
4. Procure por **"MySQL Connection URL"**
5. Você verá uma URL longa começando com `mysql://root:...`
6. **Clique no ícone de copiar** 📋 ao lado da URL
7. **GUARDE ESSA URL** - você vai usar no próximo passo

A URL será parecida com:
```
mysql://root:abc123xyz456@containers-us-west-123.railway.app:3306/railway
```

---

## ⚙️ **PARTE 3: CONFIGURAR VARIÁVEIS DE AMBIENTE**

### **Passo 3.1: Voltar para a Aplicação**

1. Clique na **seta para voltar** (← no canto superior esquerdo)
2. Você voltará para o dashboard principal
3. Você verá 2 cards: sua aplicação e o MySQL

### **Passo 3.2: Abrir Configurações da Aplicação**

1. **Clique no card da sua aplicação** (o primeiro, NÃO o MySQL)
2. Procure e clique na aba **"Variables"**

### **Passo 3.3: Adicionar as 4 Variáveis Necessárias**

Você vai adicionar 4 variáveis. Para cada uma:
1. Clique no botão **"+ New Variable"**
2. Digite o **Nome** (exatamente como mostrado abaixo)
3. Digite o **Valor** (exatamente como mostrado abaixo)
4. Clique em **"Add"**

---

**VARIÁVEL 1:**
```
Nome: DATABASE_URL
Valor: [COLE AQUI a MySQL Connection URL que você copiou no Passo 2.2]
```

**VARIÁVEL 2:**
```
Nome: JWT_SECRET
Valor: DisparaLinea2024SecretKey!@#$%
```

**VARIÁVEL 3:**
```
Nome: NODE_ENV
Valor: production
```

**VARIÁVEL 4:**
```
Nome: VITE_APP_TITLE
Valor: DisparaLinea Trading
```

---

### **Passo 3.4: Aguardar Redeploy**

Após adicionar todas as 4 variáveis:
- O Railway vai **reiniciar automaticamente** a aplicação
- Você verá logs aparecendo novamente
- Aguarde **2-3 minutos** até o deploy completar
- Quando terminar, você verá "Deployment successful" ✅

---

## 🌐 **PARTE 4: GERAR URL PÚBLICA**

### **Passo 4.1: Criar Domínio**

1. Ainda na página da aplicação, clique na aba **"Settings"**
2. Role para baixo até encontrar a seção **"Domains"**
3. Clique no botão **"Generate Domain"**
4. O Railway vai gerar uma URL automaticamente

A URL será algo como:
```
disparalinea-trading-production.up.railway.app
```

5. **COPIE ESSA URL** - é o endereço do seu site!

---

## 💾 **PARTE 5: MIGRAR O BANCO DE DADOS**

Agora você precisa criar as tabelas no banco de dados. Você tem **2 opções**:

### **OPÇÃO A: Usando o Terminal do Seu Computador** (Recomendado se você tem Node.js instalado)

1. Abra o **Terminal** (Mac/Linux) ou **CMD** (Windows)
2. Execute estes comandos:

```bash
# 1. Definir a DATABASE_URL (cole a mesma que você usou no Railway)
export DATABASE_URL="mysql://root:abc123xyz@containers-us-west-123.railway.app:3306/railway"

# 2. Navegar até o projeto (ajuste o caminho se necessário)
cd ~/disparalinea-trading

# 3. Executar migração
pnpm db:push
```

Você verá:
```
✓ Pushing schema changes to database
✓ Database schema updated successfully
```

### **OPÇÃO B: Usando Railway CLI** (Se você não tem o projeto localmente)

1. Instale o Railway CLI:
```bash
npm install -g @railway/cli
```

2. Faça login:
```bash
railway login
```

3. Conecte ao projeto:
```bash
railway link
```

4. Execute a migração:
```bash
railway run pnpm db:push
```

---

## 🎉 **PARTE 6: ACESSAR SEU SITE!**

1. Abra seu navegador
2. Cole a URL que você copiou no Passo 4.1
3. **SEU SITE ESTÁ NO AR!** 🚀

### **Teste estas funcionalidades:**
- ✅ Homepage carrega
- ✅ Produtos aparecem com imagens
- ✅ Navegação funciona (Smartphones, Tires, Fragrances)
- ✅ Carrinho funciona
- ✅ Busca funciona
- ✅ Troca de idioma PT/EN funciona

---

## 🔧 **CONFIGURAÇÕES OPCIONAIS**

### **Adicionar Domínio Customizado**

1. No Railway, vá em **Settings → Domains**
2. Clique em **"Custom Domain"**
3. Digite seu domínio (ex: `disparalinea.com`)
4. Siga as instruções para configurar DNS

### **Monitorar Logs**

1. No dashboard, clique na aplicação
2. Vá para a aba **"Deployments"**
3. Clique no deployment ativo
4. Você verá os logs em tempo real

### **Ver Métricas**

1. No dashboard, clique na aplicação
2. Vá para a aba **"Metrics"**
3. Você verá CPU, memória, e requisições

---

## ❓ **PROBLEMAS COMUNS E SOLUÇÕES**

### **Problema 1: "Build Failed"**

**Solução:**
1. Vá em **Deployments** → clique no deployment com erro
2. Leia os logs para ver o erro específico
3. Geralmente é falta de variável de ambiente
4. Verifique se adicionou todas as 4 variáveis corretamente

### **Problema 2: "Site não carrega / 502 Bad Gateway"**

**Solução:**
1. Verifique se você executou `pnpm db:push` (Parte 5)
2. Verifique se o DATABASE_URL está correto
3. Aguarde 2-3 minutos - às vezes demora um pouco

### **Problema 3: "Produtos não aparecem"**

**Solução:**
1. Você precisa popular o banco com produtos
2. Execute: `node seed-database.mjs` (localmente ou via Railway CLI)
3. Ou adicione produtos manualmente via interface

### **Problema 4: "MySQL Connection Error"**

**Solução:**
1. Verifique se o MySQL está rodando (card verde no dashboard)
2. Copie novamente a MySQL Connection URL
3. Atualize a variável DATABASE_URL com a nova URL
4. Aguarde o redeploy

---

## 📞 **PRECISA DE AJUDA?**

Se você encontrar algum problema:

1. **Verifique os logs** no Railway (Deployments → clique no deployment → veja os logs)
2. **Confira as variáveis** (Variables → verifique se todas as 4 estão corretas)
3. **Reinicie a aplicação** (Settings → Restart)

---

## 🎯 **CHECKLIST FINAL**

Antes de considerar o deploy completo, verifique:

- [ ] Site abre no navegador (URL do Railway)
- [ ] Homepage carrega com design correto
- [ ] Produtos aparecem com imagens
- [ ] Navegação funciona (todos os links)
- [ ] Carrinho adiciona produtos
- [ ] Busca retorna resultados
- [ ] Troca de idioma PT/EN funciona
- [ ] Footer aparece corretamente
- [ ] About Us tem conteúdo
- [ ] Contact page funciona

---

## 🚀 **PRÓXIMOS PASSOS**

Depois do deploy bem-sucedido:

1. **Adicionar produtos reais** no banco de dados
2. **Configurar domínio customizado** (ex: disparalinea.com)
3. **Configurar Stripe** para pagamentos reais
4. **Adicionar Google Analytics** para métricas
5. **Otimizar SEO** (meta tags, sitemap)

---

## 📊 **CUSTOS DO RAILWAY**

- **Plano Gratuito:** $5 de crédito/mês (suficiente para começar)
- **Plano Hobby:** $5/mês (mais recursos)
- **Plano Pro:** $20/mês (para produção)

Seu site provavelmente vai usar ~$3-5/mês no plano gratuito.

---

**🎉 PARABÉNS! SEU E-COMMERCE ESTÁ NO AR!** 🎉

Compartilhe a URL com seus clientes e comece a vender! 🚀
