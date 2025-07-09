import { TikTokIcon } from '@public/icons/TikTokIcon';
import { Instagram, Linkedin } from 'lucide-react';
import Link from 'next/link';
import logo from "../../../public/images/logo.png";
import Image from 'next/image';


const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center">
              <Image src={logo} alt="Logo" width={40} height={40} />
              <span className="ml-2 text-2xl font-bold">Donaré</span>
            </Link>
            <p className="mt-4 text-gray-300 text-sm">
              Revolucionando la forma en que se gestionan las donaciones con transparencia total mediante tecnología blockchain.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="https://www.linkedin.com/company/donar%C3%A9/" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://www.instagram.com/donare.web3" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://www.tiktok.com/@donare.web3" className="text-gray-400 hover:text-white transition-colors">
                <TikTokIcon className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Donaré</h3>
            <ul className="space-y-2">
              <li><Link href="/home" className="text-gray-400 hover:text-white transition-colors">Inicio</Link></li>
              <li><Link href="/campaigns" className="text-gray-400 hover:text-white transition-colors">Ver Campañas</Link></li>
              <li><Link href="/campaigns/create" className="text-gray-400 hover:text-white transition-colors">Crear Campaña</Link></li>
              <li><Link href="/how-it-works" className="text-gray-400 hover:text-white transition-colors">¿Cómo funciona?</Link></li>
              <li><Link href="/about-us" className="text-gray-400 hover:text-white transition-colors">Contacto</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Recursos</h3>
            <ul className="space-y-2">
              <li><Link href="/terms" className="text-gray-400 hover:text-white transition-colors">Términos de Servicio</Link></li>
              <li><Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">Política de Privacidad</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <ul className="space-y-2">
              <li><a href="mailto:donare.onchain@gmail.com" className="text-gray-400 hover:text-white transition-colors">donare.onchain@gmail.com</a></li>
              {/* TO DO: Agregar telefono si algun dia se implementa */}
              {/* <li><a href="tel:+123456789" className="text-gray-400 hover:text-white transition-colors">+1 (234) 567-89</a></li> */}
              <li><span className="text-gray-400">Villa María, Córdoba, Argentina</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <p className="text-center text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Donaré. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;