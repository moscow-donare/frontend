"use client"
import { Campaign } from "@/app/types/Campaign";
import { useDisclosure } from "@heroui/react";
import { createContext, ReactNode, useState } from "react";

type DashboardContextType = {
  // Define the types for the context here
  campaigns: Campaign[];
  setCampaigns: (campaigns: Campaign[]) => void;
  selectedCampaign: Campaign | null;
  setSelectedCampaign: (campaign: Campaign | null) => void;
  pendingChangeModal: ReturnType<typeof useDisclosure>;
  cancelledModal: ReturnType<typeof useDisclosure>;
};


export const DashboardContext = createContext<DashboardContextType | undefined>(undefined)

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
    const pendingChangeModal = useDisclosure();
    const cancelledModal = useDisclosure();
    return (
        <DashboardContext.Provider value={{
            campaigns,
            setCampaigns,
            selectedCampaign,
            setSelectedCampaign,
            pendingChangeModal,
            cancelledModal
        }}>
            {children}
        </DashboardContext.Provider>
    )

}