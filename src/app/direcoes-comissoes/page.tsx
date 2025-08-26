export default function Page() {
  return (
    <main
      style={{ minHeight: "calc(100vh - 68px - 148px)" }}
      className="bg-red-900 py-12"
    >
      <div className="container mx-auto px-4 flex flex-col gap-12">
        {/* Sessão 1 */}
        <div className="bg-white rounded-lg shadow p-8 flex flex-col md:flex-row items-center gap-8">
          <img
            src="/diretoria.jpg"
            alt="Diretoria Executiva"
            className="w-40 h-40 object-cover rounded-full shadow"
          />
          <div>
            <h2 className="text-2xl font-bold text-red-900 mb-4">
              Diretoria Executiva
            </h2>
            <ul className="text-lg text-gray-800 space-y-2">
              <li>Presidente</li>
              <li>Vice-Presidente</li>
              <li>Secretário Geral</li>
              <li>Diretor Financeiro</li>
              <li>Diretor de Comunicação</li>
            </ul>
          </div>
        </div>
        {/* Sessão 2 */}
        <div className="bg-white rounded-lg shadow p-8 flex flex-col md:flex-row items-center gap-8">
          <img
            src="/negociacao.jpg"
            alt="Comissão de Negociação"
            className="w-40 h-40 object-cover rounded-full shadow"
          />
          <div>
            <h2 className="text-2xl font-bold text-red-900 mb-4">
              Comissão de Negociação
            </h2>
            <ul className="text-lg text-gray-800 space-y-2">
              <li>Coordenador de Negociação</li>
              <li>Membro da Comissão</li>
              <li>Assessor Jurídico</li>
            </ul>
          </div>
        </div>
        {/* Sessão 3 */}
        <div className="bg-white rounded-lg shadow p-8 flex flex-col md:flex-row items-center gap-8">
          <img
            src="/conselho.jpg"
            alt="Conselho Fiscal"
            className="w-40 h-40 object-cover rounded-full shadow"
          />
          <div>
            <h2 className="text-2xl font-bold text-red-900 mb-4">
              Conselho Fiscal
            </h2>
            <ul className="text-lg text-gray-800 space-y-2">
              <li>Presidente do Conselho Fiscal</li>
              <li>Membro Titular</li>
              <li>Membro Suplente</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}