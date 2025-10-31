import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowRight } from "lucide-react";
import { getNotices } from "@/app/actions";

type NewsItem = {
  id: string;
  title: string;
  image?: string | null;
  description?: string;
  date?: string;
  category?: string;
  created_at?: string | null;
};

export default async function NoticesSection() {
  const notices = await getNotices(3);

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
          {notices.map((item) => (
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
              <CardHeader className="px-4 pt-4">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <Calendar className="w-4 h-4" />
                  {item.date}
                </div>
                <CardTitle className="text-lg leading-tight">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="px-2 pb-4">
                <Link href={`/noticias/${item.id}`}>
                  <Button variant="ghost" className="h-auto text-red-600 hover:text-red-800">
                    Ler mais <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center">
          <Link href="/noticias">
            <Button 
              size="lg" 
              className="bg-transparent hover:bg-transparent text-white hover:text-white"
              variant="outline"
            >
                Ver todas as notícias
              </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
