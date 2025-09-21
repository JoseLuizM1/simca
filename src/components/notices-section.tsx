'use client';
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function NoticesSection() {
  const [news, setNews] = useState<any[]>([]);

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch("/api/noticias");
        if (!res.ok) throw new Error("Erro ao buscar notícias");
        const data = await res.json();
        setNews(data);
      } catch (error) {
        console.error(error);
        setNews([]);
      }
    }
    fetchNews();
  }, []);

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
                  <Image
                    src={item.image}
                    alt={item.tittle}
                    fill
                    className="object-cover"
                    style={{ borderRadius: "0.5rem" }}
                  />
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
          <Button size="lg" className="bg-red-600 hover:bg-red-700">
            <a href="/noticias">Ver todas as notícias</a>
          </Button>
        </div>
      </div>
    </section>
  );
}