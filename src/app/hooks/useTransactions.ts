import { useState } from 'react';
import { Transaction } from '../types/Transaction';

// Sample transaction data
const sampleTransactions: Record<string, Transaction[]> = {
  '1': [
    {
      id: '101',
      campaignId: '1',
      type: 'donation',
      amount: 500,
      from: '0x8ba1f109551bD432803012645Ac136ddd64DBA72',
      to: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
      txHash: '0xb5c8bd9430b6cc87a0e2fe110ece6bf527fa4f170a4bc8cd032f768fc5219838',
      date: new Date(Date.now() - 2 * 24 * 3600000), // 2 days ago
      message: 'Espero que pronto te recuperes. ¡Mucha fuerza!'
    },
    {
      id: '102',
      campaignId: '1',
      type: 'donation',
      amount: 1000,
      from: '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
      to: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
      txHash: '0x7ff36ab5cfbf38a1d6c33e40663744a248983c951a3046dac08c0f72948a7218',
      date: new Date(Date.now() - 5 * 24 * 3600000), // 5 days ago
      message: ''
    },
    {
      id: '103',
      campaignId: '1',
      type: 'donation',
      amount: 250,
      from: '0x90F79bf6EB2c4f870365E785982E1f101E93b906',
      to: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
      txHash: '0xd98b19b8741c8cc1e2c9a094748d9012a4d7b2d6e7ec4c7587512ebefa019a91',
      date: new Date(Date.now() - 7 * 24 * 3600000), // 7 days ago
      message: 'De parte de todos en la oficina. ¡Te queremos!'
    }
  ],
  '2': [
    {
      id: '201',
      campaignId: '2',
      type: 'donation',
      amount: 100,
      from: '0x976EA74026E726554dB657fA54763abd0C3a0aa9',
      to: '0x59D3445d1A91f8470eFd8105c2166d095FBb6047',
      txHash: '0xa5c8bd9430b6cc87a0e2fe110ece6bf527fa4f170a4bc8cd032f768fc5219838',
      date: new Date(Date.now() - 1 * 24 * 3600000), // 1 day ago
      message: 'Quiero apoyar a esta escuela rural. ¡Gran iniciativa!'
    },
    {
      id: '202',
      campaignId: '2',
      type: 'donation',
      amount: 50,
      from: '0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65',
      to: '0x59D3445d1A91f8470eFd8105c2166d095FBb6047',
      txHash: '0x6ff36ab5cfbf38a1d6c33e40663744a248983c951a3046dac08c0f72948a7218',
      date: new Date(Date.now() - 3 * 24 * 3600000), // 3 days ago
      message: 'Por un futuro mejor para los niños.'
    }
  ],
  '3': [
    {
      id: '301',
      campaignId: '3',
      type: 'donation',
      amount: 2500,
      from: '0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc',
      to: '0x8ba1f109551bD432803012645Ac136ddd64DBA72',
      txHash: '0xc5c8bd9430b6cc87a0e2fe110ece6bf527fa4f170a4bc8cd032f768fc5219838',
      date: new Date(Date.now() - 10 * 24 * 3600000), // 10 days ago
      message: 'Apoyo completamente este proyecto de energía renovable. ¡Es el futuro!'
    },
    {
      id: '302',
      campaignId: '3',
      type: 'withdrawal',
      amount: 1000,
      from: '0x8ba1f109551bD432803012645Ac136ddd64DBA72',
      to: '0x976EA74026E726554dB657fA54763abd0C3a0aa9',
      txHash: '0x5ff36ab5cfbf38a1d6c33e40663744a248983c951a3046dac08c0f72948a7218',
      date: new Date(Date.now() - 5 * 24 * 3600000), // 5 days ago
      message: 'Primer retiro para compra de equipos'
    }
  ]
};

interface UseTransactionsReturn {
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
}

export const useTransactions = (campaignId: string): UseTransactionsReturn => {
  // Initialize with sample data if available, otherwise empty array
  const initialTransactions = sampleTransactions[campaignId] || [];
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);

  const addTransaction = (transaction: Transaction): void => {
    setTransactions(prevTransactions => [...prevTransactions, transaction]);
  };

  return { transactions, addTransaction };
};