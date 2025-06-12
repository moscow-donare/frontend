"use client"

import React from 'react';
import Hero from '../../components/Hero';
import CampaignGrid from '../../components/CampaignGrid';
import BlockchainExplainer from '../../components/BlockchainExplainer';
import { useCampaigns } from '../../context/CampaignContext';

const HomePage: React.FC = () => {
  const { campaigns } = useCampaigns();
  
  // Filter featured campaigns (e.g., campaigns with highest donation percentage)
  const featuredCampaigns = campaigns
    .filter(campaign => campaign.isVerified)
    .sort((a, b) => (b.amountRaised / b.goal) - (a.amountRaised / a.goal))
    .slice(0, 6);
  
  // Filter urgent campaigns (e.g., campaigns with least days left)
  const urgentCampaigns = campaigns
    .sort((a, b) => a.daysLeft - b.daysLeft)
    .slice(0, 3);
  
  return (
    <div>
      <Hero />
      <CampaignGrid 
        campaigns={featuredCampaigns}
        title="Campañas Destacadas"
        description="Proyectos verificados que están haciendo un impacto real en la comunidad"
      />
      
      <BlockchainExplainer />
      
      <section className="py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Campañas Urgentes</h2>
            <p className="text-gray-600">Estas campañas necesitan tu apoyo pronto</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {urgentCampaigns.map((campaign) => (
              <div key={campaign.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-4 border-l-4 border-red-500">
                  <h3 className="font-medium text-gray-900 mb-1">{campaign.title}</h3>
                  <div className="flex justify-between text-sm">
                    <span className="text-red-600 font-medium">
                      {campaign.daysLeft === 0 ? 'Último día' : `${campaign.daysLeft} días restantes`}
                    </span>
                    <span className="text-gray-500">
                      ${campaign.amountRaised.toLocaleString()} de ${campaign.goal.toLocaleString()}
                    </span>
                  </div>
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-red-500 h-2 rounded-full" 
                      style={{ width: `${Math.min((campaign.amountRaised / campaign.goal) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;