"use client"

import React, { useEffect } from 'react';
import Hero from './components/Hero';
import CampaignGrid from './components/CampaignGrid';
import { Campaign } from '@/app/types/Campaign';
import { useCampaigns } from '@/app/hooks/useCampaings';

const HomePage: React.FC = () => {
  const { getAllCampaigns } = useCampaigns();
  const [campaigns, setCampaigns] = React.useState<Campaign[]>([]);
  const featuredCampaigns = campaigns
    .sort((a: Campaign, b: Campaign) => (b.amountRaised / b.goal) - (a.amountRaised / a.goal))
    .slice(0, 6);

  useEffect(() => {
    const fetchCampaigns = async () => {
      const allCampaigns = await getAllCampaigns();
      console.log('campañas', allCampaigns)
      setCampaigns(allCampaigns);
    };
    fetchCampaigns();
  }, []);

  return (
    <>
      <Hero />
      <CampaignGrid
        campaigns={featuredCampaigns}
        title="Campañas Destacadas"
        description="Proyectos verificados que están haciendo un impacto real en la comunidad"
      />
    </>
  );
};

export default HomePage;