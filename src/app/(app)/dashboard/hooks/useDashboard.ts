"use client"

import { useCampaigns } from '@/app/hooks/useCampaings';
import { DashboardContext } from '../context/DashboardContext';
import { useContext } from 'react';
import { Campaign } from '@/app/types/Campaign';

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }

  const { campaigns, setCampaigns, selectedCampaign, setSelectedCampaign } = context;
  const { getCampaignsByCreator } = useCampaigns();

  const fetchData = async () => {
    const campaigns = await getCampaignsByCreator();
    setCampaigns(campaigns);
  }

  const selectCampaign = (campaign: Campaign | null) => {
    setSelectedCampaign(campaign);
  }

  return {
    fetchData,
    campaigns,
    selectedCampaign,
    selectCampaign
  };
};
