'use client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@/utils/supabase/client";
import { Loader } from "lucide-react";
import { useState } from "react";

export default function NovaNoticia() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    category: "",
    image: "",
  });
  const [imagemFile, setImagemFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const supabase = createClient();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImagemFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    try {
      setMessage("");
      if (!imagemFile) {
        alert("Por favor, selecione uma imagem.");
        return;
      }

      setLoading(true);
      const imageName = `${Date.now()}_${imagemFile.name}`;
      const { data, error: uploadError } = await supabase.storage.from('images').upload(imageName, imagemFile);

      if (uploadError) {
        setMessage("Erro ao fazer upload da imagem.");
        setLoading(false);
        throw uploadError;
      }

      const { data: url } = supabase.storage.from('images').getPublicUrl(imageName);

      const { error: insertError } = await supabase.from('notices').insert([{
        title: form.title,
        description: form.description,
        date: form.date,
        category: form.category,
        image: url.publicUrl,
      }]);

      if (insertError) {
        setMessage("Erro ao salvar a notícia.");
        setLoading(false);
        throw insertError;
      }

      setForm({ title: "", description: "", date: "", category: "", image: "" });
      setImagemFile(null);
      setLoading(false);
      setMessage("Notícia salva com sucesso!");
    } catch (error) {
      setLoading(false);
      setMessage("Erro ao salvar a notícia.");
      console.error('Error uploading image or inserting data:', error);
    }
  };

  return (
    <div      
      style={{
        height: "calc(100vh - 68px - 152px)",
      }}
      className="flex items-center justify-center"
    >
      <form className="flex flex-col gap-4">
        <h1 className="text-center font-bold text-xl">Nova Notícia</h1>
        <Input 
          type="text" 
          placeholder="Título da notícia" 
          className="w-96" 
          onChange={(e) => setForm({ ...form, title: e.target.value })} 
        />

        <Input 
          type="text" 
          placeholder="Categoria da notícia" 
          className="w-96" 
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          required
        />

        <input
          type="date"
          name="date"
          placeholder="Data da notícia"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          required
          className="border p-2 rounded"
        />

        <Textarea 
          placeholder="Descrição da notícia" 
          className="w-96 h-32" 
          onChange={(e) => setForm({ ...form, description: e.target.value })} 
        />

        <Input 
          id="picture" 
          type="file" 
          accept="image/*" 
          onChange={handleImageChange} 
          className="w-96"
        />

        <Button 
          type="button" 
          className="w-96 bg-red-600 hover:bg-red-700" 
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? <Loader className="animate-spin" /> : 'Salvar Notícia'}
        </Button>

        {message && 
          <span className="text-center text-green-400 text-sm font-semibold">
            {message}
          </span>
        }
      </form>
    </div>
  );
}