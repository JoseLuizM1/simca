import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file: File | null = formData.get('file') as unknown as File
    const section: string = formData.get('section') as string
    const altText: string = formData.get('alt') as string

    if (!file) {
      return NextResponse.json({ error: 'Nenhum arquivo encontrado' }, { status: 400 })
    }

    // Gerar nome único para o arquivo
    const timestamp = Date.now()
    const fileExtension = file.name.split('.').pop()
    const filename = `${timestamp}-${Math.random().toString(36).substring(2)}.${fileExtension}`
    
    // Definir pasta baseada na seção
    const sectionFolders = ['assembleias', 'enquadramento', 'luta', 'reunioes']
    const folder = sectionFolders[parseInt(section)] || 'outros'
    const filePath = `${folder}/${filename}`

    // Converter arquivo para buffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = new Uint8Array(arrayBuffer)

    // Upload para Supabase Storage
    const { error: uploadError } = await supabaseAdmin.storage
      .from('photos')
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: false
      })

    if (uploadError) {
      console.error('Erro no upload:', uploadError)
      return NextResponse.json({ error: 'Erro no upload da imagem' }, { status: 500 })
    }

    // Obter URL pública do arquivo
    const { data: { publicUrl } } = supabaseAdmin.storage
      .from('photos')
      .getPublicUrl(filePath)

    // Salvar informações no banco de dados
    const { data: photoData, error: dbError } = await supabaseAdmin
      .from('photos')
      .insert({
        filename: filename,
        original_name: file.name,
        alt_text: altText,
        section: parseInt(section),
        file_url: publicUrl
      })
      .select()
      .single()

    if (dbError) {
      console.error('Erro no banco:', dbError)
      // Se houve erro no banco, remover arquivo do storage
      await supabaseAdmin.storage.from('photos').remove([filePath])
      return NextResponse.json({ error: 'Erro ao salvar no banco de dados' }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      photo: photoData,
      url: publicUrl,
      message: 'Foto enviada com sucesso!'
    })

  } catch (error) {
    console.error('Erro geral:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}