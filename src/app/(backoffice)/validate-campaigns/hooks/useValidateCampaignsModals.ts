import { useContext } from "react";
import { ValidateCampaignContext } from "./ValidateCampaignsContext";
import { Campaign } from "@/app/types/Campaign";

export const useValidateCampaignsModals = () => {
    const context = useContext(ValidateCampaignContext);
    if (!context) {
        throw new Error("useValidateCampaignsModals must be used within a ValidateCampaignProvider");
    }
    const { acceptModal, cancelModal, reviewModal, descriptionModal, setSelectedCampaign } = context;

    const openDescriptionModal = (campaign: Campaign) => {
        setSelectedCampaign(campaign);
        descriptionModal.onOpen();
    };

    const openCancelModal = (campaign: Campaign) => {
        setSelectedCampaign(campaign);
        cancelModal.onOpen();
    };

    const openReviewModal = (campaign: Campaign) => {
        setSelectedCampaign(campaign);
        reviewModal.onOpen();
    };

    const openAcceptModal = (campaign: Campaign) => {
        setSelectedCampaign(campaign);
        acceptModal.onOpen();
    };

    return {
        acceptModal,
        cancelModal,
        reviewModal,
        descriptionModal,
        openDescriptionModal,
        openCancelModal,
        openReviewModal,
        openAcceptModal
    };

};
