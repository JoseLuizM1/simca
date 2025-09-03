'use client';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, ArrowRight } from "lucide-react"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination"
import { useState, useEffect } from "react"
import { useNoticeStore } from "@/providers/store";
import { useRouter } from "next/navigation";

const news = [
  {
    id: 1,
    title: "Nova Unidade Básica de Saúde inaugurada no Bairro Centro",
    excerpt:
      "A nova UBS vai atender mais de 5 mil famílias da região central da cidade com serviços de saúde primária.",
    date: "15 de Janeiro, 2024",
    category: "Saúde",
    image: "https://static.vecteezy.com/ti/vetor-gratis/p1/701690-fundo-banner-poligonal-abstrato-gratis-vetor.jpg",
  },
  {
    id: 2,
    title: "Programa de Capacitação Profissional abre 200 vagas",
    excerpt: "Cursos gratuitos em diversas áreas para qualificação profissional dos moradores de Cachoeirinha.",
    date: "12 de Janeiro, 2024",
    category: "Educação",
    image: "https://static.vecteezy.com/ti/vetor-gratis/p1/701690-fundo-banner-poligonal-abstrato-gratis-vetor.jpg",
  },
  {
    id: 3,
    title: "Obras de revitalização da Praça Central são concluídas",
    excerpt: "Espaço público renovado oferece mais lazer e segurança para as famílias cachoeirinhenses.",
    date: "10 de Janeiro, 2024",
    category: "Infraestrutura",
    image: "https://static.vecteezy.com/ti/vetor-gratis/p1/701690-fundo-banner-poligonal-abstrato-gratis-vetor.jpg",
  },
  {
    id: 4,
    title: "Novo Parque Municipal é inaugurado",
    excerpt: "Espaço de lazer conta com áreas verdes, playground e pista de caminhada.",
    date: "8 de Janeiro, 2024",
    category: "Lazer",
    image: "https://static.vecteezy.com/ti/vetor-gratis/p1/701690-fundo-banner-poligonal-abstrato-gratis-vetor.jpg",
  },
  {
    id: 5,
    title: "Campanha de Vacinação contra a Gripe começa na próxima semana",
    excerpt: "Imunização será realizada em todas as unidades de saúde do município.",
    date: "5 de Janeiro, 2024",
    category: "Saúde",
    image: "https://static.vecteezy.com/ti/vetor-gratis/p1/701690-fundo-banner-poligonal-abstrato-gratis-vetor.jpg",
  },
  {
    id: 6,
    title: "Novo Centro de Referência em Saúde Mental é inaugurado",
    excerpt: "Espaço oferece atendimento psicológico e psiquiátrico para a população.",
    date: "2 de Janeiro, 2024",
    category: "Saúde",
    image: "https://static.vecteezy.com/ti/vetor-gratis/p1/701690-fundo-banner-poligonal-abstrato-gratis-vetor.jpg",
  },
  {
    id: 7,
    title: "Novo Centro de Referência em Saúde Mental é inaugurado",
    excerpt: "Espaço oferece atendimento psicológico e psiquiátrico para a população.",
    date: "2 de Janeiro, 2024",
    category: "Saúde",
    image: "https://static.vecteezy.com/ti/vetor-gratis/p1/701690-fundo-banner-poligonal-abstrato-gratis-vetor.jpg",
  },
  {
    id: 8,
    title: "Novo Centro de Referência em Saúde Mental é inaugurado",
    excerpt: "Espaço oferece atendimento psicológico e psiquiátrico para a população.",
    date: "2 de Janeiro, 2024",
    category: "Saúde",
    image: "https://static.vecteezy.com/ti/vetor-gratis/p1/701690-fundo-banner-poligonal-abstrato-gratis-vetor.jpg",
  },
  {
    id: 9,
    title: "Novo Centro de Referência em Saúde Mental é inaugurado",
    excerpt: "Espaço oferece atendimento psicológico e psiquiátrico para a população.",
    date: "2 de Janeiro, 2024",
    category: "Saúde",
    image: "https://static.vecteezy.com/ti/vetor-gratis/p1/701690-fundo-banner-poligonal-abstrato-gratis-vetor.jpg",
  },
  {
    id: 10,
    title: "Novo Centro de Referência em Saúde Mental é inaugurado",
    excerpt: "Espaço oferece atendimento psicológico e psiquiátrico para a população.",
    date: "2 de Janeiro, 2024",
    category: "Saúde",
    image: "https://static.vecteezy.com/ti/vetor-gratis/p1/701690-fundo-banner-poligonal-abstrato-gratis-vetor.jpg",
  },
  {
    id: 11,
    title: "Novo Centro de Referência em Saúde Mental é inaugurado",
    excerpt: "Espaço oferece atendimento psicológico e psiquiátrico para a população.",
    date: "2 de Janeiro, 2024",
    category: "Saúde",
    image: "https://static.vecteezy.com/ti/vetor-gratis/p1/701690-fundo-banner-poligonal-abstrato-gratis-vetor.jpg",
  },
  {
    id: 12,
    title: "Novo Centro de Referência em Saúde Mental é inaugurado",
    excerpt: "Espaço oferece atendimento psicológico e psiquiátrico para a população.",
    date: "2 de Janeiro, 2024",
    category: "Saúde",
    image: "https://static.vecteezy.com/ti/vetor-gratis/p1/701690-fundo-banner-poligonal-abstrato-gratis-vetor.jpg",
  }
]

