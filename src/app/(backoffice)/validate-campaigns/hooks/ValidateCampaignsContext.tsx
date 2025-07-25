"use client"

import { CampaignService } from "@/services/CampaignService";
import { Campaign } from "@/app/types/Campaign";
import { useDisclosure } from "@heroui/react";
import { ReactNode, createContext, useEffect, useState } from "react";
import { useCampaigns } from "@/app/hooks/useCampaings";

interface ValidateCampaignType {
    acceptModal: ReturnType<typeof useDisclosure>;
    cancelModal: ReturnType<typeof useDisclosure>;
    reviewModal: ReturnType<typeof useDisclosure>;
    descriptionModal: ReturnType<typeof useDisclosure>;
    selectedCampaign: Campaign | null;
    setSelectedCampaign: (campaign: Campaign | null) => void;
    isLoaded: boolean;
    setIsLoaded: (loaded: boolean) => void;
    campaigns: Campaign[];
    setCampaigns: (campaigns: Campaign[]) => void;
}

export const ValidateCampaignContext = createContext<ValidateCampaignType | undefined>(undefined);

export const ValidateCampaignProvider = ({ children }: { children: ReactNode }) => {
    const { getPendingCampaigns } = useCampaigns();
    const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const acceptModal = useDisclosure();
    const cancelModal = useDisclosure();
    const reviewModal = useDisclosure();
    const descriptionModal = useDisclosure();
    const loadCampaigns = async () => {
        setIsLoaded(false); // Reset loading state before fetching campaigns
        try {
            const response = await getPendingCampaigns();
            console.log("Campaigns loaded:", response);
            setCampaigns(response); // Set campaigns to the fetched data
            console.log("Campaigns loaded");
        } catch (error) {
            console.error("Error loading campaigns:", error);
        } finally {
            setIsLoaded(true); // Reset loading state after fetching campaigns
        }
    };

    useEffect(() => {
        loadCampaigns();
    }, []);

    return (
        <ValidateCampaignContext.Provider value={{
            acceptModal,
            cancelModal,
            reviewModal,
            descriptionModal,
            selectedCampaign,
            setSelectedCampaign,
            isLoaded,
            setIsLoaded,
            campaigns,
            setCampaigns
        }}>
            {children}
        </ValidateCampaignContext.Provider>
    )


}