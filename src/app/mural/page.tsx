"use client"
import { useState, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Camera } from "lucide-react"
import Image from "next/image"


export default function MuralPage() {
  return <PhotoGallery />;
}

function PhotoGallery() {
  const [activeSection, setActiveSection] = useState(0)
  const scrollRefs = useRef<(HTMLDivElement | null)[]>([])

  // IDs numerados em ordem crescente entre todas as arrays
  const sections = [
    {
      title: "Assembleias",
      description: "Momentos especiais da nossa cidade",
      photos: [
        {
          id: 1,
          src: "/assembleias/imagem1.jpg",
          alt: "Assembleia 1"
        },
        {
          id: 2,
          src: "/assembleias/imagem2.jpg",
          alt: "Assembleia 2"
        },
        {
          id: 3,
          src: "/assembleias/imagem3.jpg",
          alt: "Assembleia 3"
        },
        {
          id: 4,
          src: "/assembleias/imagem.jpg",
          alt: "Assembleia 4"
        },
        {
          id: 5,
          src: "/assembleias/imagem5.jpg",
          alt: "Assembleia 5"
        },
        {
          id: 6,
          src: "/assembleias/imagem6.jpg",
          alt: "Assembleia 6"
        },
        {
          id: 7,
          src: "/assembleias/imagem7.jpg",
          alt: "Assembleia 7"
        },
        {
          id: 8,
          src: "/assembleias/imagem8.jpg",
          alt: "Assembleia 8"
        },
        {
          id: 9,
          src: "/assembleias/imagem9.jpg",
          alt: "Assembleia 9"
        },
        {
          id: 10,
          src: "/assembleias/imagem10.jpg",
          alt: "Assembleia 10"
        },
        {
          id: 11,
          src: "/assembleias/imagem11.jpg",
          alt: "Assembleia 11"
        },
        {
          id: 12,
          src: "/assembleias/imagem12.jpg",
          alt: "Assembleia 12"
        },
        {
          id: 13,
          src: "/assembleias/imagem13.jpg",
          alt: "Assembleia 13"
        },
        {
          id: 14,
          src: "/assembleias/imagem14.jpg",
          alt: "Assembleia 14"
        },
        {
          id: 15,
          src: "/assembleias/imagem15.jpg",
          alt: "Assembleia 15"
        },
        {
          id: 16,
          src: "/assembleias/imagem16.jpg",
          alt: "Assembleia 16"
        },
        {
          id: 17,
          src: "/assembleias/imagem17.jpg",
          alt: "Assembleia 17"
        },
        {
          id: 18,
          src: "/assembleias/imagem18.jpg",
          alt: "Assembleia 18"
        },
        {
          id: 19,
          src: "/assembleias/imagem19.jpg",
          alt: "Assembleia 19"
        },
        {
          id: 20,
          src: "/assembleias/imagem20.jpg",
          alt: "Assembleia 20"
        },
        {
          id: 21,
          src: "/assembleias/imagem21.jpg",
          alt: "Assembleia 21"
        },
        {
          id: 22,
          src: "/assembleias/imagem22.jpg",
          alt: "Assembleia 22"
        },
        {
          id: 23,
          src: "/assembleias/imagem23.jpg",
          alt: "Assembleia 23"
        },
        {
          id: 24,
          src: "/assembleias/imagem24.jpg",
          alt: "Assembleia 24"
        },
        {
          id: 25,
          src: "/assembleias/imagem25.jpg",
          alt: "Assembleia 25"
        },
        {
          id: 26,
          src: "/assembleias/imagem26.jpg",
          alt: "Assembleia 26"
        },
        {
          id: 27,
          src: "/assembleias/imagem27.jpg",
          alt: "Assembleia 27"
        },
        {
          id: 28,
          src: "/assembleias/imagem28.jpg",
          alt: "Assembleia 28"
        },
        {
          id: 29,
          src: "/assembleias/imagem29.jpg",
          alt: "Assembleia 29"
        },
        {
          id: 30,
          src: "/assembleias/imagem30.jpg",
          alt: "Assembleia 30"
        },
        {
          id: 31,
          src: "/assembleias/IMG_2117.jpg",
          alt: "Assembleia 31"
        }
      ],
    },
    {
      title: "Enquadramentos",
      description: "Desenvolvimento e melhorias da cidade",
      photos: [
        {
          id: 32,
          src: "/enquadramento/enquadramento (1).JPG",
          alt: "Enquadramento 1"
        },
        {
          id: 33,
          src: "/enquadramento/enquadramento (1).PNG",
          alt: "Enquadramento 2"
        },
        {
          id: 34,
          src: "/enquadramento/enquadramento_um.jpg",
          alt: "Enquadramento 3"
        },
        {
          id: 35,
          src: "/enquadramento/enquadramento_dois.jpg",
          alt: "Enquadramento 4"
        },
        {
          id: 36,
          src: "/enquadramento/enquadramento (2).JPG",
          alt: "Enquadramento 5"
        },
        {
          id: 37,
          src: "/enquadramento/enquadramento_tres.jpg",
          alt: "Enquadramento 6"
        },
        {
          id: 38,
          src: "/enquadramento/enquadramento (3).JPG",
          alt: "Enquadramento 7"
        },
        {
          id: 39,
          src: "/enquadramento/enquadramento (4).JPG",
          alt: "Enquadramento 8"
        },
        {
          id: 40,
          src: "/enquadramento/enquadramento_quatro.jpg",
          alt: "Enquadramento 9"
        },
        {
          id: 41,
          src: "/enquadramento/enquadramento (5).JPG",
          alt: "Enquadramento 10"
        },
        {
          id: 42,
          src: "/enquadramento/enquadramento_cinco.jpg",
          alt: "Enquadramento 11"
        },
        {
          id: 43,
          src: "/enquadramento/enquadramento_sete.jpg",
          alt: "Enquadramento 12"
        },
        {
          id: 44,
          src: "/enquadramento/enquadramento (6).jpg",
          alt: "Enquadramento 13"
        },
        {
          id: 45,
          src: "/enquadramento/enquadramento_um.jpg",
          alt: "Enquadramento 14"
        },
        {
          id: 46,
          src: "/enquadramento/enquadramento_nove.jpg",
          alt: "Enquadramento 15"
        },
        {
          id: 47,
          src: "/enquadramento/enquadramento (8).jpg",
          alt: "Enquadramento 16"
        }

      ],
    },
    {
      title: "SIMCA na luta",
      description: "Belezas naturais e pontos turísticos",
      photos: [
        {
          id: 49,
          src: "/luta/luta (1).jpg",
          alt: "Luta 1"
        },
        {
          id: 50,
          src: "/luta/luta (2).jpg",
          alt: "Luta 2"
        },
        {
          id: 51,
          src: "/luta/luta (3).jpg",
          alt: "Luta 3"
        },
        {
          id: 52,
          src: "/luta/luta (4).jpg",
          alt: "Luta 4"
        },
        {
          id: 53,
          src: "/luta/luta (5).jpg",
          alt: "Luta 5"
        },
        {
          id: 54,
          src: "/luta/luta (6).jpg",
          alt: "Luta 6"
        },
        {
          id: 55,
          src: "/luta/luta (7).jpg",
          alt: "Luta 7"
        },
        {
          id: 56,
          src: "/luta/luta (8).jpg",
          alt: "Luta 8"
        },
        {
          id: 57,
          src: "/luta/luta (9).jpg",
          alt: "Luta 9"
        },
        {
          id: 58,
          src: "/luta/luta (10).jpg",
          alt: "Luta 10"
        },
        {
          id: 59,
          src: "/luta/luta (11).jpg",
          alt: "Luta 11"
        },
        {
          id: 60,
          src: "/luta/luta (12).jpg",
          alt: "Luta 12"
        },
        {
          id: 61,
          src: "/luta/luta (13).jpg",
          alt: "Luta 13"
        },
        {
          id: 62,
          src: "/luta/luta (14).jpg",
          alt: "Luta 14"
        },
        {
          id: 63,
          src: "/luta/luta (15).jpg",
          alt: "Luta 15"
        },
        {
          id: 64,
          src: "/luta/luta (16).jpg",
          alt: "Luta 16"
        },
        {
          id: 65,
          src: "/luta/luta17 (1).jpg",
          alt: "Luta 17"
        },
        {
          id: 66,
          src: "/luta/luta17 (2).jpg",
          alt: "Luta 18"
        },
        {
          id: 67,
          src: "/luta/luta17 (3).jpg",
          alt: "Luta 19"
        },
        {
          id: 68,
          src: "/luta/luta17 (4).jpg",
          alt: "Luta 20"
        },
        {
          id: 69,
          src: "/luta/luta17 (5).jpg",
          alt: "Luta 21"
        },
        {
          id: 70,
          src: "/luta/luta17 (6).jpg",
          alt: "Luta 22"
        },
        {
          id: 71,
          src: "/luta/luta17 (7).jpg",
          alt: "Luta 23"
        },
        {
          id: 72,
          src: "/luta/luta17 (8).jpg",
          alt: "Luta 24"
        },
        {
          id: 73,
          src: "/luta/luta17 (9).jpg",
          alt: "Luta 25"
        },
        {
          id: 74,
          src: "/luta/luta17 (10).jpg",
          alt: "Luta 26"
        },
        {
          id: 75,
          src: "/luta/luta17 (11).jpg",
          alt: "Luta 27"
        },

        {
          id: 76,
          src: "/luta/luta17 (12).jpg",
          alt: "Luta 28"
        },
        {
          id: 77,
          src: "/luta/luta17 (13).jpg",
          alt: "Luta 29"
        },
        {
          id: 78,
          src: "/luta/luta17 (14).jpg",
          alt: "Luta 30"
        },
        {
          id: 79,
          src: "/luta/luta17 (15).jpg",
          alt: "Luta 31"
        },
        {
          id: 80,
          src: "/luta/luta17 (16).jpg",
          alt: "Luta 32"
        },
        {
          id: 81,
          src: "/luta/luta18 (1).JPG",
          alt: "Luta 33"
        },
        {
          id: 82,
          src: "/luta/luta18 (2).JPG",
          alt: "Luta 34"
        },
        {
          id: 83,
          src: "/luta/luta18 (3).jpg",
          alt: "Luta 35"
        },
        {
          id: 84,
          src: "/luta/luta18 (4).jpg",
          alt: "Luta 36"
        },
        {
          id: 85,
          src: "/luta/luta18 (5).jpg",
          alt: "Luta 37"
        },
        {
          id: 86,
          src: "/luta/luta18 (6).jpg",
          alt: "Luta 38"
        },
        {
          id: 87,
          src: "/luta/luta18 (7).jpg",
          alt: "Luta 39"
        },
        {
          id: 88,
          src: "/luta/luta18 (8).png",
          alt: "Luta 40"
        },
        {
          id: 89,
          src: "/luta/luta18 (9).jpg",
          alt: "Luta 41"
        },
        {
          id: 90,
          src: "/luta/luta18 (10).jpg",
          alt: "Luta 42"
        },
        {
          id: 91,
          src: "/luta/luta18 (11).jpg",
          alt: "Luta 43"
        },
        {
          id: 92,
          src: "/luta/luta18 (12).jpg",
          alt: "Luta 44"
        },
        {
          id: 93,
          src: "/luta/luta18 (13).jpg",
          alt: "Luta 45"
        },
        {
          id: 94,
          src: "/luta/luta18 (14).jpg",
          alt: "Luta 46"
        },
        {
          id: 95,
          src: "/luta/luta19 (1).jpg",
          alt: "Luta 47"
        },
        {
          id: 96,
          src: "/luta/luta19 (2).jpg",
          alt: "Luta 48"
        },
        {
          id: 97,
          src: "/luta/luta19 (3).jpg",
          alt: "Luta 49"
        },
        {
          id: 98,
          src: "/luta/luta19 (4).jpg",
          alt: "Luta 50"
        },
        {
          id: 99,
          src: "/luta/luta19 (5).jpg",
          alt: "Luta 51"
        },
        {
          id: 100,
          src: "/luta/luta19 (6).jpg",
          alt: "Luta 52"
        },
        {
          id: 101,
          src: "/luta/luta19 (7).jpg",
          alt: "Luta 53"

        },
        {
          id: 102,
          src: "/luta/luta19 (8).jpg",
          alt: "Luta 54"
        },
        {
          id: 103,
          src: "/luta/luta19 (9).jpg",
          alt: "Luta 55"
        },
        {
          id: 104,
          src: "/luta/luta19 (10).jpg",
          alt: "Luta 56"
        },
        {
          id: 105,
          src: "/luta/luta19 (11).jpg",
          alt: "Luta 57"
        },
        {
          id: 106,
          src: "/luta/luta19 (12).jpg",
          alt: "Luta 58"
        },
        {
          id: 107,
          src: "/luta/luta19 (13).jpg",
          alt: "Luta 59"
        },
        {
          id: 108,
          src: "/luta/luta19 (14).png",
          alt: "Luta 60"
        },
        {
          id: 109,
          src: "/luta/votacao1.jpg",
          alt: "Luta 61"
        },
        {
          id: 110,
          src: "/luta/votacao2.jpg",
          alt: "Luta 62"
        },
        {
          id: 111,
          src: "/luta/votacao3.jpg",
          alt: "Luta 63"
        },
        {
          id: 112,
          src: "/luta/votacao4.jpg",
          alt: "Luta 64"
        },
        {
          id: 113,
          src: "/luta/votacao5.jpg",
          alt: "Luta 65"
        },
        {
          id: 114,
          src: "/luta/votacao6.jpg",
          alt: "Luta 66"
        },
        {
          id: 115,
          src: "/luta/votacao7.jpg",
          alt: "Luta 67"
        },
        {
          id: 116,
          src: "/luta/votacao8.jpg",
          alt: "Luta 68"
        },
        {
          id: 117,
          src: "/luta/votacao9.jpg",
          alt: "Luta 69"
        },
        {
          id: 118,
          src: "/luta/votacao10.jpg",
          alt: "Luta 70"
        },
        {
          id: 119,
          src: "/luta/votacao11.jpg",
          alt: "Luta 71"
        }
      ],
    },
    {
      title: "Reuniões",
      description: "Reuniões realizadas com a comunidade",
      photos: [
        {
          id: 120,
          src: "/reunioes/imagem (1).jpg",
          alt: "Reunião 1"
        },
        {
          id: 121,
          src: "/reunioes/imagem (2).JPG",
          alt: "Reunião 2"
        },
        {
          id: 122,
          src: "/reunioes/imagem1 (1).JPG",
          alt: "Reunião 3"
        },
        {
          id: 123,
          src: "/reunioes/imagem (3).jpg",
          alt: "Reunião 4"
        },
        {
          id: 124,
          src: "/reunioes/imagem (4).jpg",
          alt: "Reunião 5"
        },
        {
          id: 125,
          src: "/reunioes/imagem (6).jpg",
          alt: "Reunião 6"
        },
        {
          id: 126,
          src: "/reunioes/imagem (7).jpg",
          alt: "Reunião 7"
        },
        {
          id: 127,
          src: "/reunioes/imagem (8).jpg",
          alt: "Reunião 8"
        },
        {
          id: 128,
          src: "/reunioes/imagem (9).jpg",
          alt: "Reunião 9"
        },
        {
          id: 129,
          src: "/reunioes/imagem (10).jpg",
          alt: "Reunião 10"
        },
        {
          id: 130,
          src: "/reunioes/imagem (11).jpg",
          alt: "Reunião 11"
        },
        {
          id: 131,
          src: "/reunioes/imagem (12).jpg",
          alt: "Reunião 12"
        },
        {
          id: 132,
          src: "/reunioes/imagem (13).jpg",
          alt: "Reunião 13"
        }
      ],
    },
  ]

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
                      <h4 className="font-semibold text-gray-900 text-center"></h4>
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