import { ArrowDownRight, ArrowRight, CreditCard, PieChart, Settings } from "lucide-react";

export default function ActionsComponent() {
    return(
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium text-gray-900">Análisis de Recaudación</h3>
              <div className="flex items-center text-sm text-gray-500">
                <span className="mr-2">Últimos 30 días</span>
                <Settings className="h-4 w-4" />
              </div>
            </div>
            
            <div className="h-64 flex items-center justify-center">
              <div className="text-center">
                <PieChart className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">
                  Gráfico de análisis de recaudación
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-6">Acciones Rápidas</h3>
            
            <div className="space-y-4">
              <a href="#" className="block p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">
                <div className="flex items-center">
                  <div className="bg-teal-100 rounded-full p-2 mr-4">
                    <CreditCard className="h-5 w-5 text-teal-600" />
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-sm font-medium text-gray-900">Retirar Fondos</h4>
                    <p className="text-xs text-gray-500">Transfiere fondos a tu cuenta</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400" />
                </div>
              </a>
              
              <a href="#" className="block p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">
                <div className="flex items-center">
                  <div className="bg-purple-100 rounded-full p-2 mr-4">
                    <ArrowDownRight className="h-5 w-5 text-purple-600" />
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-sm font-medium text-gray-900">Descargar Informes</h4>
                    <p className="text-xs text-gray-500">Informes de donaciones y transacciones</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400" />
                </div>
              </a>
              
              <a href="#" className="block p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">
                <div className="flex items-center">
                  <div className="bg-orange-100 rounded-full p-2 mr-4">
                    <Settings className="h-5 w-5 text-orange-600" />
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-sm font-medium text-gray-900">Configuración</h4>
                    <p className="text-xs text-gray-500">Administra tu cuenta y preferencias</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    )
}