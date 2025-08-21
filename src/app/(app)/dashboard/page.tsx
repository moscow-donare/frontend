"use client";

import React, { useState } from 'react';
import { 
  BarChart, TrendingUp, Users, AlertCircle, Settings, Plus,
  Eye, Edit, Trash2, PieChart, CreditCard, ArrowRight, ArrowDownRight
} from 'lucide-react';
import TransactionList from '../../components/TransactionList';
import { Transaction } from '../../types/Transaction';
import Link from 'next/link';
import Image from 'next/image';

const DashboardPage: React.FC = () => {
  const [view, setView] = useState<'campaigns' | 'transactions'>('campaigns');
  
  // Mock data for user's campaigns - would come from API in a real app
  const userCampaigns = [
    {
      id: '1',
      title: 'Campaña 1',
      description: 'Descripción de la campaña 1',
      amountRaised: 100,
      goal: 1000,
      donors: 5,
      daysLeft: 10,
      imageUrl: '/images/campaigns/campaign1.jpg',
      category: 'Salud'
    },
    {
      id: '2',
      title: 'Campaña 2',
      description: 'Descripción de la campaña 2',
      amountRaised: 200,
      goal: 1500,
      donors: 10,
      daysLeft: 5,
      imageUrl: '/images/campaigns/campaign2.jpg',
      category: 'Educación'
    },
    {
      id: '3',
      title: 'Campaña 3',
      description: 'Descripción de la campaña 3',
      amountRaised: 300,
      goal: 2000,
      donors: 15,
      daysLeft: 0,
      imageUrl: '/images/campaigns/campaign3.jpg',
      category: 'Medio Ambiente'
    }
  ];

  // Mock data for transactions - would come from API in a real app
  const sampleTransactions: Transaction[] = [
    {
      id: '1',
      campaignId: '1',
      type: 'donation',
      amount: 50,
      from: '0x8ba1f109551bD432803012645Ac136ddd64DBA72',
      to: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
      txHash: '0xb5c8bd9430b6cc87a0e2fe110ece6bf527fa4f170a4bc8cd032f768fc5219838',
      date: new Date(Date.now() - 3600000), // 1 hour ago
      message: 'Espero que esto ayude!'
    },
    {
      id: '2',
      campaignId: '1',
      type: 'donation',
      amount: 25,
      from: '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
      to: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
      txHash: '0x7ff36ab5cfbf38a1d6c33e40663744a248983c951a3046dac08c0f72948a7218',
      date: new Date(Date.now() - 24 * 3600000), // 1 day ago
      message: ''
    },
    {
      id: '3',
      campaignId: '2',
      type: 'withdrawal',
      amount: 75,
      from: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
      to: '0x59D3445d1A91f8470eFd8105c2166d095FBb6047',
      txHash: '0xd98b19b8741c8cc1e2c9a094748d9012a4d7b2d6e7ec4c7587512ebefa019a91',
      date: new Date(Date.now() - 2 * 24 * 3600000), // 2 days ago
      message: ''
    }
  ];
  
  // Calculate stats for dashboard
  const totalRaised = userCampaigns.reduce((sum, campaign) => sum + campaign.amountRaised, 0);
  const totalDonors = userCampaigns.reduce((sum, campaign) => sum + campaign.donors, 0);
  const activeCampaigns = userCampaigns.filter(campaign => campaign.daysLeft > 0).length;
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mi Panel de Control</h1>
          <p className="text-gray-600">Administra tus campañas y transacciones</p>
        </div>  
        <div className="mt-4 sm:mt-0">
          <Link
                  href="/campaigns/create"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            <Plus className="h-4 w-4 mr-2" /> Nueva Campaña
          </Link>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="bg-teal-100 rounded-full p-3 mr-4">
              <BarChart className="h-6 w-6 text-teal-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Recaudado</p>
              <h3 className="text-2xl font-bold text-gray-900">${totalRaised.toLocaleString()}</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="bg-purple-100 rounded-full p-3 mr-4">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Donantes</p>
              <h3 className="text-2xl font-bold text-gray-900">{totalDonors}</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="bg-orange-100 rounded-full p-3 mr-4">
              <TrendingUp className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Campañas Activas</p>
              <h3 className="text-2xl font-bold text-gray-900">{activeCampaigns}</h3>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
        <div className="border-b border-gray-200">
          <nav className="flex" aria-label="Tabs">
            <button
              onClick={() => setView('campaigns')}
              className={`px-6 py-4 text-sm font-medium ${
                view === 'campaigns'
                  ? 'border-b-2 border-teal-500 text-teal-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Mis Campañas
            </button>
            <button
              onClick={() => setView('transactions')}
              className={`px-6 py-4 text-sm font-medium ${
                view === 'transactions'
                  ? 'border-b-2 border-teal-500 text-teal-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Transacciones
            </button>
          </nav>
        </div>
        
        {view === 'campaigns' && (
          <div>
            {userCampaigns.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Campaña
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Estado
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Recaudado
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Donantes
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Días Restantes
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {userCampaigns.map((campaign) => (
                      <tr key={campaign.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0 mr-3">
                              <Image 
                                className="h-10 w-10 rounded object-cover" 
                                src={campaign.imageUrl} 
                                alt={campaign.title}
                                width={40}
                                height={40}
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{campaign.title}</div>
                              <div className="text-xs text-gray-500">{campaign.category}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            campaign.daysLeft > 30 
                              ? 'bg-green-100 text-green-800' 
                              : campaign.daysLeft > 7
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                          }`}>
                            {campaign.daysLeft > 0 ? 'Activa' : 'Finalizada'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">${campaign.amountRaised.toLocaleString()}</div>
                          <div className="text-xs text-gray-500">de ${campaign.goal.toLocaleString()}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {campaign.donors}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {campaign.daysLeft}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <Link 
                              href={`/campaigns/${campaign.id}`}
                              className="text-gray-400 hover:text-gray-500"
                              title="Ver"
                            >
                              <Eye className="h-5 w-5" />
                            </Link>
                            <Link 
                              href={`/campaigns/edit/${campaign.id}`}
                              className="text-blue-400 hover:text-blue-500"
                              title="Editar"
                            >
                              <Edit className="h-5 w-5" />
                            </Link>
                            <button 
                              className="text-red-400 hover:text-red-500"
                              title="Eliminar"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-16">
                <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No tienes campañas activas</h3>
                <p className="text-gray-500 mb-6">
                  ¡Comienza a crear tu primera campaña ahora!
                </p>
                <Link
                  href="/campaigns/create"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                >
                  <Plus className="h-4 w-4 mr-2" /> Nueva Campaña
                </Link>
              </div>
            )}
          </div>
        )}
        
        {view === 'transactions' && (
          <div className="p-6">
            <TransactionList transactions={sampleTransactions} showBlockchainLink={true} />
          </div>
        )}
      </div>
      
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
    </div>
  );
};

export default DashboardPage;