export default function HeroSection() {
  return (
    <section className="bg-black">
      <div 
        style={{ 
          minHeight: 'calc(100vh - 68px)'
        }}
        className="relative flex items-center justify-center text-white"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
          backgroundImage: 'url(/hero-image.webp)',
          opacity: 0.5,
          zIndex: 0,
          }}
        />
        <div className="flex flex-col justify-center items-center w-full h-full z-10">
          <h1 className="text-4xl md:text-6xl font-bold text-center w-2/4 leading-snug">
            Juntos pela valorização dos Servidores Públicos de Cachoeirinha
          </h1>

          <span className="bg-red-700 rounded-full px-6 py-2 mt-8">
            Sindicato dos Municipários de Cachoeirinha
          </span>
        </div>
      </div>
    </section>
  );
}