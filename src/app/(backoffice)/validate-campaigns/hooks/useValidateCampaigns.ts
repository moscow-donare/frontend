import { useContext } from "react";
import { ValidateCampaignContext } from "./ValidateCampaignsContext";
import { CampaignService } from "@/services/CampaignService";
// import { ManualValidationService } from "@/app/services/ManualValidationService";

export const useValidateCampaigns = () => {
    const context = useContext(ValidateCampaignContext);
    if (!context) {
        throw new Error("useValidateCampaigns must be used within a ValidateCampaignProvider");
    }

    const { selectedCampaign, isLoaded, setIsLoaded, setSelectedCampaign, campaigns } = context;

    const sendCancelValidation = async (campaignId: string, reason: string) => {
        // Simulate an API call to cancel the campaign
        setIsLoaded(true); // Set loading state to true while processing
        try {
            await CampaignService.cancelCampaign(campaignId, reason);
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log(`Campaign ${campaignId} canceled for reason: ${reason}`);
            setSelectedCampaign(null);
        } catch (error) {
            console.error(`Error rejecting campaign ${campaignId}:`, error);
        } finally {
            setIsLoaded(false); // Reset loading state after the operation
        }

    } 

    const sendAcceptValidation = async (campaignId: string) => {
        // Simulate an API call to accept the campaign
        setIsLoaded(true); // Set loading state to true while processing
        try {
            await CampaignService.acceptCampaign(campaignId);
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log(`Campaign ${campaignId} accepted`);
            setSelectedCampaign(null);
        } catch (error) {
            console.error(`Error accepting campaign ${campaignId}:`, error);
        } finally {
            setIsLoaded(false); // Reset loading state after the operation
        }
    }

    const sendReviewValidation = async (campaignId: string, review: string) => {
        // Simulate an API call to review the campaign
        setIsLoaded(true); // Set loading state to true while processing
        try {
            await CampaignService.rejectCampaign(campaignId, review);
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log(`Campaign ${campaignId} reviewed with comment: ${review}`);
            setSelectedCampaign(null);
        } catch (error) {
            console.error(`Error reviewing campaign ${campaignId}:`, error);
        } finally {
            setIsLoaded(false); // Reset loading state after the operation
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