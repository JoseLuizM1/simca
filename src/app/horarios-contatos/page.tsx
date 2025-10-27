'use client';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import { FaWhatsapp } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';

const horarios = [
  { dia: 'Segunda à Sexta', horario: '08:00 às 17:00 (sem fechar ao meio-dia)' },

];

export default function HorariosContatosPage() {
  function handleEmailClick(valor: string) {
    window.open(`mailto:${valor}`, '_blank');
  };

  function handleWhatsapp(valor: string) {
    window.open(`https://api.whatsapp.com/send?phone=${valor}&text=Olá, gostaria de mais informações.`, '_blank');
  };

  return (
    <main
      style={{
        height: "calc(100vh - 68px - 148px)",
        backgroundImage: "url('/simca2.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
      className='relative bg-red-800'
    >
      {/* semi-transparent overlay for better text contrast */}
      <div className="absolute bg-black/40 pointer-events-none" aria-hidden="true" />

      <div className="container mx-auto gap-4 flex h-full text-white z-10">
        <div className="w-full h-full flex flex-col justify-center gap-8">
          <div className='flex flex-col'>
            <h3 className="text-2xl font-bold">Horários</h3>
            <div className='flex flex-col gap-2'>
              {
                horarios.map((item, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <FaRegCalendarAlt size={16}/>
                    <span>{item.dia} - {item.horario}</span>
                  </div>
                ))
              }
            </div>
          </div>

          <div className='flex flex-col'>
            <h3 className="text-2xl font-bold">Contatos</h3>

            <div className='flex gap-2 items-center mt-2 cursor-pointer' onClick={() => handleEmailClick('simcacachoeirinha@gmail.com')}>
              <HiOutlineMail size={22}/>
              <span>simcacachoeirinha@gmail.com</span>
            </div>

            <div className='flex gap-2 items-center cursor-pointer' onClick={() => handleWhatsapp('+5551998660241')}>
              <FaWhatsapp size={22}/>
              <span>+55 51 99866-0241</span>
            </div>

            <div className='flex gap-2 items-center'>
              <FaLocationDot size={22}/>
              <span>Avenida Flores da Cunha, 903, Sala 1202 - 12º Andar - Cachoeirinha/RS</span>
            </div>
          </div>

          <div className='flex flex-col'>
            <h3 className="text-2xl font-bold">Imprensa</h3>

            <div className='flex gap-2 items-center mt-2 cursor-pointer' onClick={() => handleEmailClick('ascomsimca@gmail.com')}>
              <HiOutlineMail size={22}/>
              <span>simcacomunicacao@gmail.com</span>
            </div>

            <div className='flex gap-2 items-center cursor-pointer' onClick={() => handleWhatsapp('+5551995901688')}>
              <FaWhatsapp size={22}/>
              <span>+55 51 99590-1688</span>
            </div>
          </div>
        </div>

        <div className="w-full h-full flex items-center justify-center">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3456.8923305314947!2d-51.10812612608829!3d-29.953775471737732!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95197153d482c3ef%3A0x7f9ff29313267c35!2sSindicatos%20dos%20Municip%C3%A1rios%20de%20Cachoeirinha%20-%20SIMCA!5e0!3m2!1spt-PT!2sbr!4v1754284069114!5m2!1spt-PT!2sbr" 
            width="740" 
            height="380" 
            loading="lazy" 
          />
        </div>
      </div>
    </main>
  );
}
