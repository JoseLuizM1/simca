'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useNoticeStore } from "@/providers/store";
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

type Notice = {
  id?: string;
  title?: string;
  tittle?: string; // manter caso a API use esse campo
  date?: string;
  category?: string;
  image?: string;
  description?: string;
};

export default function Page() {
  const { id } = useParams();
  const { notice: storeNotice } = useNoticeStore(); // se o store já tiver a notícia, usamos
  const [notice, setNotice] = useState<Notice | null>(
    storeNotice && String(storeNotice.id) === String(id) ? storeNotice : null
  );
  const [loading, setLoading] = useState<boolean>(!notice);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    if (!id) return;

    // se store já tem a notícia correspondente, use-a
    if (storeNotice && String(storeNotice.id) === String(id)) {
      setNotice(storeNotice);
      setLoading(false);
      return;
    }

    // busca a notícia na API (implemente /api/noticias/[id] no servidor)
    setLoading(true);
    setError(null);
    fetch(`/api/noticias/${id}`)
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text().catch(() => res.statusText);
          throw new Error(text || 'Erro ao carregar notícia');
        }
        return res.json();
      })
      .then((data: Notice) => {
        if (!mounted) return;
        setNotice(data);
        setLoading(false);
      })
      .catch(() => {
        if (!mounted) return;
        setError('Não foi possível carregar a notícia.');
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [id, storeNotice]);

  const formattedDate = (() => {
    if (!notice?.date) return '';
    const parsed = new Date(notice.date);
    if (isNaN(parsed.getTime())) return '';
    return format(parsed, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
  })();

  if (loading) {
    return (
      <section className="min-h-screen py-8 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <p>Carregando notícia...</p>
        </div>
      </section>
    );
  }

  if (error || !notice) {
    return (
      <section className="min-h-screen py-8 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <p className="text-red-600">{error ?? 'Notícia não encontrada.'}</p>
        </div>
      </section>
    );
  }

  const title = notice.title ?? notice.tittle ?? 'Sem título';

  return (
    <section className="min-h-screen py-8 px-4 bg-gray-50">
      <div className="container mx-auto max-w-4xl">
        <article className="space-y-6">
          <h1 className="text-3xl font-bold leading-tight">{title}</h1>

          <div className="flex flex-wrap gap-4 text-gray-600">
            <p className="text-base">
              <strong>Data:</strong> {formattedDate}
            </p>
            <p className="text-base">
              <strong>Categoria:</strong> {notice?.category ?? '—'}
            </p>
          </div>

          {notice?.image && (
            <div className="my-6">
              <img
                src={notice.image}
                alt={title || 'Imagem da notícia'}
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>
          )}

          <div className="prose prose-lg max-w-none">
            <p className="whitespace-pre-wrap leading-relaxed">
              {notice?.description ?? 'Sem resumo disponível.'}
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}