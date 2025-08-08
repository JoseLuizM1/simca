export default function Page() {
  return (
    <main
      style={{ minHeight: "calc(100vh - 68px - 148px)" }}
      className='bg-red-900 py-8'
    >

      <div className="container mx-auto gap-4 flex flex-col h-full text-white text-4xl">
        <h2 className="text-4xl font-bold">
          Jurídico
        </h2>
      </div>

      <div className="container mx-auto gap-4 flex flex-col h-full text-white">
        <div className="mb-2">
          <h2 className="text-4xl mb-4">Assessoria Jurídica Gratuita</h2>

          <p className="mb-3 text-2xl">
            Oferecemos Assessoria Jurídica Gratuita para os servidores de Cachoeirinha através do
            Escritório Rogério Viola Coelho Advogados.
            Nossa equipe de advogados especializados está pronta para ajudar.
          </p>

          <div className="mb-3 text-2xl">
            <p className="text-lg font-semibold text-white mb-1">Horários de atendimento:</p>
            <ul className="list-disc list-inside text-white">
              <li>Segunda-feira, das <strong>10h30</strong> às <strong>13h00</strong></li>
              <li>Quarta-feira, das <strong>12h00</strong> às <strong>17h00</strong></li>
            </ul>
          </div>

          <p className="mb-3 text-2xl">
            Para atendimento online ou presencial no escritório, entre em contato pelo número:
            <br />
            <span className="font-medium">(51) 3023-8320</span> ou pelo Whatsapp
            <span className="font-medium">(51) 98187-4058</span>
          </p>

          <p className="mb-3 text-2xl">
            <strong>Endereço:</strong><br />
            Rua Sete de Setembro, 1069, Centro Histórico, Porto Alegre.
          </p>

          <p className="text-2xl italic">
            *Caso você precise de atendimento fora desses horários, entre em contato com a nossa recepção pelo Whatsapp
            <span className="font-medium"> 51 9866-0241</span>.
          </p>
        </div>
      </div>

    </main>
  );
}