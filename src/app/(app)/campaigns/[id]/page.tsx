"use client"
import React, { use } from 'react';
import { 
  Clock, Users, Share2, Heart, Calendar, User, ExternalLink, 
  AlertCircle, CheckCircle, ArrowLeft
} from 'lucide-react';
import DonationForm from '../../../components/DonationForm';
import TransactionList from '../../../components/TransactionList';
import { useCampaigns } from '../../../context/CampaignContext';
import { useTransactions } from '../../../hooks/useTransactions';
import Link from 'next/link';

export default function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const  { id } = use(params);
  const { getCampaignById } = useCampaigns();
  const campaign = getCampaignById(id || '');
  const { transactions, addTransaction } = useTransactions(id || '');
  
  const handleDonate = (amount: number, message: string, isAnonymous: boolean) => {
    // In a real app, this would process payment and create blockchain transaction
    addTransaction({
      id: Date.now().toString(),
      campaignId: id || '',
      type: 'donation',
      amount: amount,
      from: isAnonymous ? '0x000...000' : '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
      to: campaign?.walletAddress || '',
      txHash: `0x${Math.random().toString(16).slice(2)}`,
      date: new Date(),
      message: message
    });
  };
  
  if (!campaign) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Campaña no encontrada</h2>
          <p className="text-gray-600 mb-6">
            Lo sentimos, la campaña que estás buscando no existe o ha sido eliminada.
          </p>
          <Link 
            href="/"
            className="inline-flex items-center text-teal-600 font-medium hover:text-teal-700"
          >
            <ArrowLeft className="h-5 w-5 mr-1" /> Volver al inicio
          </Link>
        </div>
      </div>
    );
  }
  
  const progress = (campaign.amountRaised / campaign.goal) * 100;
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Link 
          href="/"
          className="inline-flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4 mr-1" /> Volver
        </Link>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative">
              <img 
                src={campaign.imageUrl} 
                alt={campaign.title}
                className="w-full h-72 object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                  campaign.category === 'Salud' ? 'bg-red-100 text-red-800' :
                  campaign.category === 'Educación' ? 'bg-blue-100 text-blue-800' :
                  campaign.category === 'Rifa' ? 'bg-purple-100 text-purple-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {campaign.category}
                </span>
              </div>
              {campaign.isVerified && (
                <div className="absolute top-4 right-4">
                  <div className="bg-white rounded-full p-1 shadow flex items-center">
                    <CheckCircle className="h-4 w-4 text-teal-600 mr-1" />
                    <span className="text-xs font-medium">Verificado</span>
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">{campaign.title}</h1>
              
              <div className="flex flex-wrap items-center text-sm text-gray-500 mb-6 gap-4">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>Creado el {campaign.createdAt.toLocaleDateString()}</span>
                </div>
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  <span>Por {campaign.creator}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{campaign.daysLeft} días restantes</span>
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-gray-900">${campaign.amountRaised.toLocaleString()}</span>
                  <span className="text-gray-500">de ${campaign.goal.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
                  <div 
                    className="bg-teal-600 h-2.5 rounded-full" 
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{campaign.donors} donantes</span>
                  </div>
                  <span>{progress.toFixed(1)}% completado</span>
                </div>
              </div>
              
              <div className="prose max-w-none mb-8">
                <h2 className="text-xl font-semibold mb-4">Sobre esta campaña</h2>
                <p className="text-gray-700">{campaign.description}</p>
                <p className="text-gray-700 mt-4">{campaign.fullDescription}</p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex-1 flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                  <Heart className="h-4 w-4 mr-2" /> Me gusta
                </button>
                <button className="flex-1 flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                  <Share2 className="h-4 w-4 mr-2" /> Compartir
                </button>
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Blockchain transparente</h2>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex items-start mb-4">
                <div className="bg-gray-100 p-2 rounded-md mr-3">
                  <ExternalLink className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Transparencia Blockchain</h3>
                  <p className="text-gray-600 text-sm">
                    Todas las transacciones de esta campaña son públicas y verificables en la blockchain.
                    Puedes verificar el contrato inteligente y las transacciones en tiempo real.
                  </p>
                </div>
              </div>
              <div className="bg-gray-50 rounded-md p-4">
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Dirección del contrato</div>
                    <div className="font-mono text-sm bg-white border border-gray-200 rounded px-2 py-1">
                      {campaign.walletAddress}
                    </div>
                  </div>
                  <div>
                    <a 
                      href={`https://etherscan.io/address/${campaign.walletAddress}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-teal-600 hover:text-teal-700 text-sm font-medium"
                    >
                      Ver en blockchain <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <TransactionList transactions={transactions} />
          </div>
        </div>
        
        <div>
          <div className="sticky top-24">
            <DonationForm campaign={campaign} onDonate={handleDonate} />
            
            <div className="mt-6 bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Acerca del beneficiario</h3>
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                  <img 
                    src={campaign.creatorImageUrl || 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'} 
                    alt={campaign.creator}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="ml-4">
                  <h4 className="font-medium text-gray-900">{campaign.creator}</h4>
                  <p className="text-gray-500 text-sm">Organizador de la campaña</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                {campaign.creatorBio || 'Este organizador está trabajando para ayudar a su comunidad y necesita tu apoyo para lograrlo.'}
              </p>
              {campaign.isVerified && (
                <div className="flex items-center text-sm text-teal-600">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  <span>Identidad verificada</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};