'use client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const supabase = createClient();
  const [form, setForm] = useState({
    usuario: '',
    senha: ''
  });
  const router = useRouter();

  async function handleLogin() {
    console.log(form);
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email: form.usuario,
      password: form.senha,
    });

    if (error) {
      alert('Erro ao fazer login: Credenciais inválidas.');
      return;
    }

    router.push('/noticias/novo');
  }


  return (
    <div      
      style={{
        height: "calc(100vh - 68px - 152px)",
      }}
      className="flex items-center justify-center"
    >
      <form className="flex flex-col gap-4">
        <h1 className="text-center font-bold text-xl">Acesso Administrador</h1>
        <Input type="text" placeholder="Usuário" className="w-64" onChange={(e) => setForm({ ...form, usuario: e.target.value })} />
        <Input type="password" placeholder="Senha" className="w-64" onChange={(e) => setForm({ ...form, senha: e.target.value })} />
        <Button type="button" className="w-64 bg-red-600 hover:bg-red-700" onClick={handleLogin}>
          Entrar
        </Button>
      </form>
    </div>
  );
}