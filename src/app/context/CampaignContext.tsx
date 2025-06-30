"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Campaign } from '../types/Campaign';

// Sample campaign data
const sampleCampaigns: Campaign[] = [
  {
    id: '1',
    title: 'Tratamiento oncológico para María',
    description: 'Recaudación de fondos para cubrir gastos médicos de cáncer',
    fullDescription: 'María necesita un tratamiento oncológico especializado no cubierto por su obra social. Los fondos servirán para medicamentos, honorarios médicos y terapias complementarias. Cada peso donado queda registrado en la blockchain, garantizando transparencia total.',
    category: 'Salud',
    imageUrl: 'https://images.pexels.com/photos/579474/pexels-photo-579474.jpeg',
    goal: 15000,
    amountRaised: 8750,
    createdAt: new Date(2025, 3, 15),
    endDate: new Date(2025, 6, 15),
    daysLeft: 21,
    donors: 124,
    creator: 'María López',
    creatorImageUrl: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    walletAddress: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
    isVerified: true
  },
  {
    id: '2',
    title: 'Energía solar para la comunidad El Alto',
    description: 'Instalación de paneles solares para 25 familias',
    fullDescription: 'Esta iniciativa instalará paneles solares en El Alto, mejorando el acceso a electricidad confiable y reduciendo costos energéticos. Incluye compra de equipos, instalación y capacitación a la comunidad para su mantenimiento.',
    category: 'Proyecto Comunitario',
    imageUrl: 'https://images.pexels.com/photos/356036/pexels-photo-356036.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    goal: 20000,
    amountRaised: 12800,
    createdAt: new Date(2025, 4, 1),
    endDate: new Date(2025, 7, 1),
    daysLeft: 38,
    donors: 145,
    creator: 'Energía para Todos',
    creatorImageUrl: 'https://images.pexels.com/photos/1367276/pexels-photo-1367276.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    walletAddress: '0x8ba1f109551bD432803012645Ac136ddd64DBA72',
    isVerified: true
  },
  {
    id: '3',
    title: 'Becas universitarias para 10 jóvenes',
    description: 'Apoyo completo para estudios de estudiantes de bajos recursos',
    fullDescription: 'Nuestro programa seleccionará 10 estudiantes destacados de comunidades vulnerables, cubriendo matrícula, materiales educativos, transporte y un estipendio mensual durante un año académico.',
    category: 'Educación',
    imageUrl: 'https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    goal: 20000,
    amountRaised: 5600,
    createdAt: new Date(2025, 4, 10),
    endDate: new Date(2025, 8, 10),
    daysLeft: 78,
    donors: 78,
    creator: 'Fundación Educando Futuros',
    creatorImageUrl: 'https://images.pexels.com/photos/3184303/pexels-photo-3184303.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    walletAddress: '0x90F79bf6EB2c4f870365E785982E1f101E93b906',
    isVerified: true
  },
  {
    id: '4',
    title: 'Ayuda inmediata tras inundaciones en Santa Fe',
    description: 'Provisión de alimentos, agua y refugio para damnificados',
    fullDescription: 'Las lluvias recientes han dejado a cientos de familias sin hogar. Esta campaña financia alimentos, agua potable, kits de higiene y alojamiento temporal, con trazabilidad on-chain de cada gasto.',
    category: 'Emergencia',
    imageUrl: 'https://images.pexels.com/photos/32682425/pexels-photo-32682425.jpeg',
    goal: 12000,
    amountRaised: 9800,
    createdAt: new Date(2025, 5, 1),
    endDate: new Date(2025, 6, 30),
    daysLeft: 6,
    donors: 320,
    creator: 'Cruz Roja Local',
    creatorImageUrl: 'https://images.pexels.com/photos/40979/pexels-photo-40979.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    walletAddress: '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
    isVerified: true
  },
  {
    id: '5',
    title: 'Equipamiento lúdico y educativo para Centro Juvenil',
    description: 'Compra de instrumentos, computadoras y material deportivo',
    fullDescription: 'El Centro Juvenil “La Esperanza” necesita mesas de ping-pong, guitarras, ordenadores para talleres digitales y material artístico para encaminar a más de 150 jóvenes.',
    category: 'Proyecto Comunitario',
    imageUrl: 'https://images.pexels.com/photos/4164903/pexels-photo-4164903.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    goal: 8000,
    amountRaised: 2200,
    createdAt: new Date(2025, 4, 20),
    endDate: new Date(2025, 7, 20),
    daysLeft: 26,
    donors: 45,
    creator: 'Centro Juventud Activa',
    creatorImageUrl: 'https://images.pexels.com/photos/3769711/pexels-photo-3769711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    walletAddress: '0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65',
    isVerified: true
  },
  {
    id: '6',
    title: 'Salud bucal para 50 niños',
    description: 'Tratamientos dentales y talleres de higiene para familias vulnerables',
    fullDescription: 'Financiaremos revisiones, limpiezas, empastes y charlas de prevención para 50 niños. La trazabilidad de cada procedimiento y gasto quedará registrada en blockchain.',
    category: 'Salud',
    imageUrl: 'https://images.pexels.com/photos/32690918/pexels-photo-32690918.jpeg',
    goal: 12000,
    amountRaised: 3500,
    createdAt: new Date(2025, 5, 5),
    endDate: new Date(2025, 8, 5),
    daysLeft: 73,
    donors: 62,
    creator: 'Sonrisas Saludables',
    creatorImageUrl: 'https://images.pexels.com/photos/3770588/pexels-photo-3770588.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    walletAddress: '0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc',
    isVerified: true
  }
];

// Define the context type
interface CampaignContextType {
  campaigns: Campaign[];
  getCampaignById: (id: string) => Campaign | undefined;
  addCampaign: (campaign: Campaign) => void;
}

// Create the context with default values
const CampaignContext = createContext<CampaignContextType>({
  campaigns: [],
  getCampaignById: () => undefined,
  addCampaign: () => {},
});

// Create the provider component
interface CampaignProviderProps {
  children: ReactNode;
}

export const CampaignProvider: React.FC<CampaignProviderProps> = ({ children }) => {
  const [campaigns, setCampaigns] = useState<Campaign[]>(sampleCampaigns);

  const getCampaignById = (id: string): Campaign | undefined => {
    return campaigns.find(campaign => campaign.id === id);
  };

  const addCampaign = (campaign: Campaign): void => {
    setCampaigns(prevCampaigns => [...prevCampaigns, campaign]);
  };

  return (
    <CampaignContext.Provider value={{ campaigns, getCampaignById, addCampaign }}>
      {children}
    </CampaignContext.Provider>
  );
};

// Create a custom hook to use the campaign context
export const useCampaigns = (): CampaignContextType => {
  const context = useContext(CampaignContext);
  if (context === undefined) {
    throw new Error('useCampaigns must be used within a CampaignProvider');
  }
  return context;
};