import { Button } from "./ui/button";
export default function JoinSection() {
    return (
        <>
            <section className="bg-red-800">
                <div className="container mx-auto flex flex-col gap-8 justify-center items-center p-8">
                    <h2 className="text-white text-4xl font-bold">
                        Filie-se ao SIMCA
                    </h2>

                    <span className="text-white text-xl">
                        Ao se filiar, você fortalece a luta por melhores condições de trabalho e direitos para todos os Servidores Públicos de Cachoeirinha.
                        <br />
                        <br />
                        O Sindicato é mais forte quando eu participo!
                    </span>
                </div>
            </section>
            <section className="px-4 sm:px-6 lg:px-8 py-8">
                <div className="w-full max-w-md sm:max-w-lg md:max-w-xl mx-auto">
                    <div className="relative z-0 flex flex-col bg-white border-0 shadow-soft-xl rounded-2xl bg-clip-border">
                        <div className="p-6 text-center border-b rounded-t-2xl">
                            <h5 className="text-lg font-semibold">ENTRE EM CONTATO</h5>
                        </div>
                        <div className="flex-auto p-6">
                            <form role="form text-left">
                                <div className="mb-4">
                                    <input
                                        placeholder="Nome"
                                        className="text-sm leading-5.6 ease-soft block w-full rounded-lg border border-gray-300 py-2 px-3 text-gray-700 transition-all focus:border-fuchsia-300 focus:outline-none focus:shadow"
                                        type="text"
                                    />
                                </div>
                                <div className="mb-4">
                                    <input
                                        placeholder="Email"
                                        className="text-sm leading-5.6 ease-soft block w-full rounded-lg border border-gray-300 py-2 px-3 text-gray-700 transition-all focus:border-fuchsia-300 focus:outline-none focus:shadow"
                                        type="email"
                                    />
                                </div>
                                <div className="mb-4">
                                    <input
                                        placeholder="Telefone ex: (51) 91234-5678"
                                        className="text-sm leading-5.6 ease-soft block w-full rounded-lg border border-gray-300 py-2 px-3 text-gray-700 transition-all focus:border-fuchsia-300 focus:outline-none focus:shadow"
                                        type="tel"
                                        pattern="^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$"
                                        maxLength={15}
                                        inputMode="numeric"
                                    />
                                </div>
                                <div className="mb-4">
                                    <input
                                        placeholder="Mensagem"
                                        className="text-sm leading-5.6 ease-soft block w-full rounded-lg border border-gray-300 py-2 px-3 text-gray-700 transition-all focus:border-fuchsia-300 focus:outline-none focus:shadow"
                                        type="text"
                                    />
                                </div>

                                <div className="text-center">
                                    <button
                                        className="w-full px-6 py-3 mt-6 font-bold text-white uppercase transition-all rounded-lg shadow-soft-md bg-gradient-to-tl from-gray-900 to-slate-800 hover:scale-102 hover:shadow-lg"
                                        type="submit"
                                    >
                                        Enviar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}