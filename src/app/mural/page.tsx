

export default function MuralSection() {
  return (
    <section className="bg-red-900">
      <div
        style={{
          minHeight: 'calc(100vh - 68px)'
        }}
        className="relative flex items-center justify-center text-black"
      >
        <img src="/heroisNegros.png" alt="" className="container bg-cover bg-center" style={{
          opacity: 0.5,
          zIndex: 0,
        }} />
        
      </div>

    </section>
  );
}