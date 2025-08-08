import Image from "next/image";

export default function Page() {
  return (
    <main
      style={{ minHeight: "calc(100vh - 68px - 148px)" }}
      className="bg-red-600"
    >
      <section className="bg-red-300 uppercase font-bebas">
        <div className="container mx-auto flex">
          <div className="gap-8 justify-center items-start p-3">
            <h3 className="text-red-600 text-5xl">
              Convênio<br />
              Mercadão dos Óculos
            </h3>
            <span className="text-red-600 text-5xl h-auto w-auto">
              Desconto de 30% em toda a loja
            </span>
          </div>
        </div>
      </section>
      <section className="bg-red-500 flex font-bebas">
        <div className="container mx-auto flex">
          <div className="flex flex-col justify-center items-start p-3">
            <span className="text-white text-5xl ">
              Nosso convênio com o Mercadão dos Óculos oferece 30% de desconto em todos os produtos das lojas,
              seja armações para óculos, lentes e assessórios.
            </span>
          </div>
          <Image src="/img_desc_conve.avif" alt="Rede de óticas mercadão dos óculos" width={500} height={300} priority className="h-auto w-auto" />
        </div>
      </section>
      <section className="bg-red-600">
        <div className="container mx-auto flex">
          <div className="flex flex-col gap-8 justify-center items-start p-3">
            <h3 className="text-white text-5xl font-bebas">
            Para aproveitar os benefícios desse convênio, você sócio(a), deve apresentar o último contracheque
            atualizado na hora da compra, comprovando sua associação ao sindicato.
          </h3>
          </div>
        </div>
      </section>
    </main>
  );
}