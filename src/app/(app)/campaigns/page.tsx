"use client"

import { useCampaigns } from "@/app/hooks/useCampaings";
import { useEffect } from "react";

export default function CampaignsPage() {
  const { getAllCampaigns } = useCampaigns(); // Hook para acceder al contexto de campañas

  const handleGetCampaign = async () => {
    const campaigns = await getAllCampaigns();
    console.log("Campaigns:", campaigns);
  };

  useEffect(() => {
    console.log("Fetching campaigns...");
    handleGetCampaign();
  }, []);

  return (
    <div>
      <h1>Campaigns Page</h1>
      {/* Add your campaign components here */}
    </div>
  );
}