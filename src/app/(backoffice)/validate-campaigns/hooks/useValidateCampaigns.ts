import { useContext } from "react";
import { ValidateCampaignContext } from "./ValidateCampaignsContext";
import { CampaignService } from "@/services/CampaignService";

export const useValidateCampaigns = () => {
    const context = useContext(ValidateCampaignContext);
    if (!context) {
        throw new Error("useValidateCampaigns must be used within a ValidateCampaignProvider");
    }

    const { selectedCampaign, isLoaded, setIsLoaded, setSelectedCampaign, campaigns } = context;

    const sendCancelValidation = async (reason: string) => {
        // Simulate an API call to cancel the campaign
        setIsLoaded(false); // Set loading state to true while processing
        try {
            await CampaignService.cancelCampaign(selectedCampaign!.address, reason);
            console.log(`Campaign ${selectedCampaign!.address} canceled for reason: ${reason}`);
            setSelectedCampaign(null);
        } catch (error) {
            console.error(`Error rejecting campaign ${selectedCampaign!.address}:`, error);
        } finally {
            setIsLoaded(true); // Reset loading state after the operation
        }

    } 

    const sendAcceptValidation = async () => {
        // Simulate an API call to accept the campaign
        setIsLoaded(false); // Set loading state to true while processing
        try {
            // TODO: Agregar quien acepto la campaña o algun otro mensaje relevente que le sirva al creador
            await CampaignService.acceptCampaign(selectedCampaign!.address, "Campaña aceptada");
            console.log(`Campaign ${selectedCampaign!.id} accepted`);
            setSelectedCampaign(null);
        } catch (error) {
            console.error(`Error accepting campaign ${selectedCampaign!.id}:`, error);
        } finally {
            setIsLoaded(true); // Reset loading state after the operation
        }
    }

    const sendReviewValidation = async (review: string) => {
        // Simulate an API call to review the campaign
        setIsLoaded(false); // Set loading state to true while processing
        
        try {
            await CampaignService.requestChanges(selectedCampaign!.address, review);
            console.log(`Campaign ${selectedCampaign!.address} reviewed with comment: ${review}`);
            setSelectedCampaign(null);
        } catch (error) {
            console.error(`Error reviewing campaign ${selectedCampaign!.address}:`, error);
        } finally {
            setIsLoaded(true); // Reset loading state after the operation
        }
    }


    return {
        selectedCampaign,
        isLoaded,
        sendCancelValidation,
        sendAcceptValidation,
        sendReviewValidation,
        setSelectedCampaign,
        campaigns
    }

}