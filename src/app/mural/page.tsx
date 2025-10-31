"use client";
import React, { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Camera } from "lucide-react"
import { createClient } from '@/utils/supabase/client';

interface Photo {
  id: number;
  src: string;
  alt: string;
}

interface Section {
  title: string;
  description: string;
  photos: Photo[];
}

export default function MuralPage() {
  return <PhotoGallery />;
}

function PhotoGallery() {
  const [activeSection, setActiveSection] = useState(0)
  const scrollRefs = useRef<(HTMLDivElement | null)[]>([])

  const [sections, setSections] = useState<Section[]>([
    {
      title: "Assembleias",
      description: "Momentos especiais da nossa cidade",
      photos: []
    },
    {
      title: "Enquadramentos",
      description: "Desenvolvimento e melhorias da cidade",
      photos: []
    },
    {
      title: "SIMCA na luta",
      description: "Belezas naturais e pontos turísticos",
      photos: []
    },
    {
      title: "Reuniões",
      description: "Reuniões realizadas com a comunidade",
      photos: []
    },
  ])

  // Carregar fotos do Supabase ao inicializar
  useEffect(() => {
    loadPhotosFromSupabase()
  }, [])

  const loadPhotosFromSupabase = async () => {
    try {
      const supabase = createClient();

      const { data, error } = await supabase.from('photos').select('*');

      if (error) {
        console.error('Erro ao buscar fotos:', error)
        return
      }

      if (data) {
        const updatedSections = sections.map((section) => {
          const sectionPhotos = data
            .filter((photo) => photo.alt_text === section.title)
            .map((photo) => ({
              id: photo.id,
              src: photo.file_url,
              alt: photo.description || 'Foto do SIMCA',
            }))
          return { ...section, photos: sectionPhotos }
        })
        setSections(updatedSections)
      }
    } catch (error) {
      console.error('Erro ao carregar fotos:', error)
    }
  }

  const scroll = (direction: "left" | "right", sectionIndex: number) => {
    const container = scrollRefs.current[sectionIndex]
    if (container) {
      const scrollAmount = 320
      const newScrollLeft =
        direction === "left"
          ? container.scrollLeft - scrollAmount
          : container.scrollLeft + scrollAmount

      container.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      })
    }
  }

  return (
    <section className="py-16 bg-red-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Camera className="w-8 h-8 text-red-600" />
            <h2 className="text-3xl md:text-4xl font-bold text-white">Mural do SIMCA</h2>
          </div>
          <p className="text-lg text-white max-w-2xl mx-auto">
            Conheça Cachoeirinha através de imagens que contam nossa história
          </p>
        </div>

        {/* Section Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {sections.map((section, index) => (
            <Button
              key={index}
              variant={activeSection === index ? "default" : "outline"}
              onClick={() => setActiveSection(index)}
              className={`px-6 py-3 ${activeSection === index ? "bg-red-600 hover:bg-red-700" : "hover:bg-blue-50 hover:text-red-600"
                }`}
            >
              {section.title}
            </Button>
          ))}
        </div>

        {/* Active Section */}
        <div className="mb-8">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-white mb-2">{sections[activeSection].title}</h3>
            <p className="text-white">{sections[activeSection].description}</p>
          </div>

          {/* Photo Carousel */}
          <div className="relative">
            {/* Navigation Buttons */}
            <Button
              variant="outline"
              size="icon"
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg"
              onClick={() => scroll("left", activeSection)}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg"
              onClick={() => scroll("right", activeSection)}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>

            {/* Photos Container */}
            <div
              ref={el => { scrollRefs.current[activeSection] = el; }}
              className="flex gap-4 overflow-x-auto scrollbar-hide px-12 py-4"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {sections[activeSection].photos.map((photo) => (
                <div 
                  key={photo.id}
                  style={{ 
                    minWidth: '300px', 
                    minHeight: '300px',
                    flex: '0 0 auto', 
                    borderRadius: '0.5rem', 
                    overflow: 'hidden', 
                    backgroundImage: `url(${photo.src})`, 
                    backgroundSize: 'cover', 
                    backgroundPosition: 'center', 
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Photo Counter */}
        <div className="text-center text-sm text-white">
          {sections[activeSection].photos.length} fotos na galeria "{sections[activeSection].title}"
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}
