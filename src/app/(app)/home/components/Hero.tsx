import React from 'react';
import { ChevronRight, Shield, Zap, Heart } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import hero from "@public/images/home/hero.png"
import { Card } from '@heroui/react';

const Hero = () => {
  return (
    <div className="bg-gradient-to-br from-primary-600 to-secondary-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Donaciones Transparentes con <span className="text-secondary-300">Blockchain</span>
            </h1>
            <p className="text-lg md:text-xl mb-6 text-teal-100">
              Revoluciona la forma en que gestionas la recaudacion de fondos con total transparencia, 
              seguridad y eficiencia.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                // href="/campaigns/create" 
                href="/home" 
                className="bg-white text-teal-700 hover:bg-teal-50 px-6 py-3 rounded-md font-medium text-center transition-colors"
              >
                Crear Campaña
              </Link>
              <Link 
                href="/how-it-works" 
                className="bg-transparent border border-white text-white hover:bg-white/10 px-6 py-3 rounded-md font-medium flex items-center justify-center transition-colors"
              >
                ¿Cómo Funciona? <ChevronRight className="h-5 w-5 ml-1" />
              </Link>
            </div>
            
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center sm:text-left">
              <div className="flex flex-col items-center sm:items-start">
                <div className="bg-white/10 p-2 rounded-full mb-2">
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-medium mb-1">100% Seguro</h3>
                <p className="text-teal-100 text-sm">Transacciones protegidas</p>
              </div>
              
              <div className="flex flex-col items-center sm:items-start">
                <div className="bg-white/10 p-2 rounded-full mb-2">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-medium mb-1">Rápido</h3>
                <p className="text-teal-100 text-sm">Fondos disponibles al instante</p>
              </div>
              
              <div className="flex flex-col items-center sm:items-start">
                <div className="bg-white/10 p-2 rounded-full mb-2">
                  <Heart className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-medium mb-1">Impacto Real</h3>
                <p className="text-teal-100 text-sm">Verificación de donaciones</p>
              </div>
            </div>
          </div>
          
          <div className="order-1 md:order-2 flex justify-center">
            <div className="relative">
              <Card className="w-full h-full rounded-lg shadow-lg overflow-hidden">
                <Image 
                  // src="https://images.pexels.com/photos/6647037/pexels-photo-6647037.jpeg" 
                  src={hero}                   
                  alt="Donaciones transparentes" 
                  className="w-full h-full object-cover"
                  width={400}
                  height={400}
                />
              </Card>
              {/* <div className="absolute -bottom-6 -right-6 bg-purple-600 rounded-lg shadow-lg p-4 w-40">
                <div className="text-xs font-medium mb-1">Verificado por Blockchain</div>
                <div className="flex items-center text-sm font-bold">
                  <span className="mr-1">$1,245,678</span>
                  <span className="text-purple-300 text-xs">donados</span>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;