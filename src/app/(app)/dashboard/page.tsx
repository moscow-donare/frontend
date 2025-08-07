"use client";

import { Button } from '@heroui/react';
import {
  Plus
} from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useWalletClient } from 'wagmi';
import ActionsComponent from './components/ActionsComponent';
import { CampaignsTable } from './components/CampaignsTable';
import MetricsComponent from './components/MetricsComponent';
import { useDashboard } from './hooks/useDashboard';
import PendingChangeModal from './components/PendingChangeModal';
import CancelledModal from './components/CancelledModal';

const DashboardPage: React.FC = () => {
  const [view, setView] = useState<'campaigns' | 'transactions'>('campaigns');
  const { fetchData } = useDashboard();
  const { isLoading} = useWalletClient();

  // Mock data for transactions - would come from API in a real app
  // const sampleTransactions: Transaction[] = [
  //   {
  //     id: '1',
  //     campaignId: '1',
  //     type: 'donation',
  //     amount: 50,
  //     from: '0x8ba1f109551bD432803012645Ac136ddd64DBA72',
  //     to: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
  //     txHash: '0xb5c8bd9430b6cc87a0e2fe110ece6bf527fa4f170a4bc8cd032f768fc5219838',
  //     date: new Date(Date.now() - 3600000), // 1 hour ago
  //     message: 'Espero que esto ayude!'
  //   },
  //   {
  //     id: '2',
  //     campaignId: '1',
  //     type: 'donation',
  //     amount: 25,
  //     from: '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
  //     to: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
  //     txHash: '0x7ff36ab5cfbf38a1d6c33e40663744a248983c951a3046dac08c0f72948a7218',
  //     date: new Date(Date.now() - 24 * 3600000), // 1 day ago
  //     message: ''
  //   },
  //   {
  //     id: '3',
  //     campaignId: '2',
  //     type: 'withdrawal',
  //     amount: 75,
  //     from: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
  //     to: '0x59D3445d1A91f8470eFd8105c2166d095FBb6047',
  //     txHash: '0xd98b19b8741c8cc1e2c9a094748d9012a4d7b2d6e7ec4c7587512ebefa019a91',
  //     date: new Date(Date.now() - 2 * 24 * 3600000), // 2 days ago
  //     message: ''
  //   }
  // ];
  
  useEffect(() => {
    if (isLoading) return;
    fetchData();
  }, [isLoading]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mi Panel de Control</h1>
          <p className="text-gray-600">Administra tus campañas y transacciones</p>
        </div>  
        <div className="mt-4 sm:mt-0">
          <Button
            as={Link}
            href="/campaigns/create"
            color="primary">
            <Plus className="h-4 w-4 mr-2" /> Nueva Campaña
          </Button>
        </div>
      </div>
      
      <MetricsComponent />
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
        <div className="border-b border-gray-200">
          <nav className="flex" aria-label="Tabs">
            <button
              onClick={() => setView('campaigns')}
              className={`px-6 py-4 text-sm font-medium ${
                view === 'campaigns'
                  ? 'border-b-2 border-primary-300 text-primary-400'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Mis Campañas
            </button>
            <button
              onClick={() => setView('transactions')}
              className={`px-6 py-4 text-sm font-medium ${
                view === 'transactions'
                  ?  'border-b-2 border-primary-300 text-primary-400'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Transacciones
            </button>
          </nav>
        </div>
        
        {view === 'campaigns' && (
          <CampaignsTable />
        )}
        
        {/* {view === 'transactions' && (
          <div className="p-6">
            <TransactionList transactions={sampleTransactions} showBlockchainLink={true} />
          </div>
        )} */}
      </div>
      <ActionsComponent />
      <PendingChangeModal />
      <CancelledModal />
    </div>
  );
};

export default DashboardPage;