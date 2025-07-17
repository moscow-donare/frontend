import { useContext } from "react";
import { ValidateCampaignContext } from "./ValidateCampaignsContext";
import { Campaign } from "@/app/types/Campaign";

export const useValidateCampaignsModals = () => {
    const context = useContext(ValidateCampaignContext);
    if (!context) {
        throw new Error("useValidateCampaignsModals must be used within a ValidateCampaignProvider");
    }
    const { acceptModal, rejectModal, reviewModal, descriptionModal, setSelectedCampaign } = context;

    const openDescriptionModal = (campaign: Campaign) => {
        setSelectedCampaign(campaign);
        descriptionModal.onOpen();
    };

    return {
        acceptModal,
        rejectModal,
        reviewModal,
        descriptionModal,
        openDescriptionModal
    };

};
