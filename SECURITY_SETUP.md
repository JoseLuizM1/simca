# Políticas de Segurança (Row Level Security) - Supabase

Execute estas queries no SQL Editor do Supabase para proteger suas tabelas:

## 1. Tabela `notices` (Notícias)

```sql
-- Habilitar RLS na tabela notices
ALTER TABLE notices ENABLE ROW LEVEL SECURITY;

-- Política: Qualquer pessoa pode LER notícias (público)
CREATE POLICY "Permitir leitura pública de notícias"
ON notices FOR SELECT
USING (true);

-- Política: Apenas usuários autenticados podem INSERIR notícias
CREATE POLICY "Apenas usuários autenticados podem criar notícias"
ON notices FOR INSERT
WITH CHECK (auth.uid() IS NOT NULL);

-- Política: Apenas o criador pode ATUALIZAR suas notícias
CREATE POLICY "Usuário pode atualizar suas próprias notícias"
ON notices FOR UPDATE
USING (auth.uid() = created_by)
WITH CHECK (auth.uid() = created_by);

-- Política: Apenas o criador pode DELETAR suas notícias
CREATE POLICY "Usuário pode deletar suas próprias notícias"
ON notices FOR DELETE
USING (auth.uid() = created_by);
```

**IMPORTANTE:** Adicione a coluna `created_by` se não existir:
```sql
ALTER TABLE notices ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES auth.users(id);
```

---

## 2. Tabela `photos` (Mural)

```sql
-- Habilitar RLS na tabela photos
ALTER TABLE photos ENABLE ROW LEVEL SECURITY;

-- Política: Qualquer pessoa pode LER fotos (público)
CREATE POLICY "Permitir leitura pública de fotos"
ON photos FOR SELECT
USING (true);

-- Política: Apenas usuários autenticados podem INSERIR fotos
CREATE POLICY "Apenas usuários autenticados podem adicionar fotos"
ON photos FOR INSERT
WITH CHECK (auth.uid() IS NOT NULL);

-- Política: Apenas o criador pode ATUALIZAR suas fotos
CREATE POLICY "Usuário pode atualizar suas próprias fotos"
ON photos FOR UPDATE
USING (auth.uid() = created_by)
WITH CHECK (auth.uid() = created_by);

-- Política: Apenas o criador pode DELETAR suas fotos
CREATE POLICY "Usuário pode deletar suas próprias fotos"
ON photos FOR DELETE
USING (auth.uid() = created_by);
```

**IMPORTANTE:** Adicione a coluna `created_by` se não existir:
```sql
ALTER TABLE photos ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES auth.users(id);
```

---

## 3. Storage Bucket `images` (Arquivos)

### Configurar Bucket (no painel Supabase)

1. Vá em **Storage** > **Buckets**
2. Selecione o bucket `images` (ou crie se não existir)
3. Configure:
   - **Public bucket:** ✅ Sim (para leitura pública)
   - **File size limit:** 5242880 (5MB em bytes)
   - **Allowed MIME types:** `image/jpeg,image/jpg,image/png,image/webp,image/avif`

### Políticas RLS do Storage

```sql
-- Habilitar RLS no bucket
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Política: Qualquer pessoa pode VER imagens (público)
CREATE POLICY "Permitir leitura pública de imagens"
ON storage.objects FOR SELECT
USING (bucket_id = 'images');

-- Política: Apenas usuários autenticados podem FAZER UPLOAD
CREATE POLICY "Apenas usuários autenticados podem fazer upload"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'images' 
  AND auth.uid() IS NOT NULL
);

-- Política: Apenas o dono pode DELETAR arquivos
CREATE POLICY "Usuário pode deletar seus próprios arquivos"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'images' 
  AND auth.uid() = owner
);

-- Política: Apenas o dono pode ATUALIZAR arquivos
CREATE POLICY "Usuário pode atualizar seus próprios arquivos"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'images' 
  AND auth.uid() = owner
);
```

---

## 4. Verificar Status das Políticas

```sql
-- Ver todas as políticas da tabela notices
SELECT * FROM pg_policies WHERE tablename = 'notices';

-- Ver todas as políticas da tabela photos
SELECT * FROM pg_policies WHERE tablename = 'photos';

-- Ver políticas do Storage
SELECT * FROM storage.policies;
```

---

## 5. Remover Políticas (se necessário)

```sql
-- Remover políticas antigas da tabela notices
DROP POLICY IF EXISTS "Permitir leitura pública de notícias" ON notices;
DROP POLICY IF EXISTS "Apenas usuários autenticados podem criar notícias" ON notices;
DROP POLICY IF EXISTS "Usuário pode atualizar suas próprias notícias" ON notices;
DROP POLICY IF EXISTS "Usuário pode deletar suas próprias notícias" ON notices;

-- Remover políticas antigas da tabela photos
DROP POLICY IF EXISTS "Permitir leitura pública de fotos" ON photos;
DROP POLICY IF EXISTS "Apenas usuários autenticados podem adicionar fotos" ON photos;
DROP POLICY IF EXISTS "Usuário pode atualizar suas próprias fotos" ON photos;
DROP POLICY IF EXISTS "Usuário pode deletar suas próprias fotos" ON photos;
```

---

## 6. Criar Bucket de Imagens (se não existir)

```sql
-- Criar bucket público para imagens
INSERT INTO storage.buckets (id, name, public)
VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;
```

---

## Segurança Adicional Recomendada

### Limitar Tamanho de Arquivos no Storage

No painel do Supabase:
1. Vá em **Storage** > **images** > **Policies**
2. Configure:
   - **File size limit:** 5MB
   - **Allowed MIME types:** `image/jpeg`, `image/png`, `image/webp`, `image/avif`

### Rate Limiting

Configure no Supabase Dashboard:
- **Settings** > **API** > **Rate Limiting**
- Recomendado: 100 requisições por minuto por IP

---

## Notas Importantes

⚠️ **ANTES de aplicar RLS:**
1. Certifique-se de ter pelo menos um usuário admin criado
2. Teste todas as políticas em ambiente de desenvolvimento
3. Faça backup do banco de dados

✅ **Após aplicar RLS:**
- Teste criar, editar e deletar notícias
- Verifique se usuários não autenticados conseguem apenas ler
- Confirme que usuários não podem editar/deletar conteúdo de outros
