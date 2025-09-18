'use client';
import { useNoticeStore } from "@/providers/store";
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function Page() {
  const { notice } = useNoticeStore();
  
  const formattedDate = notice?.date 
    ? format(new Date(notice.date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
    : '';

  return (
    <section className="min-h-screen py-8 px-4 bg-gray-50">
      <div className="container mx-auto max-w-4xl">
        <article className="space-y-6">
          <h1 className="text-3xl font-bold leading-tight">
            {notice?.tittle}
          </h1>
          
          <div className="flex flex-wrap gap-4 text-gray-600">
            <p className="text-base">
              <strong>Data:</strong> {formattedDate}
            </p>
            <p className="text-base">
              <strong>Categoria:</strong> {notice?.category}
            </p>
          </div>

          {notice?.image && (
            <div className="my-6">
              <img 
                src={notice.image} 
                alt={notice?.tittle || 'Imagem da notícia'} 
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>
          )}

          <div className="prose prose-lg max-w-none">
            <p className="whitespace-pre-wrap leading-relaxed">
              {notice?.excerpt}
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}