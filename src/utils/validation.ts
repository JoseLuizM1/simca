/**
 * Utilitários de validação para uploads e formulários
 */

// Tipos de imagem permitidos
export const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/avif',
];

// Tamanho máximo de arquivo (5MB)
export const MAX_FILE_SIZE = 5 * 1024 * 1024;

/**
 * Valida um arquivo de imagem
 */
export function validateImageFile(file: File): { valid: boolean; error?: string } {
  if (!file) {
    return { valid: false, error: 'Nenhum arquivo selecionado' };
  }

  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: 'Tipo de arquivo não permitido. Use: JPEG, PNG, WebP ou AVIF',
    };
  }

  if (file.size > MAX_FILE_SIZE) {
    const sizeMB = (MAX_FILE_SIZE / 1024 / 1024).toFixed(0);
    return {
      valid: false,
      error: `Arquivo muito grande. Tamanho máximo: ${sizeMB}MB`,
    };
  }

  return { valid: true };
}

/**
 * Valida campos de texto
 */
export function validateTextField(
  value: string,
  fieldName: string,
  minLength: number = 3
): { valid: boolean; error?: string } {
  if (!value || !value.trim()) {
    return { valid: false, error: `${fieldName} é obrigatório` };
  }

  if (value.trim().length < minLength) {
    return {
      valid: false,
      error: `${fieldName} deve ter pelo menos ${minLength} caracteres`,
    };
  }

  return { valid: true };
}

/**
 * Valida formato de data YYYY-MM-DD
 */
export function validateDate(dateString: string): { valid: boolean; error?: string } {
  if (!dateString) {
    return { valid: false, error: 'Data é obrigatória' };
  }

  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(dateString)) {
    return {
      valid: false,
      error: 'Formato de data inválido. Use: YYYY-MM-DD',
    };
  }

  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return { valid: false, error: 'Data inválida' };
  }

  return { valid: true };
}

/**
 * Sanitiza string removendo caracteres perigosos
 */
export function sanitizeString(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove tags HTML básicas
    .slice(0, 1000); // Limita tamanho
}

/**
 * Gera nome de arquivo seguro
 */
export function generateSafeFileName(originalName: string): string {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 10);
  const extension = originalName.split('.').pop()?.toLowerCase() || 'jpg';
  
  return `${timestamp}-${randomString}.${extension}`;
}

/**
 * Valida e sanitiza formulário de notícia
 */
export interface NoticeFormData {
  title: string;
  description: string;
  date: string;
  category: string;
  subtitulo?: string;
  image?: string;
}

export function validateNoticeForm(
  form: NoticeFormData
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  const titleValidation = validateTextField(form.title, 'Título', 5);
  if (!titleValidation.valid) errors.push(titleValidation.error!);

  const descriptionValidation = validateTextField(form.description, 'Descrição', 10);
  if (!descriptionValidation.valid) errors.push(descriptionValidation.error!);

  const dateValidation = validateDate(form.date);
  if (!dateValidation.valid) errors.push(dateValidation.error!);

  if (!form.category || !form.category.trim()) {
    errors.push('Categoria é obrigatória');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
