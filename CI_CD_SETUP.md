# 🔄 Configuração de CI/CD Automático

Este guia explica como configurar o pipeline de CI/CD para deploy automático no Railway usando GitHub Actions.

---

## 📋 O Que o CI/CD Faz

O pipeline automatizado executa as seguintes tarefas sempre que você faz push para a branch `main` ou `master`:

1. **Testes Automatizados** ✅
   - Verifica tipos TypeScript (`pnpm run check`)
   - Executa todos os testes Vitest (`pnpm test`)
   - Compila o projeto (`pnpm run build`)

2. **Deploy Automático** 🚀
   - Se os testes passarem, faz deploy automático no Railway
   - Apenas em push para `main`/`master` (não em pull requests)

---

## ⚙️ Configuração Passo a Passo

### 1. Obter Token do Railway

1. Acesse [Railway Dashboard](https://railway.app)
2. Clique no seu perfil (canto superior direito)
3. Vá em **Account Settings** → **Tokens**
4. Clique em **Create New Token**
5. Dê um nome (ex: "GitHub Actions")
6. Copie o token gerado (começa com `railway_`)

### 2. Adicionar Secret no GitHub

1. Vá para o repositório no GitHub
2. Clique em **Settings** → **Secrets and variables** → **Actions**
3. Clique em **New repository secret**
4. Nome: `RAILWAY_TOKEN`
5. Value: Cole o token do Railway
6. Clique em **Add secret**

### 3. Verificar Workflow

O arquivo `.github/workflows/deploy.yml` já está configurado. Ele será executado automaticamente quando você fizer push.

---

## 🧪 Testando o CI/CD

### Fazer um Push de Teste

```bash
# Fazer uma pequena alteração
echo "# CI/CD Test" >> README.md

# Commit e push
git add .
git commit -m "test: CI/CD pipeline"
git push origin main
```

### Acompanhar Execução

1. Vá para o repositório no GitHub
2. Clique na aba **Actions**
3. Você verá o workflow "CI/CD Pipeline" em execução
4. Clique nele para ver os logs detalhados

---

## 📊 Status do Pipeline

Adicione um badge de status no README.md:

```markdown
![CI/CD Status](https://github.com/seu-usuario/disparalinea-trading/actions/workflows/deploy.yml/badge.svg)
```

Substitua `seu-usuario` pelo seu nome de usuário do GitHub.

---

## 🔧 Personalização

### Executar Apenas Testes (Sem Deploy)

Se quiser apenas rodar os testes sem fazer deploy, crie um pull request em vez de push direto para `main`:

```bash
git checkout -b feature/nova-funcionalidade
git add .
git commit -m "feat: adicionar nova funcionalidade"
git push origin feature/nova-funcionalidade
```

Depois crie um Pull Request no GitHub. Os testes rodarão automaticamente.

### Adicionar Mais Etapas

Edite `.github/workflows/deploy.yml` para adicionar mais steps:

```yaml
- name: Lint code
  run: pnpm run lint

- name: Check formatting
  run: pnpm run format:check
```

### Deploy para Ambientes Diferentes

Para deploy em staging e production:

```yaml
deploy-staging:
  if: github.ref == 'refs/heads/develop'
  steps:
    - run: railway up --service disparalinea-staging

deploy-production:
  if: github.ref == 'refs/heads/main'
  steps:
    - run: railway up --service disparalinea-production
```

---

## 🐛 Troubleshooting

### Erro: "RAILWAY_TOKEN not found"

**Solução:** Verifique se o secret foi adicionado corretamente no GitHub (Settings → Secrets and variables → Actions).

### Erro: "railway: command not found"

**Solução:** O workflow já instala o Railway CLI automaticamente. Se o erro persistir, verifique se a etapa de instalação está presente:

```yaml
- name: Install Railway CLI
  run: npm install -g @railway/cli
```

### Testes Falhando

**Solução:** Execute os testes localmente para identificar o problema:

```bash
pnpm test
```

Corrija os erros e faça push novamente.

### Deploy Não Acontece

**Solução:** Verifique se:
1. O push foi para a branch `main` ou `master`
2. Os testes passaram (job `test` deve ter sucesso)
3. O token do Railway está correto

---

## 📝 Checklist de Configuração

- [ ] Token do Railway obtido
- [ ] Secret `RAILWAY_TOKEN` adicionado no GitHub
- [ ] Workflow `.github/workflows/deploy.yml` commitado
- [ ] Push de teste realizado
- [ ] Pipeline executado com sucesso
- [ ] Deploy automático funcionando
- [ ] Badge de status adicionado ao README (opcional)

---

## 🎉 Pronto!

Agora toda vez que você fizer push para `main`, o código será:
1. Testado automaticamente
2. Compilado
3. Deployado no Railway

**Desenvolvimento mais rápido e seguro!** 🚀

---

## 📚 Recursos

- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Railway CLI Docs](https://docs.railway.app/develop/cli)
- [Vitest Docs](https://vitest.dev/)
