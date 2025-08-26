import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, ArrowRight } from "lucide-react"
import Image from "next/image"


const news = [
  {
    id: 1,
    title: "Nova Unidade Básica de Saúde inaugurada no Bairro Centro",
    excerpt:
      "A nova UBS vai atender mais de 5 mil famílias da região central da cidade com serviços de saúde primária.",
    date: "15 de Janeiro, 2024",
    category: "Saúde",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    title: "Programa de Capacitação Profissional abre 200 vagas",
    excerpt: "Cursos gratuitos em diversas áreas para qualificação profissional dos moradores de Cachoeirinha.",
    date: "12 de Janeiro, 2024",
    category: "Educação",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    title: "Obras de revitalização da Praça Central são concluídas",
    excerpt: "Espaço público renovado oferece mais lazer e segurança para as famílias cachoeirinhenses.",
    date: "10 de Janeiro, 2024",
    category: "Infraestrutura",
    image: "/placeholder.svg?height=200&width=300",
  },
]

export default function NoticiasPage() {
  return (
    <section className="py-16 bg-red-700">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Últimas Notícias</h2>
          <p className="text-lg text-black max-w-2xl mx-auto">
            Fique por dentro das principais novidades e acontecimentos da nossa cidade
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {news.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
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
                <p className="text-gray-600 mb-4">{item.excerpt}</p>
                <Button variant="ghost" className="p-0 h-auto text-red-600 hover:text-red-800">
                  Ler mais <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
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
  )
}