export default function NoticiasPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const { setNotice, notice } = useNoticeStore();
  const navigation = useRouter();
  
  // Hook para detectar se é mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 640); // sm breakpoint do Tailwind
    };
    
    // Verificar no carregamento inicial
    checkIsMobile();
    
    // Adicionar listener para mudanças de tamanho da tela
    window.addEventListener('resize', checkIsMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const itemsPerPage = isMobile ? 5 : 8;
  const totalPages = Math.ceil(news.length / itemsPerPage);
  const paginatedNews = news.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Reset para página 1 quando mudar de mobile/desktop
  useEffect(() => {
    setCurrentPage(1);
  }, [isMobile]);

  function handleReadMore(article: any) {
    setNotice(article);
    navigation.push(`/noticias/${article.id}`);
  }

  return (
    <section
      className="relative flex flex-col items-center gap-4 bg-red-900 min-h-screen py-8 px-4"
    >
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {paginatedNews.map((article) => (
          <Card key={article.id} className="flex flex-col h-full">
            <CardHeader className="p-3">
              <div className="relative">
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="h-24 sm:h-28 md:h-32 w-full object-cover rounded-lg" 
                />
                <Badge className="absolute top-2 left-2 bg-red-600 text-xs">
                  {article.category}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="flex-1 p-3">
              <CardTitle className="text-sm sm:text-base md:text-lg mb-2 leading-tight line-clamp-2">
                {article.title}
              </CardTitle>
              <p className="text-muted-foreground text-xs sm:text-sm mb-4 line-clamp-2 md:line-clamp-3 leading-relaxed">
                {article.excerpt}
              </p>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-0 p-3">
              <div className="flex items-center text-xs sm:text-sm text-muted-foreground mr-auto">
                <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                <span className="truncate">{article.date}</span>
              </div>
              <Button
                onClick={() => handleReadMore(article)}
                variant="ghost"
                size="sm"
                className="text-red-700 hover:text-red-500 hover:bg-transparent cursor-pointer text-xs sm:text-sm w-full sm:w-auto"
              >
                Ler mais
                <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Pagination className="mt-6 mb-4">
        <PaginationContent className="flex-wrap gap-1">
          <PaginationItem>
            <PaginationPrevious
              onClick={currentPage === 1 ? undefined : () => handlePageChange(Math.max(currentPage - 1, 1))}
              href="#"
              className={`text-xs sm:text-sm ${currentPage === 1 ? "pointer-events-none opacity-50" : ""}`}
            />
          </PaginationItem>
          {[...Array(totalPages)].map((_, idx) => (
            <PaginationItem key={idx}>
              <PaginationLink
                href="#"
                isActive={currentPage === idx + 1}
                onClick={() => handlePageChange(idx + 1)}
                className="text-xs sm:text-sm h-8 w-8 sm:h-9 sm:w-9"
              >
                {idx + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              onClick={currentPage === totalPages ? undefined : () => handlePageChange(Math.min(currentPage + 1, totalPages))}
              href="#"
              className={`text-xs sm:text-sm ${currentPage === totalPages ? "pointer-events-none opacity-50" : ""}`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </section>
  );
}