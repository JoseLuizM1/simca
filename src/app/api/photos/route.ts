import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    const { data: photos, error } = await supabase
      .from('photos')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Erro ao buscar fotos:', error)
      return NextResponse.json({ error: 'Erro ao buscar fotos' }, { status: 500 })
    }

    // Organizar fotos por seção
    type PhotoItem = { id: any; src: any; alt?: any }
    type Section = { title: string; photos: PhotoItem[] }
    const sections: Section[] = [
      { title: "Assembleias", photos: [] },
      { title: "Enquadramentos", photos: [] },
      { title: "SIMCA na luta", photos: [] },
      { title: "Reuniões", photos: [] }
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