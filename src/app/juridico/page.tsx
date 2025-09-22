'use client';
export default function Page() {
  return (
    <main
      style={{
        backgroundImage: "url('/simca.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
      className=" bg-red-800 min-h-[calc(100vh-68px-148px)] flex items-stretch"
    >
      <div className="container mx-auto gap-4 flex flex-col justify-center h-full text-white py-8 px-4 sm:px-6 lg:px-8 max-w-full sm:max-w-2xl md:max-w-3xl">
        <h2 className="text-2xl sm:text-3xl font-bold">
          Jurídico
        </h2>
        <h2 className="text-xl sm:text-2xl mb-2">Assessoria Jurídica Gratuita</h2>

        <p className="mb-2 text-base sm:text-lg md:text-xl">
          Oferecemos Assessoria Jurídica Gratuita para os servidores de Cachoeirinha através do
          Escritório Rogério Viola Coelho Advogados.
          Nossa equipe de advogados especializados está pronta para ajudar.
        </p>

        <div className="mb-2 text-base sm:text-lg md:text-xl">
          <p className="text-base sm:text-lg font-semibold text-white mb-1">Horários de atendimento:</p>
          <ul className="list-disc list-inside text-white">
            <li>Segunda-feira, das <strong>10h30</strong> às <strong>13h00</strong></li>
            <li>Quarta-feira, das <strong>12h00</strong> às <strong>17h00</strong></li>
          </ul>
        </div>

        <p className="mb-2 text-base sm:text-lg md:text-xl">
          Para atendimento online ou presencial no escritório, entre em contato pelo número:
          <br />
          <span className="font-medium">(51) 3023-8320</span> ou pelo Whatsapp
          <span className="font-medium">(51) 98187-4058</span>
        </p>

        <p className="mb-2 text-base sm:text-lg md:text-xl">
          <strong>Endereço:</strong><br />
          Rua Sete de Setembro, 1069, Centro Histórico, Porto Alegre.
        </p>

        <p className="text-base sm:text-lg md:text-xl italic">
          *Caso você precise de atendimento fora desses horários, entre em contato com a nossa recepção pelo Whatsapp
          <span className="font-medium"> 51 99866-0241</span>.
        </p>
      </div>
    </main>
  );
}