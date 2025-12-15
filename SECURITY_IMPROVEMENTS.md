# Melhorias de Segurança - Modo Compatível

## 🎯 Objetivo
Adicionar camadas de segurança **sem alterar** a arquitetura atual de operações diretas do cliente com Supabase.

---

## ✅ Melhorias Implementadas

### 1. **Validações no Cliente** (Primeira Linha de Defesa)

Adicionadas validações antes de qualquer operação no Supabase:

#### Validação de Arquivos:
```typescript
✓ Tipos permitidos: JPEG, PNG, WebP, AVIF
✓ Tamanho máximo: 5MB
✓ Verificação de tipo MIME
```

#### Validação de Formulários:
```typescript
✓ Título: mínimo 5 caracteres
✓ Descrição: mínimo 10 caracteres
✓ Data: formato YYYY-MM-DD válido
✓ Categoria: obrigatória
✓ Alt text (mural): mínimo 3 caracteres
```

#### Arquivo: [src/app/noticias/novo/page.tsx](src/app/noticias/novo/page.tsx)
- Validações adicionadas em `handleAddToMural()`
- Validações adicionadas em `handleSubmit()`

---

### 2. **Utilitários de Validação Reutilizáveis**

Criado módulo centralizado de validações:

#### Arquivo: [src/utils/validation.ts](src/utils/validation.ts)

Funções disponíveis:
- `validateImageFile(file)` - Valida tipo e tamanho de imagem
- `validateTextField(value, name, minLength)` - Valida campos de texto
- `validateDate(dateString)` - Valida formato de data
- `sanitizeString(input)` - Remove caracteres perigosos
- `generateSafeFileName(name)` - Gera nomes seguros
- `validateNoticeForm(form)` - Valida formulário completo

---

### 3. **Row Level Security (RLS)** no Supabase

#### Configurar no SQL Editor do Supabase:

##### Tabela `notices`:
```sql
-- Leitura: Pública (qualquer um pode ver)
-- Escrita: Apenas usuários autenticados
-- Edição/Deleção: Apenas o criador
```

##### Tabela `photos`:
```sql
-- Leitura: Pública (qualquer um pode ver)
-- Escrita: Apenas usuários autenticados
-- Edição/Deleção: Apenas o criador
```

##### Storage `images`:
```sql
-- Leitura: Pública (URLs públicas)
-- Upload: Apenas usuários autenticados
-- Deleção: Apenas o dono do arquivo
```

📄 **Instruções completas:** [SECURITY_SETUP.md](SECURITY_SETUP.md)

---

### 4. **Configuração do Storage Bucket**

No painel do Supabase > Storage > images:

```
✓ Public bucket: Sim (para leitura pública de imagens)
✓ File size limit: 5242880 bytes (5MB)
✓ Allowed MIME types: image/jpeg,image/jpg,image/png,image/webp,image/avif
```

---

### 5. **Middleware de Autenticação**

Protege rotas administrativas automaticamente:

#### Arquivo: [middleware.ts](middleware.ts)
- Verifica sessão de usuário no servidor
- Redireciona não autenticados para `/login`
- Rotas protegidas: `/noticias/novo`
- Adiciona parâmetro `redirectedFrom` para retornar após login

---

### 6. **Página de Login**

Interface para autenticação de usuários:

#### Arquivo: [src/app/login/page.tsx](src/app/login/page.tsx)
- Login com email e senha
- Integração com Supabase Auth
- Redirecionamento automático após login
- Previne acesso se já autenticado
- Retorna para página original após login

---

### 7. **Proteção Dupla na Página**

Verificação adicional no lado do cliente:

#### Arquivo: [src/app/noticias/novo/page.tsx](src/app/noticias/novo/page.tsx)
- Verifica autenticação ao carregar a página
- Mostra loading enquanto verifica
- Redireciona para login se não autenticado
- Botão de logout disponível
- Previne renderização se não autorizado

---

## 🔒 Camadas de Segurança

### Camada 1: Cliente (JavaScript)
- ✅ Validação de tipo de arquivo
- ✅ Validação de tamanho
- ✅ Validação de campos obrigatórios
- ✅ Sanitização de entrada
- ✅ Verificação de autenticação no componente

