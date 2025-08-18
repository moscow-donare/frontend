import { useContext } from "react";
import { ValidateCampaignContext } from "./ValidateCampaignsContext";
import { CampaignService } from "@/services/CampaignService";
import { useValidateCampaignsModals } from "./useValidateCampaignsModals";
import { useCampaigns } from "@/app/hooks/useCampaings";
// import { ManualValidationService } from "@/app/services/ManualValidationService";

export const useValidateCampaigns = () => {
    const context = useContext(ValidateCampaignContext);
    if (!context) {
        throw new Error("useValidateCampaigns must be used within a ValidateCampaignProvider");
    }

    const { selectedCampaign, isLoaded, setIsLoaded, setSelectedCampaign, campaigns, setCampaigns } = context;
    const { cancelModal, acceptModal, reviewModal } = useValidateCampaignsModals();
    const { getPendingCampaigns } = useCampaigns();
    const sendCancelValidation = async (reason: string) => {
        // Simulate an API call to cancel the campaign
        setIsLoaded(false); // Set loading state to true while processing
        try {
            await CampaignService.cancelCampaign(selectedCampaign?.address, reason);
            console.log(`Campaign ${selectedCampaign?.address} canceled for reason: ${reason}`);
            setSelectedCampaign(null);
            cancelModal.onClose();
            loadCampaigns(); // Reload campaigns after review
        } catch (error) {
            setIsLoaded(true); // Reset loading state after the operation
            console.error(`Error rejecting campaign ${selectedCampaign?.address}:`, error);
        }

    } 

    const sendAcceptValidation = async () => {
        // Simulate an API call to accept the campaign
        setIsLoaded(false); // Set loading state to true while processing
        try {
            await CampaignService.acceptCampaign(selectedCampaign?.address, "campaña aceptada");
            console.log(`Campaign ${selectedCampaign.id} accepted`);
            setSelectedCampaign(null);
            acceptModal.onClose();
            loadCampaigns(); // Reload campaigns after review
        } catch (error) {
            setIsLoaded(true); // Reset loading state after the operation
            console.error(`Error accepting campaign ${selectedCampaign.id}:`, error);
        } 
    }

    const sendReviewValidation = async (review: string) => {
        // Simulate an API call to review the campaign
        setIsLoaded(false); // Set loading state to true while processing
        
        try {
            await CampaignService.requestChanges(selectedCampaign?.address, review);
            console.log(`Campaign ${selectedCampaign?.address} reviewed with comment: ${review}`);
            setSelectedCampaign(null);
            reviewModal.onClose();
            loadCampaigns(); // Reload campaigns after review
        } catch (error) {
            setIsLoaded(true);
            console.error(`Error reviewing campaign ${selectedCampaign?.address}:`, error);
        }
    }

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
    

    return {
        selectedCampaign,
        isLoaded,
        sendCancelValidation,
        sendAcceptValidation,
        sendReviewValidation,
        setSelectedCampaign,
        campaigns,
        loadCampaigns
    }

}