const pessoas = [
  { img: "/imagens/adriana.jpg", cargo: "Coordenação de Ação Sindical", nome: "Adriana Lemos" },
  { img: "/imagens/tania_silva.jpg", cargo: "Coordenação de Luta Antirracista", nome: "Tânia Silva" },
  { img: "/imagens/amanda.jpg", cargo: "Coordenação de Organização", nome: "Amanda Rodrigues" },
  { img: "/imagens/andreia.jpg", cargo: "Professora - EMEI Maria da Glória", nome: "Andreia Dell Osbell" },
  { img: "/imagens/antonina.jpg", cargo: "Professora Aposentada", nome: "Antonina Rothermel" },
  { img: "/imagens/cassius.jpg", cargo: "Educador Social - AIMA", nome: "Cassius de Olveira Bocha" },
  { img: "/imagens/clarissa.jpg", cargo: "Assistente Social - CRAS Betânia", nome: "Clarissa de Oliveira" },
  { img: "/imagens/clelia.jpg", cargo: "Professora - EMEI Maria da Glória", nome: "Clélia de Oliveira" },
  { img: "/imagens/Daniela.jpg", cargo: "Coordenação de Formação e Cultura", nome: "Daniela de Souza" },
  { img: "/imagens/delmarina.jpg", cargo: "Auxiliar de Enfermagem - ESF Carlos Wilkens", nome: "Delmarina Pereira" },
  { img: "/imagens/giani.jpg", cargo: "Professora - EMEI Chapeuzinho Vermelho", nome: "Giani Geremias" },
  { img: "/imagens/guilherme.jpg", cargo: "Suplente de Coordenação de Organização", nome: "Guilherme Runge" },
  { img: "/imagens/ionice.jpg", cargo: "Coordenação de Aposentados", nome: "Ionice de Souza" },
  { img: "/imagens/janina.jpg", cargo: "Professora - EMEB Castro Alves", nome: "Janina Marques de Oliveira" },
  { img: "/imagens/Juraci.jpg", cargo: "Servente - EMEI Granjinha", nome: "Juraci dos Santos" },
  { img: "/imagens/Lisiane.jpg", cargo: "Coordenação de Mulheres", nome: "Lisiane Britto" },
  { img: "/imagens/lourdete.jpg", cargo: "Servente - EMEB Castro Alves", nome: "Lourdete Teixeira" },
  { img: "/imagens/lucas_gondran.jpg", cargo: "Coordenação de Finanças e Patrimônio", nome: "Lucas Gondran" },
  { img: "/imagens/lucas_mion.jpg", cargo: "Médico - CAPS AD", nome: "Lucas Mion" },
  { img: "/imagens/luciane_cereça.jpg", cargo: "Diretor de Marketing Digital", nome: "Luciane Cereça" },
  { img: "/imagens/luciano.jpg", cargo: "Agente de Combate a Endemias", nome: "Luciano" },
  { img: "/imagens/maria_elisabete.jpg", cargo: "Professora - CMAEEL", nome: "Maria Elisabete" },
  { img: "/imagens/patricia.jpg", cargo: "Professora de Educação Especial - CMAEEL", nome: "Patrícia Rodrigues" },
  { img: "/imagens/rodrigo.jpg", cargo: "Coordenação de Comunicação e Imprensa", nome: "Rodrigo Lampert" },
  { img: "/imagens/tania_coelho.jpg", cargo: "Suplente de Coordenação de Ação Sindical", nome: "Tânia Coelho" },
  { img: "/imagens/tatiane.jpg", cargo: "Téc. Atendimento Farmacêutico - Farmácia", nome: "Tatiane Leal" },
  { img: "/imagens/verinha.jpg", cargo: "Diretor de Desenvolvimento", nome: "Verinha" }
  
];

export default function Page() {
  return (
    <main
      style={{ minHeight: "calc(100vh - 68px - 148px)" }}
      className="relative bg-red-800 py-12"
    >

      <div className="z-10 container mx-auto px-4 mb-12 text-center">
      <h1 className="text-4xl font-bold text-white">Direção e Comissões</h1>
      <p className="text-xl text-white">
        Conheça as pessoas que fazem parte da direção e das comissões.
      </p>
      </div>

      <div
      className="absolute inset-0 bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: "url('/simca2.png')",
        opacity: 0.2,
      }} />
      <div className="relative z-10 container mx-auto px-4 flex flex-col gap-12">
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