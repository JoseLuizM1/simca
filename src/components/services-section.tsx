
export default function ServicesSection() {
  return (
    <>
      <section className="bg-red-800">
        <div className="container mx-auto flex flex-col gap-8 justify-center items-center p-8">
          <h2 className="text-white text-4xl font-bold">
            Nossos serviços
          </h2>

          <span className="text-white text-xl">
            Oferecemos suporte jurídico, plano odontológico, convênios com Clinica de saúde mental,
            cestas básicas com descontos, além de diversas atividades formativas para aprimorar
            os conhecimentos dos Servidores Públicos de Cachoeirinha.
            <br />
            <br />
            Realizamos reuniões semanais de planejamento com a Coordenação Executiva e mensalmente com os Delegados e Delegadas Sindicais de todos os setores para dialogar sobre as demandas dos trabalhadores e compartilhar as informações do sindicato.
          </span>
        </div>
      </section>
      <section className="text-center bg-red-700 w-[auto] h-[auto] p-8">
        <div className="container mx-auto flex flex-col gap-8 justify-center items-start p-8">
          <h2 className="text-white text-5xl font-bold ">
            O SINDICATO É MAIS FORTE QUANDO EU PARTICIPO!
          </h2>
        </div>
      </section>
    </>
  );
}