import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

export async function GET() {
  try {
    const { data: photos, error } = await supabaseAdmin
      .from('photos')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Erro ao buscar fotos:', error)
      return NextResponse.json({ error: 'Erro ao buscar fotos' }, { status: 500 })
    }

    // Organizar fotos por seção
    const sections = [
      { title: "Assembleias", description: "Momentos das nossas assembleias", photos: [] as Array<{ id: any; src: any; alt: any }> },
      { title: "Enquadramentos", description: "Processos de enquadramento", photos: [] as Array<{ id: any; src: any; alt: any }> },
      { title: "SIMCA na luta", description: "Nossa luta pelos direitos", photos: [] as Array<{ id: any; src: any; alt: any }> },
      { title: "Reuniões", description: "Registros das nossas reuniões", photos: [] as Array<{ id: any; src: any; alt: any }> }
    ]

    photos.forEach(photo => {
      if (photo.section >= 0 && photo.section < sections.length) {
        sections[photo.section].photos.push({
          id: photo.id,
          src: photo.file_url,
          alt: photo.alt_text
        })
      }
    })

    return NextResponse.json({ sections })

  } catch (error) {
    console.error('Erro geral:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}