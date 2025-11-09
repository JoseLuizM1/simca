'use client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@/utils/supabase/client";
import { Loader, Plus, Upload, X, Image as ImageIcon } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function NovaNoticia() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    category: "",
    image: "",
    subtitulo: "",
  });
  const [imagemFile, setImagemFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  
  // Estados para upload no mural
  const [isMuralDialogOpen, setIsMuralDialogOpen] = useState(false);
  const [muralFile, setMuralFile] = useState<File | null>(null);
  const [muralAltText, setMuralAltText] = useState("");
  const [muralSection, setMuralSection] = useState<string>("");
  const [muralPreviewUrl, setMuralPreviewUrl] = useState<string | null>(null);
  const [muralUploading, setMuralUploading] = useState(false);

  const supabase = createClient();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImagemFile(e.target.files[0]);
    }
  };

  // Função para lidar com seleção de imagem do mural
  const handleMuralFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setMuralFile(file);
      const url = URL.createObjectURL(file);
      setMuralPreviewUrl(url);
    }
  };

  // Função para adicionar imagem ao mural (ATUALIZADA - upload direto)
  const handleAddToMural = async () => {
    if (muralFile && muralAltText && muralSection) {
      try {
        setMuralUploading(true);
        
        // Upload direto para Supabase Storage
        const timestamp = Date.now();
        const fileExtension = muralFile.name.split('.').pop();
        const filename = `${timestamp}-${Math.random().toString(36).substring(2)}.${fileExtension}`;
        
        // Definir pasta baseada na seção
        const sectionFolders = ['assembleias', 'enquadramento', 'luta', 'reunioes'];
        const folder = sectionFolders[parseInt(muralSection)] || 'outros';
        const filePath = `mural/${folder}/${filename}`;

        // 1. Upload da imagem para o Storage
        const { error: uploadError } = await supabase.storage
          .from('images')
          .upload(filePath, muralFile, {
            contentType: muralFile.type,
            upsert: false
          });

        if (uploadError) {
          console.error('Erro no upload:', uploadError);
          throw new Error('Erro ao fazer upload da imagem');
        }

        // 2. Obter URL pública da imagem
        const { data: { publicUrl } } = supabase.storage
          .from('images')
          .getPublicUrl(filePath);

        // 3. Salvar informações na tabela photos
        const { error: dbError } = await supabase
          .from('photos')
          .insert({
            filename: filename,
            original_name: muralFile.name,
            alt_text: muralAltText,
            section: parseInt(muralSection),
            file_url: publicUrl
          });

        if (dbError) {
          console.error('Erro no banco:', dbError);
          
          // Se houve erro no banco, remover arquivo do storage
          await supabase.storage.from('images').remove([filePath]);
          
          throw new Error('Erro ao salvar informações no banco de dados');
        }

        // 4. Reset do formulário e fechar dialog
        resetMuralForm();
        setIsMuralDialogOpen(false);

        alert('Imagem adicionada ao mural com sucesso!');

      } catch (error) {
        console.error('Erro ao adicionar ao mural:', error);
        
        // Mensagem de erro mais específica
        const errorMessage = error instanceof Error 
          ? error.message 
          : 'Erro desconhecido ao adicionar imagem ao mural';
        
        alert(`Erro: ${errorMessage}`);
      } finally {
        setMuralUploading(false);
      }
    }
  };

  // Reset do formulário do mural
  const resetMuralForm = () => {
    setMuralFile(null);
    setMuralAltText("");
    setMuralSection("");
    setMuralPreviewUrl(null);
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
        subtitulo: form.subtitulo,
        image: url.publicUrl,
      }]);

      if (insertError) {
        setMessage("Erro ao salvar a notícia.");
        setLoading(false);
        throw insertError;
      }

      setForm({ title: "", description: "", date: "", category: "", subtitulo: "", image: "" });
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
    <div className="min-h-screen bg-gray-50 py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Botão para adicionar ao mural - acima do formulário (novo) */}
        <div className="mb-6 text-center">
          <Dialog open={isMuralDialogOpen} onOpenChange={setIsMuralDialogOpen}>
            <DialogTrigger asChild>
              <Button
                type="button"
                variant="outline"
                className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100 w-full sm:w-auto"
                onClick={resetMuralForm}
              >
                <ImageIcon className="w-4 h-4 mr-2" />
                Adicionar Foto ao Mural
              </Button>
            </DialogTrigger>
            <DialogContent className="w-[95vw] max-w-md mx-auto">
              <DialogHeader>
                <DialogTitle>Adicionar Foto ao Mural</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Seção do Mural:</label>
                  <Select value={muralSection} onValueChange={setMuralSection}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma seção" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Assembleias</SelectItem>
                      <SelectItem value="1">Enquadramentos</SelectItem>
                      <SelectItem value="2">SIMCA na luta</SelectItem>
                      <SelectItem value="3">Reuniões</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Imagem:</label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleMuralFileSelect}
                    className="cursor-pointer"
                  />
                </div>

                {muralPreviewUrl && (
                  <div className="relative h-32 sm:h-40 w-full rounded-lg overflow-hidden border">
                    <Image
                      src={muralPreviewUrl}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                <div>
                  <label className="text-sm font-medium mb-2 block">Descrição da imagem:</label>
                  <Input
                    value={muralAltText}
                    onChange={(e) => setMuralAltText(e.target.value)}
                    placeholder="Ex: Assembleia do dia 15/10/2024..."
                  />
                </div>

                <div className="flex flex-col sm:flex-row justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full sm:w-auto"
                    onClick={() => {
                      setIsMuralDialogOpen(false);
                      resetMuralForm();
                    }}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="button"
                    onClick={handleAddToMural}
                    disabled={!muralFile || !muralAltText || !muralSection || muralUploading}
                    className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
                  >
                    {muralUploading ? (
                      <Loader className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Upload className="w-4 h-4 mr-2" />
                    )}
                    Adicionar ao Mural
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Formulário da notícia (existente) */}
        <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8">
          <form className="flex flex-col gap-4 sm:gap-6">
            <h1 className="text-center font-bold text-xl sm:text-2xl text-gray-800">Nova Notícia</h1>
            
            <Input 
              type="text" 
              placeholder="Título da notícia" 
              className="w-full" 
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })} 
            />

            <Input
              type="text"
              placeholder="Subtítulo da notícia"
              className="w-full"
              value={form.subtitulo}
              onChange={(e) => setForm({ ...form, subtitulo: e.target.value })}
            />

            <Input 
              type="text" 
              placeholder="Categoria da notícia" 
              className="w-full" 
              value={form.category}
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
              className="border border-gray-300 p-2 sm:p-3 rounded-md w-full focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />

            <Textarea 
              placeholder="Descrição da notícia" 
              className="w-full h-32 sm:h-40 resize-none" 
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })} 
            />

            <Input 
              id="picture" 
              type="file" 
              accept="image/*" 
              onChange={handleImageChange} 
              className="w-full cursor-pointer"
            />

            <Button 
              type="button" 
              className="w-full bg-red-600 hover:bg-red-700 py-2 sm:py-3 text-sm sm:text-base font-medium" 
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? <Loader className="animate-spin mr-2" /> : null}
              {loading ? 'Salvando...' : 'Salvar Notícia'}
            </Button>

            {message && 
              <div className="text-center p-3 rounded-md bg-green-50 border border-green-200">
                <span className="text-green-700 text-sm font-semibold">
                  {message}
                </span>
              </div>
            }
          </form>
        </div>
      </div>
    </div>
  );
}