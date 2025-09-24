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
} from "@/components/ui/pagination"
import { useState, useEffect } from "react"
import { useNoticeStore } from "@/providers/store";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function NoticiasPage() {
  const [news, setNews] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const { setNotice } = useNoticeStore();
  const navigation = useRouter();
  const supabase = createClient();

  useEffect(() => {
    async function fetchNews() {
      const { data: notices } = await supabase.from('notices').select('*');

      if (notices) {
        setNews(notices);
      }
    }
    fetchNews();
  }, []);

  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth < 640);
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const itemsPerPage = isMobile ? 5 : 8;
  const totalPages = Math.ceil(news.length / itemsPerPage);
  const paginatedNews = news.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page: number) => setCurrentPage(page);

  useEffect(() => { setCurrentPage(1); }, [isMobile]);

  function handleReadMore(article: any) {
    setNotice(article);
    navigation.push(`/noticias/${article.id}`);
  }

  return (
    <section className="relative flex flex-col items-center gap-4 bg-red-800 min-h-screen py-8 px-4">
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
                {article.description}
              </p>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-0 p-3">
              <div className="flex items-center text-xs sm:text-sm text-muted-foreground mr-auto">
                <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                <span>
                    {article.date
                    ? new Date(article.date + "T00:00:00").toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })
                    : ""}
                </span>
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