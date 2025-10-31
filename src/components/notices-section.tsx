import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowRight } from "lucide-react";

type NewsItem = {
  id: string;
  title: string;
  image?: string | null;
  date?: string;
  category?: string;
};

async function fetchNoticias(): Promise<any> {
  // Supabase REST + Storage (public bucket) example — não precisa do supabase-js
  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const BUCKET = process.env.NEXT_PUBLIC_SUPABASE_BUCKET || "images"; // ajuste para seu bucket

  if (!SUPABASE_URL || !SUPABASE_KEY) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_KEY env vars");
  }

  // Busca linhas da tabela `noticias` via PostgREST
  const restUrl = `${SUPABASE_URL}/rest/v1/noticias?select=*&order=created_at.desc`;
  const res = await fetch(restUrl, {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      Prefer: "return=representation",
    },
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error("Erro ao buscar notícias do Supabase");
  const data = await res.json();

  // Se a coluna de imagem armazena apenas o path no bucket, converte para URL pública
  const items = (data || []).map((row: any) => {
    let image = row.image || row.imagem || row.thumbnail || null;
    if (image && !/^https?:\/\//.test(image)) {
      // URL pública do Storage: <PROJECT_URL>/storage/v1/object/public/<bucket>/<path>
      image = `${SUPABASE_URL.replace(/\/$/, "")}/storage/v1/object/public/${BUCKET}/${encodeURIComponent(
        String(image)
      )}`;
    }
    return { ...row, image };
  });

  return items;
}

/*
Notas:
- Se seu bucket for privado e precisar de signed URLs, use a API do Supabase Storage para criar signed URLs
  (requer supabase-js ou chamada específica ao endpoint de Storage com a chave do serviço).
- Alternativamente, no servidor você pode importar '@supabase/supabase-js' e usar createSignedUrl para cada path.
*/

function normalize(items: any[]): NewsItem[] {
  return (items || []).map((it: any, idx: number) => {
    const rawDate = it.date || it.data || it.createdAt || it.created_at || "";
    let date = rawDate;
    try {
      const d = new Date(rawDate);
      if (!isNaN(d.getTime())) date = d.toLocaleDateString();
    } catch {}
    return {
      id: String(it.id ?? it._id ?? it.ID ?? idx),
      title: it.title || it.tittle || it.titulo || "",
      image: it.image || it.imagem || it.thumbnail || null,
      date,
      category: it.category || it.categoria || "Geral",
    };
  });
}

export default async function NoticesSection() {
  let news: NewsItem[] = [];
  try {
    const data = await fetchNoticias();
    const items = Array.isArray(data) ? data : data.noticias || data.data || data.items || [];
    news = normalize(items);
  } catch (err) {
    console.error("Erro notícias:", err);
    news = [];
  }

  return (
    <section className="py-16 bg-red-600">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Últimas Notícias</h2>
          <p className="text-lg text-white max-w-2xl mx-auto">
            Fique por dentro das principais novidades e acontecimentos da nossa cidade
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {news.slice(0, 3).map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                {item.image ? (
                  /^https?:\/\//.test(item.image) ? (
                    <img src={item.image} alt={item.title} className="object-cover w-full h-full rounded" style={{ borderRadius: "0.5rem" }} />
                  ) : (
                    <Image src={item.image} alt={item.title} fill className="object-cover" style={{ borderRadius: "0.5rem" }} />
                  )
                ) : (
                  <div className="bg-gray-200 w-full h-full rounded" />
                )}
                <Badge className="absolute top-4 left-4 bg-red-600">{item.category}</Badge>
              </div>
              <CardHeader>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <Calendar className="w-4 h-4" />
                  {item.date}
                </div>
                <CardTitle className="text-lg leading-tight">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <Link href={`/noticias/${item.id}`}>
                  <Button variant="ghost" className="p-0 h-auto text-red-600 hover:text-red-800">
                    Ler mais <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center">
          <Link href="/noticias">
            <Button size="lg" className="bg-red-600 hover:bg-red-700">Ver todas as notícias</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
