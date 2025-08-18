"use client"

import React, { useEffect } from 'react';
import Hero from './components/Hero';
import CampaignGrid from './components/CampaignGrid';
import { Campaign } from '@/app/types/Campaign';
import { useCampaigns } from '@/app/hooks/useCampaings';

const HomePage: React.FC = () => {
  const { getAllCampaigns } = useCampaigns();
  const [campaigns, setCampaigns] = React.useState<Campaign[]>([]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      const allCampaigns = await getAllCampaigns();
      const campaings = allCampaigns.filter(c => c.status == 2);
      setCampaigns(campaings);
    };
    fetchCampaigns();
  }, []);

  return (
    <>
      <Hero />
      <CampaignGrid
        campaigns={campaigns}
        title="Campañas Destacadas"
        description="Proyectos verificados que están haciendo un impacto real en la comunidad"
      />
    </>
  );
};

export default HomePage;