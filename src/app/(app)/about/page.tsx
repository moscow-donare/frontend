"use client"

import React from 'react';
import { 
  Shield, Zap, Heart, Lock, Eye, BarChart, CheckCircle,
  Database, ChevronRight
} from 'lucide-react';
import Link from 'next/link';

const AboutPage: React.FC = () => {
  return (
    <div>
      <section className="bg-gradient-to-br from-teal-600 to-teal-800 text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Revolucionando la <span className="text-purple-300">Transparencia</span> en Donaciones
          </h1>
          <p className="text-lg md:text-xl mb-8 text-teal-100 max-w-3xl mx-auto">
            Donaré utiliza la tecnología blockchain para garantizar que cada donación sea transparente, 
            verificable y llegue a su destino sin intermediarios.
          </p>
        </div>
      </section>
      
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">¿Por qué Donaré?</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Desarrollamos Donaré para solucionar los problemas de confianza y transparencia en 
              el sector de donaciones y recaudación de fondos.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-xl p-8 shadow-sm text-center">
              <div className="bg-teal-100 rounded-full p-3 inline-block mb-4">
                <Lock className="h-6 w-6 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Seguridad Garantizada</h3>
              <p className="text-gray-600">
                Cada transacción es inmutable y criptográficamente segura, lo que significa que no puede ser 
                alterada ni falsificada.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-8 shadow-sm text-center">
              <div className="bg-purple-100 rounded-full p-3 inline-block mb-4">
                <Eye className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Transparencia Total</h3>
              <p className="text-gray-600">
                Todos los movimientos de fondos son públicos y verificables en tiempo real, sin posibilidad 
                de manipulación.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-8 shadow-sm text-center">
              <div className="bg-orange-100 rounded-full p-3 inline-block mb-4">
                <BarChart className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Eficiencia Máxima</h3>
              <p className="text-gray-600">
                Reducimos drásticamente los costos operativos para que más de tu donación llegue a quien 
                realmente lo necesita.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">¿Cómo Funciona?</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              La tecnología blockchain nos permite crear un sistema completamente transparente donde 
              cada paso del proceso es verificable.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <ol className="relative border-l border-gray-300">
                <li className="mb-10 ml-6">
                  <span className="flex absolute -left-3 justify-center items-center w-6 h-6 bg-teal-600 rounded-full">
                    <span className="text-white text-sm font-bold">1</span>
                  </span>
                  <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900">
                    Creación de Campaña
                  </h3>
                  <p className="mb-4 text-gray-600">
                    El beneficiario crea una campaña detallando el objetivo, el monto necesario y la 
                    fecha límite. Se genera automáticamente un contrato inteligente en la blockchain.
                  </p>
                </li>
                <li className="mb-10 ml-6">
                  <span className="flex absolute -left-3 justify-center items-center w-6 h-6 bg-teal-600 rounded-full">
                    <span className="text-white text-sm font-bold">2</span>
                  </span>
                  <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900">
                    Proceso de Verificación
                  </h3>
                  <p className="mb-4 text-gray-600">
                    Nuestro equipo verifica la identidad del beneficiario y la validez de la campaña
                    para garantizar la legitimidad de la causa.
                  </p>
                </li>
                <li className="mb-10 ml-6">
                  <span className="flex absolute -left-3 justify-center items-center w-6 h-6 bg-teal-600 rounded-full">
                    <span className="text-white text-sm font-bold">3</span>
                  </span>
                  <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900">
                    Donaciones Transparentes
                  </h3>
                  <p className="mb-4 text-gray-600">
                    Los donantes realizan sus aportes que son registrados en la blockchain, 
                    creando un registro público e inmutable de cada transacción.
                  </p>
                </li>
                <li className="ml-6">
                  <span className="flex absolute -left-3 justify-center items-center w-6 h-6 bg-teal-600 rounded-full">
                    <span className="text-white text-sm font-bold">4</span>
                  </span>
                  <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900">
                    Transferencia de Fondos
                  </h3>
                  <p className="mb-4 text-gray-600">
                    Los fondos son transferidos directamente al beneficiario con un registro detallado
                    de cada movimiento, asegurando que lleguen a su destino.
                  </p>
                </li>
              </ol>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="relative">
                <img 
                  src="https://images.pexels.com/photos/8370752/pexels-photo-8370752.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Blockchain Technology"
                  className="w-full h-80 object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-bold text-white mb-2">Tecnología Blockchain</h3>
                  <p className="text-white text-sm">
                    Nuestra plataforma utiliza contratos inteligentes para garantizar que cada transacción
                    sea segura, transparente y verificable.
                  </p>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="flex items-center mb-2">
                    <Database className="h-5 w-5 text-teal-600 mr-2" />
                    <h4 className="font-medium text-gray-900">Registro Descentralizado</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    Todas las transacciones son almacenadas en múltiples nodos para garantizar su integridad.
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="flex items-center mb-2">
                    <Shield className="h-5 w-5 text-teal-600 mr-2" />
                    <h4 className="font-medium text-gray-900">Seguridad Criptográfica</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    Utilizamos encriptación avanzada para proteger todas las transacciones.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Únete a Donaré</h2>
            <p className="text-teal-100 max-w-3xl mx-auto">
              Sé parte de la revolución en la forma de hacer donaciones y ayudar a causas importantes.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center">
              <div className="bg-white/20 rounded-full p-3 inline-block mb-4">
                <Heart className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Haz una Donación</h3>
              <p className="text-teal-100 mb-4">
                Apoya causas importantes con la seguridad de que tu dinero llegará a quien lo necesita.
              </p>
              <Link 
                href="/"
                className="inline-flex items-center text-white font-medium hover:text-teal-100"
              >
                Ver campañas <ChevronRight className="h-5 w-5 ml-1" />
              </Link>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center">
              <div className="bg-white/20 rounded-full p-3 inline-block mb-4">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Crea una Campaña</h3>
              <p className="text-teal-100 mb-4">
                Inicia tu propia campaña para financiar un proyecto o ayudar a quien lo necesite.
              </p>
              <Link 
                href="/create"
                className="inline-flex items-center text-white font-medium hover:text-teal-100"
              >
                Crear campaña <ChevronRight className="h-5 w-5 ml-1" />
              </Link>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center">
              <div className="bg-white/20 rounded-full p-3 inline-block mb-4">
                <CheckCircle className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Verifica Transparencia</h3>
              <p className="text-teal-100 mb-4">
                Consulta el registro blockchain para verificar cada transacción realizada en la plataforma.
              </p>
              <Link 
                href="/"
                className="inline-flex items-center text-white font-medium hover:text-teal-100"
              >
                Explorar blockchain <ChevronRight className="h-5 w-5 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;