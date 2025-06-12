"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Campaign } from '../types/Campaign';

// Sample campaign data
const sampleCampaigns: Campaign[] = [
  {
    id: '1',
    title: 'Ayuda para tratamiento de cáncer',
    description: 'Recaudación de fondos para cubrir los gastos médicos de un tratamiento oncológico urgente.',
    fullDescription: 'María necesita someterse a un tratamiento oncológico especializado que no está cubierto por su seguro médico. Los fondos recaudados se utilizarán para cubrir los gastos médicos, medicamentos y terapias complementarias necesarias para su recuperación. Tu apoyo puede marcar la diferencia en su lucha contra el cáncer.',
    category: 'Salud',
    imageUrl: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    goal: 15000,
    amountRaised: 8750,
    createdAt: new Date(2025, 2, 10),
    endDate: new Date(2025, 5, 10),
    daysLeft: 42,
    donors: 124,
    creator: 'María López',
    creatorImageUrl: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    walletAddress: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
    isVerified: true
  },
  {
    id: '2',
    title: 'Rifa solidaria para escuela rural',
    description: 'Participa en nuestra rifa solidaria para equipar con tecnología a una escuela rural.',
    fullDescription: 'La Escuela Rural San José necesita urgentemente equipos informáticos para que sus estudiantes puedan acceder a educación digital de calidad. Con esta rifa solidaria buscamos recaudar fondos para adquirir 10 computadoras, una impresora multifuncional y material didáctico. El sorteo se realizará el último día de la campaña y el ganador recibirá un iPad Pro de última generación.',
    category: 'Rifa',
    imageUrl: 'https://images.pexels.com/photos/8535224/pexels-photo-8535224.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    goal: 5000,
    amountRaised: 3200,
    createdAt: new Date(2025, 2, 15),
    endDate: new Date(2025, 3, 15),
    daysLeft: 15,
    donors: 78,
    creator: 'Fundación Educar',
    walletAddress: '0x59D3445d1A91f8470eFd8105c2166d095FBb6047',
    isVerified: true
  },
  {
    id: '3',
    title: 'Proyecto de energía renovable comunitaria',
    description: 'Implementación de paneles solares para una comunidad sin acceso a electricidad.',
    fullDescription: 'Este proyecto busca instalar paneles solares en una comunidad de 25 familias que actualmente no tienen acceso a electricidad confiable. Los fondos se utilizarán para la compra e instalación de equipos, capacitación a la comunidad para su mantenimiento y seguimiento durante los primeros 6 meses. Esta solución proporcionará energía limpia y sustentable, mejorando significativamente la calidad de vida de estas familias.',
    category: 'Proyecto',
    imageUrl: 'https://images.pexels.com/photos/9875441/pexels-photo-9875441.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    goal: 25000,
    amountRaised: 12800,
    createdAt: new Date(2025, 1, 5),
    endDate: new Date(2025, 4, 5),
    daysLeft: 25,
    donors: 145,
    creator: 'Energía para Todos',
    walletAddress: '0x8ba1f109551bD432803012645Ac136ddd64DBA72',
    isVerified: true
  },
  {
    id: '4',
    title: 'Ayuda de emergencia por inundaciones',
    description: 'Recaudación para proporcionar ayuda inmediata a familias afectadas por las recientes inundaciones.',
    fullDescription: 'Las recientes lluvias torrenciales han provocado graves inundaciones que han dejado a más de 100 familias sin hogar. Esta campaña busca recaudar fondos para proporcionar alimentos, agua potable, ropa, artículos de higiene y alojamiento temporal a los damnificados. Tu apoyo es crucial para ayudar a estas familias a recuperarse de esta devastadora situación.',
    category: 'Emergencia',
    imageUrl: 'https://images.pexels.com/photos/1059083/pexels-photo-1059083.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    goal: 10000,
    amountRaised: 9800,
    createdAt: new Date(2025, 2, 25),
    endDate: new Date(2025, 3, 10),
    daysLeft: 7,
    donors: 320,
    creator: 'Cruz Roja Local',
    walletAddress: '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
    isVerified: true
  },
  {
    id: '5',
    title: 'Becas para estudiantes de bajos recursos',
    description: 'Programa de becas para jóvenes talentosos que no pueden costear estudios universitarios.',
    fullDescription: 'Nuestro programa de becas busca apoyar a 10 estudiantes destacados de comunidades de bajos recursos para que puedan acceder a educación universitaria de calidad. Los fondos cubrirán matrículas, materiales educativos, transporte y un estipendio mensual durante el primer año de estudios. Cada estudiante seleccionado demostrará excelencia académica y compromiso comunitario.',
    category: 'Educación',
    imageUrl: 'https://images.pexels.com/photos/6146970/pexels-photo-6146970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    goal: 20000,
    amountRaised: 5600,
    createdAt: new Date(2025, 2, 1),
    endDate: new Date(2025, 5, 1),
    daysLeft: 32,
    donors: 78,
    creator: 'Fundación Educando Futuros',
    walletAddress: '0x90F79bf6EB2c4f870365E785982E1f101E93b906',
    isVerified: true
  },
  {
    id: '6',
    title: 'Equipamiento para centro comunitario',
    description: 'Adquisición de equipos deportivos y educativos para un centro comunitario juvenil.',
    fullDescription: 'El Centro Comunitario Juventud Activa necesita equipar sus instalaciones para ofrecer actividades deportivas y educativas a más de 200 jóvenes en situación de vulnerabilidad. Los fondos se destinarán a la compra de equipos deportivos, instrumentos musicales, computadoras para talleres digitales y material para talleres artísticos. Este equipamiento permitirá ampliar la oferta de actividades y beneficiar a más jóvenes de la comunidad.',
    category: 'Proyecto',
    imageUrl: 'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    goal: 8000,
    amountRaised: 2200,
    createdAt: new Date(2025, 2, 20),
    endDate: new Date(2025, 4, 20),
    daysLeft: 27,
    donors: 45,
    creator: 'Centro Juventud Activa',
    walletAddress: '0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65',
    isVerified: false
  },
  {
    id: '7',
    title: 'Tratamiento dental para niños',
    description: 'Campaña para proporcionar tratamientos dentales gratuitos a niños de familias sin recursos.',
    fullDescription: 'Esta campaña busca financiar tratamientos dentales completos para 50 niños de familias sin recursos económicos. Los tratamientos incluirán revisiones, limpiezas, empastes, extracciones y tratamientos preventivos. También se realizarán talleres educativos sobre higiene bucal para los niños y sus familias. Tu apoyo contribuirá a mejorar la salud bucal y la calidad de vida de estos niños.',
    category: 'Salud',
    imageUrl: 'https://images.pexels.com/photos/6502318/pexels-photo-6502318.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    goal: 12000,
    amountRaised: 3500,
    createdAt: new Date(2025, 2, 5),
    endDate: new Date(2025, 4, 5),
    daysLeft: 20,
    donors: 62,
    creator: 'Sonrisas Saludables',
    walletAddress: '0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc',
    isVerified: true
  },
  {
    id: '8',
    title: 'Rifa solidaria - Viaje al Caribe',
    description: 'Participa en nuestra rifa solidaria y gana un viaje todo incluido para dos personas al Caribe.',
    fullDescription: 'Esta rifa solidaria tiene como premio principal un viaje todo incluido para dos personas a un resort 5 estrellas en el Caribe, con 7 noches de alojamiento, vuelos incluidos y excursiones. Los fondos recaudados se destinarán íntegramente a nuestro programa de protección de tortugas marinas, que incluye patrullaje de playas, rescate de nidos y educación ambiental. El sorteo se realizará el último día de la campaña ante notario.',
    category: 'Rifa',
    imageUrl: 'https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    goal: 15000,
    amountRaised: 9800,
    createdAt: new Date(2025, 2, 15),
    endDate: new Date(2025, 4, 15),
    daysLeft: 22,
    donors: 245,
    creator: 'Fundación Océano Vivo',
    walletAddress: '0x976EA74026E726554dB657fA54763abd0C3a0aa9',
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