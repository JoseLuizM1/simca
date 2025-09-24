// src/app/api/noticias/route.ts
import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

export async function GET() {
  const connection = await mysql.createConnection(dbConfig);
  const [rows] = await connection.execute("SELECT * FROM noticias ORDER BY id DESC");
  await connection.end();
  return NextResponse.json(rows);
}

export async function POST(request: NextRequest) {
  const { tittle, excerpt, date, category, image } = await request.json();
  if (!tittle || !excerpt || !date || !category || !image) {
    return NextResponse.json({ error: "Todos os campos são obrigatórios." }, { status: 400 });
  }
  const connection = await mysql.createConnection(dbConfig);
  const [result] = await connection.execute(
    "INSERT INTO noticias (tittle, excerpt, date, category, image) VALUES (?, ?, ?, ?, ?)",
    [tittle, excerpt, date, category, image]
  );
  await connection.end();
  return NextResponse.json({ id: (result as any).insertId, tittle, excerpt, date, category, image }, { status: 201 });
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "ID não informado." }, { status: 400 });
  }
  const connection = await mysql.createConnection(dbConfig);
  await connection.execute("DELETE FROM noticias WHERE id = ?", [id]);
  await connection.end();
  return NextResponse.json({ success: true });
}