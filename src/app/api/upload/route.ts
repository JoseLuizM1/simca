import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

// Desabilita o bodyParser padrão do Next.js para lidar com FormData
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  // Recebe o arquivo do FormData
  const formData = await req.formData();
  const file = formData.get("file") as File;
  if (!file) {
    return NextResponse.json({ error: "Nenhum arquivo enviado." }, { status: 400 });
  }

  // Gera um nome único para o arquivo
  const ext = path.extname(file.name);
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}${ext}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads");

  // Garante que a pasta existe
  await fs.mkdir(uploadDir, { recursive: true });

  // Salva o arquivo
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  await fs.writeFile(path.join(uploadDir, fileName), buffer);

  // Retorna a URL pública
  const url = `/uploads/${fileName}`;
  return NextResponse.json({ url });
}