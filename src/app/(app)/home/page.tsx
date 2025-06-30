"use client"

import React from 'react';
import Hero from './components/Hero';
import CampaignGrid from './components/CampaignGrid';
import { useCampaigns } from '../../context/CampaignContext';

const HomePage: React.FC = () => {
  const { campaigns } = useCampaigns();
  
  const featuredCampaigns = campaigns
    .sort((a, b) => (b.amountRaised / b.goal) - (a.amountRaised / a.goal))
    .slice(0, 6);
  
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