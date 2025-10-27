import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="bg-red-500 flex">
      <div className="container mx-auto p-4 flex flex-col md:flex-row items-center md:items-stretch">
        <div className="flex flex-col gap-8 justify-center items-start p-4 md:p-8 w-full md:w-1/2">
          <h2 className="text-white text-3xl md:text-4xl font-bold">
            Sobre nós
          </h2>
          <span className="text-white text-base md:text-xl w-full md:w-[80%]">
            Somos uma entidade sindical fundada em 1984, que atua na defesa dos direitos dos servidores públicos de Cachoeirinha através da luta, da democracia e da justiça social em nosso município.
          </span>
        </div>
        <div className="w-full md:w-1/2 flex justify-center items-center p-4">
          <Image
            src="/bandeiraaas2.jpg"
            alt="Sobre nós"
            width={500}
            height={300}
            priority
            className="h-auto w-full max-w-[500px] rounded"
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
    </section>
  );
}