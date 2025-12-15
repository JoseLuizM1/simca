# Guia de Implementação de Segurança - SIMCA

## 🎯 Resumo das Melhorias Implementadas

### Antes (Inseguro ❌)
- ✗ Qualquer pessoa podia criar/deletar notícias
- ✗ Uploads sem validação
- ✗ Sem autenticação
- ✗ Operações diretas no banco pelo cliente
- ✗ Sem Row Level Security

### Depois (Seguro ✅)
- ✓ Apenas usuários autenticados podem criar conteúdo
- ✓ Validação de tipo e tamanho de arquivo
- ✓ Middleware de autenticação
- ✓ APIs protegidas com verificação de usuário
- ✓ Row Level Security no Supabase

---

## 📋 Passos para Ativar a Segurança

### **Passo 1: Configurar Variáveis de Ambiente**

Certifique-se que seu `.env.local` tem:

```env
NEXT_PUBLIC_SUPABASE_URL=sua_url_aqui
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anon_aqui
```

### **Passo 2: Criar Primeiro Usuário Admin**

**Opção A: Pelo Painel do Supabase (Recomendado)**
1. Acesse seu projeto no Supabase
2. Vá em **Authentication** > **Users**
3. Clique em **Add User**
4. Insira email e senha

**Opção B: Pela API Temporária**
1. Descomente o código em `/src/app/api/create-admin/route.ts`
2. Execute:
```bash
curl -X POST http://localhost:3000/api/create-admin \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@simca.com","password":"senha_forte_123"}'
```
3. Comente o código novamente após criar o usuário

### **Passo 3: Aplicar Row Level Security no Supabase**

1. Acesse o **SQL Editor** no painel do Supabase
2. Execute os scripts em `SECURITY_SETUP.md` na ordem:
   - Adicionar colunas `created_by` (se necessário)
   - Habilitar RLS nas tabelas
   - Criar políticas de segurança
   - Configurar Storage policies

### **Passo 4: Testar o Sistema**

1. **Teste sem Login:**
   - ✓ Deve conseguir ver notícias em `/noticias`
   - ✓ Deve conseguir ver detalhes em `/noticias/[id]`
   - ✗ Deve ser redirecionado ao tentar acessar `/noticias/novo`

2. **Teste com Login:**
   - Acesse `/login`
   - Entre com suas credenciais
   - ✓ Deve conseguir acessar `/noticias/novo`
   - ✓ Deve conseguir criar notícias
   - ✓ Deve conseguir fazer upload de imagens

3. **Teste de Validações:**
   - Tente fazer upload de arquivo > 5MB (deve falhar)
   - Tente fazer upload de PDF ou outro arquivo não-imagem (deve falhar)
   - Tente criar notícia sem campos obrigatórios (deve falhar)

---

## 🔒 Arquivos Criados/Modificados

### Novos Arquivos:
- ✅ `middleware.ts` - Proteção de rotas
- ✅ `src/app/api/upload/route.ts` - Upload seguro de imagens
- ✅ `src/app/api/notices/route.ts` - CRUD de notícias
- ✅ `src/app/api/mural/route.ts` - Upload de fotos do mural
- ✅ `src/app/api/create-admin/route.ts` - Criar primeiro admin
- ✅ `src/app/login/page.tsx` - Página de login
- ✅ `SECURITY_SETUP.md` - Políticas RLS para Supabase
- ✅ `IMPLEMENTATION_GUIDE.md` - Este arquivo

### Arquivos Modificados:
- ✅ `src/app/noticias/novo/page.tsx` - Agora usa APIs seguras

---

## 🛡️ Recursos de Segurança Implementados

### 1. **Autenticação**
- Middleware verifica sessão do usuário
- Rotas administrativas protegidas
- Redirecionamento automático para login

### 2. **Validação de Arquivos**
```typescript
// Tipos permitidos
JPEG, JPG, PNG, WebP, AVIF

// Tamanho máximo
5MB por arquivo
```

### 3. **Row Level Security (RLS)**
```sql
-- Leitura: Público
-- Escrita: Apenas autenticados
-- Edição/Deleção: Apenas o criador
```

### 4. **APIs Protegidas**
- Verificação de autenticação em todas as APIs de escrita
- Validação de entrada
- Tratamento de erros apropriado
- Rollback automático em caso de falha

---

## 🚀 Próximos Passos Recomendados

### Segurança Adicional:

1. **Rate Limiting**
   - Configure no painel do Supabase
   - Settings > API > Rate Limiting
   - Recomendado: 100 req/min por IP

2. **CAPTCHA**
   - Adicionar Google reCAPTCHA no formulário de login
   - Prevenir ataques de força bruta

3. **Auditoria**
   - Adicionar logs de ações administrativas
   - Registrar quem criou/editou/deletou cada conteúdo

4. **Roles e Permissões**
   - Criar diferentes níveis de acesso (admin, editor, moderador)
   - Implementar verificação de roles nas APIs

5. **Monitoramento**
   - Configurar alertas para uploads suspeitos
   - Monitorar tamanho do Storage
   - Alertas de tentativas de login falhadas

---

## 📝 Endpoints Disponíveis

### Públicos (sem autenticação):
```
GET  /api/notices          - Listar notícias
GET  /noticias             - Página de listagem
GET  /noticias/[id]        - Detalhes da notícia
```

### Protegidos (requer autenticação):
```
POST /api/upload           - Upload de imagem
POST /api/notices          - Criar notícia
POST /api/mural            - Adicionar foto ao mural
GET  /noticias/novo        - Página de criação
```

---

## ⚠️ Avisos Importantes

1. **NÃO** exponha suas chaves de API em código público
2. **NÃO** desabilite RLS sem criar novas políticas
3. **SEMPRE** teste as políticas em ambiente de desenvolvimento primeiro
4. **FAÇA BACKUP** do banco antes de aplicar mudanças
5. **DESABILITE** a rota `/api/create-admin` após criar usuários

---

## 🆘 Solução de Problemas

### "Não consigo fazer login"
- Verifique se o usuário foi criado no Supabase
- Confirme que o email foi verificado
- Verifique as variáveis de ambiente

### "Upload falha mesmo estando autenticado"
- Verifique as políticas do Storage no Supabase
- Confirme que o bucket 'images' existe e é público
- Verifique se o arquivo respeita os limites (tipo e tamanho)

### "RLS está bloqueando minhas operações"
- Certifique-se que `created_by` está sendo preenchido
- Verifique se as políticas foram aplicadas corretamente
- Use o SQL Editor para testar: `SELECT * FROM notices;`

### "Redirecionamento infinito"
- Verifique se o middleware não está protegendo rotas públicas
- Confirme que `/login` não está no array de `protectedPaths`

---

## 📞 Suporte

Para dúvidas sobre implementação:
1. Consulte a documentação do Supabase: https://supabase.com/docs
2. Revise os comentários no código
3. Verifique os logs do navegador e do servidor

---

**Última atualização:** 15 de dezembro de 2025
