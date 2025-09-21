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
  const [imagemFile, setImagemFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImagemFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensagem("");
    let imageUrl = form.image;

    // Se o usuário selecionou uma imagem, faz upload antes de enviar o formulário
    if (imagemFile) {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", imagemFile);

      const resUpload = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await resUpload.json();
      setUploading(false);

      if (data.url) {
        imageUrl = data.url;
      } else {
        setMensagem("Erro ao fazer upload da imagem.");
        return;
      }
    }

    // Envia o formulário de notícia com a URL da imagem
    const res = await fetch("/api/noticias", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, image: imageUrl }),
    });

    if (res.ok) {
      setMensagem("Notícia cadastrada com sucesso!");
      setForm({
        tittle: "",
        excerpt: "",
        date: "",
        category: "",
        image: "",
      });
      setImagemFile(null);
    } else {
      setMensagem("Erro ao cadastrar notícia.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto flex flex-col gap-4 p-4">
      <input
        type="text"
        name="tittle"
        placeholder="Título"
        value={form.tittle}
        onChange={handleChange}
        required
        className="border p-2 rounded"
      />
      <textarea
        name="excerpt"
        placeholder="Resumo"
        value={form.excerpt}
        onChange={handleChange}
        required
        className="border p-2 rounded"
      />
      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
        required
        className="border p-2 rounded"
      />
      <input
        type="text"
        name="category"
        placeholder="Categoria"
        value={form.category}
        onChange={handleChange}
        required
        className="border p-2 rounded"
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="border p-2 rounded"
      />
      {imagemFile && (
        <div className="text-sm text-gray-700">Imagem selecionada: {imagemFile.name}</div>
      )}
      <button
        type="submit"
        className="bg-red-600 text-white py-2 rounded hover:bg-red-700"
        disabled={uploading}
      >
        {uploading ? "Enviando imagem..." : "Cadastrar Notícia"}
      </button>
      {mensagem && <div className="mt-2 text-center">{mensagem}</div>}
    </form>
  );
}