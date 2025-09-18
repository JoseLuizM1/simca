'use client';

export default function NossaHistoriaPage() {

  return (
    <main
      style={{ height: "calc(100vh - 68px - 148px)" }}
      className='relative flex items-center bg-red-800'
    >
      
      <div className="container mx-auto gap-4 flex flex-col justify-center h-full  text-white">
        <h1 className="text-4xl font-bold">
          Nossa História
        </h1>
        <p className=" text-lg ">
          O  Sindicato dos Municipários de Cachoeirinha (SIMCA), fundado em 20 de junho de 1989, nasceu da luta coletiva dos servidores e empregados públicos do município por dignidade, respeito e valorização.
        </p>
        <p className=" text-lg ">
          O SIMCA é uma entidade autônoma e sem fins lucrativos, formada para representar legalmente a categoria, mas vai muito além disso: o SIMCA é instrumento de resistência, voz ativa nas ruas, nas mesas de negociação e em todos os espaços onde os direitos dos trabalhadores precisam ser defendidos. Ao longo de sua história, o Sindicato tem se mantido firme na organização, mobilização e reivindicação por melhores condições de trabalho, salários justos e políticas públicas que respeitem quem serve à população de Cachoeirinha.
        </p>
        <div className="absolute inset-0 bg-cover bg-center"
         style={{ backgroundImage: "url('/simca.png')",
          opacity: 0.2,
          zIndex: 0,
          }}>

         </div>
      </div>
    </main>
  );
}
