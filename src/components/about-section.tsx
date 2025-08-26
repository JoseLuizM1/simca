import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="bg-red-500 flex">
      <div className="container mx-auto p-4 flex">
        <div className="flex flex-col gap-8 justify-center items-start p-8">
          <h2 className="text-white text-4xl font-bold">
            Sobre nós
          </h2>

          <span className="text-white text-xl w-[80%]">
            Somos uma entidade sindical fundada em 1984, que atua na defesa dos direitos dos servidores públicos de Cachoeirinha através da luta, da democracia e da justiça social em nosso município.
          </span>
        </div>

       <Image src="/bandeiraaas2.jpg" alt="Sobre nós" width={500} height={300} priority className="h-auto w-auto" /> 
      </div>
    </section>
  );
}