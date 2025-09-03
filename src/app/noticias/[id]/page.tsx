'use client';
import { useNoticeStore } from "@/providers/store";

export default function Page() {
  const { notice } = useNoticeStore();
  
  return (
    <section
      className="min-h-screen py-8 px-4"
    >
      <div className="container mx-auto">
        <h1>Title: {notice?.title}</h1>
        <p>Data: {notice?.date}</p>
        <span>Categoria: {notice?.category}</span>
        <img src={notice?.image} alt={notice?.title} className="w-64 h-20" />
        <p>Conteúdo: {notice?.excerpt}</p>
      </div>
    </section>
  );
}