'use client';
import { FaFacebook, FaYoutube } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { FaWhatsapp } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-red-950">
      <div className='
        container mx-auto flex flex-col items-center justify-between p-8 gap-8
      '>
        <h3 className='text-white text-xl font-bold text-center'>
          Sindicato dos Municipários de Cachoeirinha
        </h3>

        <hr className='w-full border-red-900' />

        <div className='flex justify-between w-full'>
          <span className='text-white'>&copy; {new Date().getFullYear()} - Todos direitos reservados.</span>
          <div className='flex gap-4'>
            <FaFacebook className='text-white text-xl cursor-pointer' onClick={() => window.open('https://www.facebook.com/SindicatoDosMunicipariosDeCachoeirinhars?locale=pt_BR', '_blank')} />
            <FaInstagram className='text-white text-xl cursor-pointer' onClick={() => window.open('https://www.instagram.com/simcacachoeirinha/', '_blank')} />
            <FaWhatsapp className='text-white text-xl cursor-pointer' onClick={() => window.open('https://wa.me/+555198660241', '_blank')} />
            <FaYoutube className='text-white text-xl cursor-pointer' onClick={() => window.open('https://www.youtube.com/@TVSIMCA', '_blank')} />
          </div>
        </div>
      </div>
    </footer>
  );
}