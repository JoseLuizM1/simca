import { Button } from "./ui/button";
export default function NoticesSection() {
  return (
    <section className="bg-red-400">
      <div className="container mx-auto flex flex-col gap-8 justify-center items-center p-8">
        <h2 className="text-white text-4xl font-bold">
          Últimas notícias
        </h2>

        <span className="text-white text-xl">
          Mantenha-se atualizado sobre as ações e lutas do sindicato e seus impactos na vida dos Servidores Públicos de Cachoeirinha.
          <br />
          <br />
          Realizamos reuniões semanais de planejamento com a Coordenação Executiva e mensalmente com os Delegados e Delegadas Sindicais de todos os setores para dialogar sobre as demandas dos trabalhadores e compartilhar as informações do sindicato.
        </span>
      </div>
      <div className="flex flex-row-reverse items-center gap-2 justify-center p-8">
        <Button className="bg-white text-red-800">
          <a href="/noticias">Saiba mais</a>
        </Button>
      </div>
    </section>
  );
}