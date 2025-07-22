"use client"

import { BlockchainCampaignRepository } from "@/lib/repositories/Campaign/BlockchainCampaingRepository";
import { useEffect } from "react";
import { useWalletClient } from "wagmi";

export default function CampaignsPage() {
  
  const { data: walletClient } = useWalletClient(); // ✅ fuera del handler
  const blockchainCampaingRepository = new BlockchainCampaignRepository();

  const handleGetCampaign = async () => {
    const campaignsCreated = await blockchainCampaingRepository.getAll(walletClient);
    console.log("✅ Campañas obtenidas:", campaignsCreated);
  };

  useEffect(() => {
    if (walletClient) {
      handleGetCampaign();
    }
  }, [walletClient]);

  return (
    <div>
      <h1>Campaigns Page</h1>
      {/* Add your campaign components here */}
    </div>
  );
}