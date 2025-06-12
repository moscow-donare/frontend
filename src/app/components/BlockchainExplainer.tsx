import React from 'react';
import { Lock, Eye, ChevronRight, BarChart } from 'lucide-react';
import Link from 'next/link';

const BlockchainExplainer = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">¿Cómo funciona nuestra tecnología Blockchain?</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Donare utiliza la tecnología blockchain para garantizar que cada donación sea transparente, 
            verificable y llegue a su destino sin intermediarios.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-50 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-teal-100 rounded-full -mr-16 -mt-16 opacity-30"></div>
            <div className="relative">
              <div className="bg-teal-100 rounded-full p-3 inline-block mb-4">
                <Lock className="h-6 w-6 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Seguridad Garantizada</h3>
              <p className="text-gray-600 mb-4">
                Cada transacción es inmutable y criptográficamente segura, lo que significa que no puede ser 
                alterada ni falsificada.
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start">
                  <span className="text-teal-600 mr-2">•</span>
                  <span className="text-gray-600 text-sm">Registro permanente de transacciones</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-600 mr-2">•</span>
                  <span className="text-gray-600 text-sm">Encriptación de datos avanzada</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-600 mr-2">•</span>
                  <span className="text-gray-600 text-sm">Prevención de fraude</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-100 rounded-full -mr-16 -mt-16 opacity-30"></div>
            <div className="relative">
              <div className="bg-purple-100 rounded-full p-3 inline-block mb-4">
                <Eye className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Transparencia Total</h3>
              <p className="text-gray-600 mb-4">
                Todos los movimientos de fondos son públicos y verificables en tiempo real, sin posibilidad 
                de manipulación.
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span className="text-gray-600 text-sm">Visualización en tiempo real</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span className="text-gray-600 text-sm">Registro público de donantes</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span className="text-gray-600 text-sm">Seguimiento de uso de fondos</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-100 rounded-full -mr-16 -mt-16 opacity-30"></div>
            <div className="relative">
              <div className="bg-orange-100 rounded-full p-3 inline-block mb-4">
                <BarChart className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Eficiencia Máxima</h3>
              <p className="text-gray-600 mb-4">
                Reducimos drásticamente los costos operativos para que más de tu donación llegue a quien 
                realmente lo necesita.
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  <span className="text-gray-600 text-sm">Comisiones mínimas</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  <span className="text-gray-600 text-sm">Sin intermediarios</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  <span className="text-gray-600 text-sm">Transferencias instantáneas</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <Link 
            href="/how-it-works" 
            className="inline-flex items-center text-teal-600 font-medium hover:text-teal-700 transition-colors"
          >
            Conoce más sobre nuestra tecnología <ChevronRight className="h-5 w-5 ml-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlockchainExplainer;