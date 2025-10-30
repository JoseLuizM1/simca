"use client"

import React, { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Camera } from "lucide-react"
import Image from "next/image"
import {
  Card,
  CardContent
} from "@/components/ui/card"

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
      const response = await fetch('/api/photos')
      if (!response.ok) {
        throw new Error('Erro ao carregar fotos')
      }
      
      const { sections: supabaseSections } = await response.json()
      
      // Substituir seções com fotos do Supabase
      setSections(prevSections => {
        return prevSections.map((section, index) => ({
          ...section,
          photos: supabaseSections[index]?.photos || []
        }))
      })
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
                <Card
                  key={photo.id}
                  className="flex-shrink-0 w-80 hover:shadow-lg transition-shadow cursor-pointer group"
                >
                  <CardContent className="p-0">
                    <div className="relative h-60 overflow-hidden rounded-t-lg">
                      <Image
                        src={photo.src || "/luta"}
                        alt={photo.alt}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-gray-900 text-center">{photo.alt}</h4>
                    </div>
                  </CardContent>
                </Card>
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
