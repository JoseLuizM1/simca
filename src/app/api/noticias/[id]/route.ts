import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

// GET /api/noticias/[id]
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const connection = await mysql.createConnection(dbConfig);
  const [rows] = await connection.execute("SELECT * FROM noticias WHERE id = ?", [id]);
  await connection.end();
  if (!Array.isArray(rows) || rows.length === 0) {
    return NextResponse.json({ error: "Notícia não encontrada." }, { status: 404 });
  }
  return NextResponse.json(rows[0]);
}

// DELETE /api/noticias/[id]
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const connection = await mysql.createConnection(dbConfig);
  const [result] = await connection.execute("DELETE FROM noticias WHERE id = ?", [id]);
  await connection.end();
  return NextResponse.json({ success: true });
}

// (Opcional) PUT /api/noticias/[id] para atualizar uma notícia
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const { tittle, excerpt, date, category, image } = await request.json();
  const connection = await mysql.createConnection(dbConfig);
  await connection.execute(
    "UPDATE noticias SET tittle = ?, excerpt = ?, date = ?, category = ?, image = ? WHERE id = ?",
    [tittle, excerpt, date, category, image, id]
  );
  await connection.end();
  return NextResponse.json({ success: true });
}