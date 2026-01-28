# 🚀 DEPLOY RÁPIDO NO RAILWAY - 5 PASSOS

## ⚡ **RESUMO SUPER RÁPIDO**

### **1️⃣ Login e Criar Projeto (2 min)**
- Acesse: https://railway.app/new
- Login with GitHub
- Deploy from GitHub repo → `danilolimaCabral/disparalinea-ecommerce`
- Deploy Now

### **2️⃣ Adicionar MySQL (1 min)**
- Clique "+ New" → Database → Add MySQL
- Aguarde 30s
- Clique no MySQL → Connect → Copie "MySQL Connection URL"

### **3️⃣ Configurar Variáveis (2 min)**
- Clique na aplicação → Variables → Add estas 4:

```
DATABASE_URL = [cole a MySQL URL]
JWT_SECRET = DisparaLinea2024SecretKey!@#$%
NODE_ENV = production
VITE_APP_TITLE = DisparaLinea Trading
```

### **4️⃣ Gerar URL (30s)**
- Settings → Domains → Generate Domain
- Copie a URL gerada

### **5️⃣ Migrar Banco (2 min)**
```bash
export DATABASE_URL="[cole a MySQL URL]"
cd ~/disparalinea-trading
pnpm db:push
```

## ✅ **PRONTO! Acesse a URL e seu site está no ar!**

---

**Problemas?** Veja o guia completo em `RAILWAY_DEPLOY_GUIA_COMPLETO.md`
