"use client";
import { useState } from "react";

const images = [
  "/precatorio/precatorios1.jpeg",
  "/precatorio/precatorios2.jpeg",
  "/precatorio/precatorios3.jpeg",
];

export default function PrecatorioPage() {
  const [openImage, setOpenImage] = useState<string | null>(null);

  return (
    <main
      style={{height: "calc(100vh - 68px)",
        backgroundImage: "url('/simca.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
      className='relative bg-red-800'
    >
      <div className="container mx-auto flex flex-col gap-8 text-white">
        <h1 className="text-2xl font-bold mb-4">PRECATÓRIOS</h1>
        <p className="text-lg mb-4">
          Abaixo serão inseridas as imagens referentes aos precatórios
        </p>
        <div className="flex flex-col md:flex-row gap-6 items-center md:items-stretch justify-center">
          {images.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={`Precatórios ${idx + 1}`}
              className="w-full max-w-md rounded-lg shadow cursor-pointer transition hover:scale-105 md:w-72"
              onClick={() => setOpenImage(src)}
            />
          ))}
        </div>
      </div>
      {/* Modal de imagem */}
      {openImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setOpenImage(null)}
        >
          <img
            src={openImage}
            alt="Imagem ampliada"
            className="max-h-[100vh] max-w-[90vw] rounded-lg shadow-lg"
          />
        </div>
      )}
    </main>
  );
}