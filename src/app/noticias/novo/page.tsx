'use client';
import { useState } from "react";

export default function NovaNoticia() {
  const [form, setForm] = useState({
    tittle: "",
    excerpt: "",
    date: "",
    category: "",
    image: "",
  });
  const [mensagem, setMensagem] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensagem("");
    const res = await fetch("/api/noticias", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setMensagem("Notícia adicionada com sucesso!");
      setForm({ tittle: "", excerpt: "", date: "", category: "", image: "" });
    } else {
      const data = await res.json();
      setMensagem(data.error || "Erro ao adicionar notícia.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-8 flex flex-col gap-4 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-2">Adicionar Notícia</h2>
      <input name="tittle" value={form.tittle} onChange={handleChange} placeholder="Título" required className="border p-2 rounded" />
      <textarea name="excerpt" value={form.excerpt} onChange={handleChange} placeholder="Subtítulo/Resumo" required className="border p-2 rounded" />
      <input name="date" value={form.date} onChange={handleChange} placeholder="Data (ex: 16 de Setembro, 2025)" required className="border p-2 rounded" />
      <input name="category" value={form.category} onChange={handleChange} placeholder="Categoria" required className="border p-2 rounded" />
      <input name="image" value={form.image} onChange={handleChange} placeholder="URL da Imagem" required className="border p-2 rounded" />
      <button type="submit" className="bg-red-700 text-white p-2 rounded">Salvar</button>
      {mensagem && <p className="mt-2">{mensagem}</p>}
    </form>
  );
}