export default function PrecatorioPage() {
  return (
    <main
      style={{ minHeight: "calc(100vh - 68px - 148px)" }}
      className="bg-red-900 py-12"
    >
      <div className="container mx-auto flex flex-col gap-12 text-white">
      <h1 className="text-2xl font-bold mb-4">PRECATÓRIOS</h1>
      <p className="text-lg">Abaixo serão inseridas as imagens referentes aos precatórios</p>
      <img className="flex flex-col" src="../public/precatorio/precatorios1.jpg" alt="Precatórios" />
      <img className="flex flex-col" src="../public/precatorio/precatorios2.jpg" alt="Precatórios" />
      <img className="flex flex-col" src="../public/precatorio/precatorios3.jpg" alt="Precatórios" />

    </div>
    </main>
  );
}