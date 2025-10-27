import { NextRequest, NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData()
    const file: File | null = data.get('file') as unknown as File
    const section: string = data.get('section') as string

    if (!file) {
      return NextResponse.json({ error: 'Nenhum arquivo encontrado' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Criar nome único para o arquivo
    const timestamp = Date.now()
    const filename = `${timestamp}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`
    
    // Definir pasta baseada na seção
    const sectionFolders = ['assembleias', 'enquadramento', 'luta', 'reunioes']
    const folder = sectionFolders[parseInt(section)] || 'uploads'
    
    // Caminho para salvar o arquivo
    const uploadDir = path.join(process.cwd(), 'public', folder)
    const filePath = path.join(uploadDir, filename)

    // Salvar arquivo
    await writeFile(filePath, buffer)

    // Retornar URL do arquivo
    const fileUrl = `/${folder}/${filename}`

    return NextResponse.json({ 
      success: true, 
      url: fileUrl,
      message: 'Arquivo enviado com sucesso!' 
    })

  } catch (error) {
    console.error('Erro no upload:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}