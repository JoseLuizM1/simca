const pessoas = [
  { img: "/imagens/adriana.jpg", cargo: "Coordenação de Ação Sindical", nome: "Adriana" },
  { img: "/imagens/tania_silva.jpg", cargo: "Coordenação de Luta Antirracista", nome: "Tania Silva" },
  { img: "/imagens/amanda.jpg", cargo: "Coordenação de Organização", nome: "Amanda" },
  { img: "/imagens/andreia.jpg", cargo: "Professora - EMEI Maria da Glória", nome: "Andreia" },
  { img: "/imagens/antonina.jpg", cargo: "Professora Aposentada", nome: "Antonina" },
  { img: "/imagens/cassius.jpg", cargo: "Educador Social - AIMA", nome: "Cassius" },
  { img: "/imagens/clarissa.jpg", cargo: "Assistente Social - CRAS Betânia", nome: "Clarissa" },
  { img: "/imagens/clelia.jpg", cargo: "Professora - EMEI Maria da Glória", nome: "Clelia" },
  { img: "/imagens/Daniela.jpg", cargo: "Coordenação de Formação e Cultura", nome: "Daniela" },
  { img: "/imagens/delmarina.jpg", cargo: "Auxiliar de Enfermagem - ESF Carlos Wilkens", nome: "Del Marina" },
  { img: "/imagens/giani.jpg", cargo: "Professora - EMEI Chapeuzinho Vermelho", nome: "Giani" },
  { img: "/imagens/guilherme.jpg", cargo: "Suplente de Coordenação de Organização", nome: "Guilherme" },
  { img: "/imagens/ionice.jpg", cargo: "Coordenação de Aposentados", nome: "Ionice" },
  { img: "/imagens/Janina.jpg", cargo: "Professora - EMEB Castro Alves", nome: "Janina" },
  { img: "/imagens/juraci.jpg", cargo: "Servente - EMEI Granjinha", nome: "Juraci" },
  { img: "/imagens/lisiane.jpg", cargo: "Coordenação de Mulheres", nome: "Lisiane" },
  { img: "/imagens/lourdete.jpg", cargo: "Servente - EMEB Castro Alves", nome: "Lourdete" },
  { img: "/imagens/lucas_gondran.jpg", cargo: "Suplente de Coordenação de Finanças e Patrimônio", nome: "Lucas Gondran" },
  { img: "/imagens/lucas_mion.jpg", cargo: "Médico - CAPS AD", nome: "Lucas Mion" },
  { img: "/imagens/luciane_cereça.jpg", cargo: "Diretor de Marketing Digital", nome: "Luciane Cereça" },
  { img: "/imagens/luciano.jpg", cargo: "Agente de Combate a Endemias", nome: "Luciano" },
  { img: "/imagens/maria_elisabete.jpg", cargo: "Professora - CMAEEL", nome: "Maria Elisabete" },
  { img: "/imagens/patricia.jpg", cargo: "Professora de Educação Especial - CMAEEL", nome: "Patrícia" },
  { img: "/imagens/rodrigo.jpg", cargo: "Coordenação de Comunicação e Imprensa", nome: "Rodrigo" },
  { img: "/imagens/tania_coelho.jpg", cargo: "Suplente de Coordenação de Ação Sindical", nome: "Tania Coelho" },
  { img: "/imagens/tatiane.jpg", cargo: "Téc. Atendimento Farmacêutico - Farmácia", nome: "Tatiane" },
  { img: "/imagens/verinha.jpg", cargo: "Diretor de Desenvolvimento", nome: "Verinha" }
  
];

export default function Page() {
  return (
    <main
      style={{ minHeight: "calc(100vh - 68px - 148px)" }}
      className="bg-red-900 py-12"
    >
      <div className="container mx-auto px-4 flex flex-col gap-12">
        {pessoas.map((pessoa, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow p-8 flex flex-col md:flex-row items-center gap-8"
          >
            <img
              src={pessoa.img}
              alt={pessoa.cargo}
              className="w-40 h-40 object-cover rounded-full shadow"
            />
            <div>
              <h2 className="text-2xl font-bold text-red-900 mb-2">{pessoa.cargo}</h2>
              <p className="text-lg text-gray-800">{pessoa.nome}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}