### Camada 2: Middleware (Next.js)
- ✅ Verificação de autenticação server-side
- ✅ Proteção de rotas administrativas
- ✅ Redirecionamento automático
- ✅ Preservação da URL de destino

### Camada 3: Supabase (Servidor)
- ✅ Row Level Security (RLS)
- ✅ Políticas de acesso por tabela
- ✅ Restrições no Storage
- ✅ Validação de MIME types e tamanho

---

## 🧪 Como Testar o Sistema de Login

### 1. Criar Usuário Admin no Supabase

**Via Painel (Recomendado):**
1. Acesse [supabase.com](https://supabase.com)
2. Selecione seu projeto
3. Vá em **Authentication** → **Users**
4. Clique em **Add User** → **Create new user**
5. Preencha:
   - **Email:** admin@simca.com (ou seu email)
   - **Password:** SenhaForte123! (mínimo 6 caracteres)
   - **Auto Confirm User:** ✅ Marcar para ativar imediatamente
6. Clique em **Create user**

### 2. Testar Fluxo de Autenticação

**Teste 1: Acesso sem login**
```
1. Abra http://localhost:3000/noticias/novo
2. ✅ Deve redirecionar para /login?redirectedFrom=/noticias/novo
3. ✅ Você verá a página de login
```

**Teste 2: Login com sucesso**
```
1. Na página /login, insira:
   - Email: admin@simca.com
   - Senha: SenhaForte123!
2. Clique em "Entrar"
3. ✅ Deve redirecionar para /noticias/novo
4. ✅ Você verá o formulário de criação de notícias
5. ✅ Haverá um botão "Sair" no topo
```

**Teste 3: Tentar acessar /login já logado**
```
1. Estando logado, acesse /login
2. ✅ Deve redirecionar automaticamente para /noticias/novo
```

**Teste 4: Logout**
```
1. Em /noticias/novo, clique no botão "Sair"
2. ✅ Deve deslogar e redirecionar para /login
3. ✅ Tentar acessar /noticias/novo novamente deve redirecionar para /login
```

**Teste 5: Criar notícia**
```
1. Faça login
2. Preencha o formulário
3. Selecione uma imagem (< 5MB, tipo JPEG/PNG/WebP/AVIF)
4. Clique em "Publicar Notícia"
5. ✅ Deve salvar com sucesso
```

### 3. Testar Validações de Segurança

**Teste de arquivo grande:**
```
1. Tente fazer upload de imagem > 5MB
2. ✅ Deve mostrar: "Arquivo muito grande. Tamanho máximo: 5MB"
```

**Teste de tipo inválido:**
```
1. Tente fazer upload de PDF/DOC/TXT
2. ✅ Deve mostrar: "Tipo de arquivo não permitido. Use: JPEG, PNG, WebP ou AVIF"
```

**Teste de campos vazios:**
```
1. Tente salvar sem preencher título
2. ✅ Deve mostrar: "Preencha todos os campos obrigatórios"
```

---

## 📋 Checklist de Implementação

### Passo 1: Código já está atualizado ✅
- [x] Validações adicionadas no cliente
- [x] Middleware de autenticação criado
- [x] Página de login criada
- [x] Utilitários de validação criados
- [x] Verificação de autenticação na página `/noticias/novo`
- [x] Botão de logout adicionado
- [x] Redirecionamento automático após login

### Passo 2: Configurar Supabase
- [ ] Criar usuário admin (via painel ou API)
- [ ] Executar scripts SQL do [SECURITY_SETUP.md](SECURITY_SETUP.md)
- [ ] Configurar Storage bucket (limites e MIME types)
- [ ] Verificar políticas RLS aplicadas

### Passo 3: Testar
- [ ] Tentar acessar `/noticias/novo` sem login (deve redirecionar para `/login`)
- [ ] Fazer login e verificar redirecionamento para `/noticias/novo`
- [ ] Criar notícia com sucesso
- [ ] Testar botão "Sair" (deve deslogar e redirecionar para `/login`)
- [ ] Tentar upload de arquivo > 5MB (deve falhar com mensagem)
- [ ] Tentar upload de PDF/DOC (deve falhar com mensagem)
- [ ] Verificar que notícias públicas são visíveis em `/noticias`

---

## 🆚 Comparação: Antes vs Depois

### Antes (Inseguro):
```typescript
// ❌ Sem validações
const { data } = await supabase.storage
  .from('images')
  .upload(fileName, file);
```

### Depois (Seguro):
```typescript
// ✅ Com validações
const allowedTypes = ['image/jpeg', 'image/png', ...];
const maxSize = 5 * 1024 * 1024;

if (!allowedTypes.includes(file.type)) {
  throw new Error('Tipo não permitido');
}

if (file.size > maxSize) {
  throw new Error('Arquivo muito grande');
}

const { data } = await supabase.storage
  .from('images')
  .upload(fileName, file);
```

---

## 🚀 Vantagens desta Abordagem

✅ **Mantém a arquitetura atual** - Não quebra código existente  
✅ **Melhora progressiva** - Segurança em camadas  
✅ **Fácil manutenção** - Validações centralizadas  
✅ **Performance** - Validações no cliente antes de chamadas ao servidor  
✅ **Compatibilidade** - Funciona com RLS do Supabase  

---

## ⚠️ Limitações

Esta abordagem mantém operações diretas do cliente, então:

1. **Validações no cliente podem ser contornadas** por usuários técnicos que manipulem o JavaScript
2. **RLS é essencial** - É a única proteção real no servidor
3. **Sem rate limiting** - Supabase tem limites, mas não customizáveis
4. **Logs limitados** - Difícil rastrear quem fez o quê

### 💡 Se precisar de mais segurança futuramente:
- Use as APIs protegidas já criadas em [`/api/upload`](src/app/api/upload/route.ts), [`/api/notices`](src/app/api/notices/route.ts), [`/api/mural`](src/app/api/mural/route.ts)
- Elas fornecem validação server-side obrigatória
- Documentação em [IMPLEMENTATION_GUIDE.md](IMPLEMENTATION_GUIDE.md)

---

## � Fluxo de Autenticação

```
┌─────────────────────────────────────────────────────────────┐
│  Usuário tenta acessar /noticias/novo                       │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
         ┌───────────────────────┐
         │   Middleware (Next.js) │
         │  Verifica autenticação │
         └───────┬───────────────┘
                 │
        ┌────────┴────────┐
        │                 │
        ▼                 ▼
    ✅ Logado         ❌ Não logado
        │                 │
        │                 ▼
        │      ┌──────────────────────┐
        │      │ Redireciona para     │
        │      │ /login?redirectedFrom│
        │      └──────────┬───────────┘
        │                 │
        │                 ▼
        │         ┌───────────────┐
        │         │ Página de Login│
        │         │ Usuário faz    │
        │         │ login          │
        │         └───────┬────────┘
        │                 │
        │                 ▼
        │         ┌───────────────────┐
        │         │ Verifica em       │
        │         │ useEffect se está │
        │         │ autenticado       │
        │         └───────┬───────────┘
        │                 │
        └─────────────────┘
                 │
                 ▼
    ┌────────────────────────────┐
    │ Renderiza página           │
    │ /noticias/novo             │
    │ - Mostra formulário        │
    │ - Mostra botão "Sair"      │
    └────────────────────────────┘
```

---

## 📞 Próximos Passos

### Checklist Rápido:

1. ✅ **Código já implementado** (validações, middleware, login)
2. ⏳ **Criar usuário admin** no Supabase (veja seção "Como Testar")
3. ⏳ **Aplicar RLS** seguindo [SECURITY_SETUP.md](SECURITY_SETUP.md)
4. ⏳ **Testar fluxo completo** (veja seção "Como Testar o Sistema de Login")
5. ⏳ **Configurar Storage** (limites e MIME types no painel Supabase)

### Comandos Úteis:

```bash
# Iniciar servidor de desenvolvimento
npm run dev

# Acessar páginas:
# - Site público: http://localhost:3000
# - Login: http://localhost:3000/login
# - Admin: http://localhost:3000/noticias/novo
```

---

**Última atualização:** 15 de dezembro de 2025
