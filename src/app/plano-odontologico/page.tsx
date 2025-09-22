export default function Page() {
  return (
    <main
      style={{ minHeight: "calc(100vh - 68px - 148px)" }}
    >
      <div className="container mx-auto gap-4 flex flex-col md:flex-row h-full text-black mt-9">
        <div className="w-full h-full gap-8">
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold">Plano Odontológico</h1>
            <div className="flex flex-col gap-2">
              <p className="text-lg gap-2 mt-2">
                Oferecemos Plano Odontológico em parceria com a ODONTOALEGRE para sócios e sócias, na modalidade individual ou familiar, com mensalidade de apenas R$ 39,00 o titular, e R$ 29,00 para cada dependente adicionado. Para aposentados e aposentadas o valor é R$29,00. O Plano tem cobertura em diversos procedimentos e especialidades sem custo adicional ou coparticipação.
              </p>
            </div>
          </div>
        </div>
        <div className="w-full h-full flex items-center justify-center mt-6 md:mt-0">
          <img
            src="odonto.avif"
            alt="planos odontológicos"
            className="max-w-full h-auto md:max-w-xs"
          />
        </div>
      </div>
      <div className="container mx-auto gap-4 flex flex-col w-full h-full mt-9 mb-3">
        <h2 className="text-2xl font-bold">COMO ADERIR?</h2>
        <p className="text-lg gap-2 mt-2">
          Basta vir até o SIMCA, preencher o formulário de adesão ao Plano Odontológico e a autorização do desconto em folha de pagamento. Após o primeiro desconto já poderá marcar a sua consulta e utilizar os procedimentos conforme contrato!
        </p>
      </div>
    </main>
  );
}
