"use client"

import { useDisclosure } from "@heroui/react";
import { ReactNode, createContext } from "react";


interface ValidateCampaignType {
    acceptModal: ReturnType<typeof useDisclosure>;
    rejectModal: ReturnType<typeof useDisclosure>;
    reviewModal: ReturnType<typeof useDisclosure>;
    descriptionModal: ReturnType<typeof useDisclosure>;
}

export const ValidateCampaignContext = createContext<ValidateCampaignType | undefined>(undefined);

export const ValidateCampaignProvider = ({ children }: { children: ReactNode }) => {
    const acceptModal = useDisclosure();
    const rejectModal = useDisclosure();
    const reviewModal = useDisclosure();
    const descriptionModal = useDisclosure();

    return (
        <ValidateCampaignContext.Provider value={{
            acceptModal,
            rejectModal,
            reviewModal,
            descriptionModal,
        }}>
            {children}
        </ValidateCampaignContext.Provider>
    )


}