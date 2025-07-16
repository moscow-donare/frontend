import { useContext } from "react";
import { ValidateCampaignContext } from "./ValidateCampaignsContext";

export const useValidateCampaignsModals = () => {
    const context = useContext(ValidateCampaignContext);
    if (!context) {
        throw new Error("useValidateCampaignsModals must be used within a ValidateCampaignProvider");
    }
    const { acceptModal, rejectModal, reviewModal } = context;

    // const openAcceptModal = () => acceptModal.onOpen();
    // const closeAcceptModal = () => acceptModal.onClose();   
    // const openRejectModal = () => rejectModal.onOpen();
    // const closeRejectModal = () => rejectModal.onClose();
    // const openCancelModal = () => cancelModal.onOpen();
    // const closeCancelModal = () => cancelModal.onClose();


    return {
        acceptModal,
        rejectModal,
        reviewModal,
    };

};
