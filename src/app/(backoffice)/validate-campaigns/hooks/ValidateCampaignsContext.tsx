"use client"

import { Campaign } from "@/app/types/Campaign";
import { useDisclosure } from "@heroui/react";
import { ReactNode, createContext, useEffect, useState } from "react";


interface ValidateCampaignType {
    acceptModal: ReturnType<typeof useDisclosure>;
    rejectModal: ReturnType<typeof useDisclosure>;
    reviewModal: ReturnType<typeof useDisclosure>;
    descriptionModal: ReturnType<typeof useDisclosure>;
    selectedCampaign: Campaign | null;
    setSelectedCampaign: (campaign: Campaign | null) => void;
    isLoaded: boolean;
    setIsLoaded: (loaded: boolean) => void;
}

export const ValidateCampaignContext = createContext<ValidateCampaignType | undefined>(undefined);

export const ValidateCampaignProvider = ({ children }: { children: ReactNode }) => {
    const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
    const acceptModal = useDisclosure();
    const rejectModal = useDisclosure();
    const reviewModal = useDisclosure();
    const descriptionModal = useDisclosure();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            await new Promise(resolve => setTimeout(resolve, 2000));
            setIsLoaded(true);
        };
        loadData();
    }, []);

    return (
        <ValidateCampaignContext.Provider value={{
            acceptModal,
            rejectModal,
            reviewModal,
            descriptionModal,
            selectedCampaign,
            setSelectedCampaign,
            isLoaded,
            setIsLoaded
        }}>
            {children}
        </ValidateCampaignContext.Provider>
    )


}