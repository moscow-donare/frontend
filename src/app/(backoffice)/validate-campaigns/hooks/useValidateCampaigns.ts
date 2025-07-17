import { useContext } from "react";
import { ValidateCampaignContext } from "./ValidateCampaignsContext";

export const useValidateCampaigns = () => {

    const context = useContext(ValidateCampaignContext);
    if (!context) {
        throw new Error("useValidateCampaigns must be used within a ValidateCampaignProvider");
    }

    const { selectedCampaign, isLoaded, setIsLoaded, setSelectedCampaign } = context;


    const sendRejectValidation = async (campaignId: string, reason: string) => {
        // Simulate an API call to reject the campaign
        setIsLoaded(true); // Set loading state to true while processing
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log(`Campaign ${campaignId} rejected for reason: ${reason}`);
    setSelectedCampaign(null);
        setIsLoaded(false); // Reset loading state after the operation
    } 

    const sendAcceptValidation = async (campaignId: string) => {
        // Simulate an API call to accept the campaign
        setIsLoaded(true); // Set loading state to true while processing
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log(`Campaign ${campaignId} accepted`);
        setSelectedCampaign(null);  
        setIsLoaded(false); // Reset loading state after the operation
    }

    const sendReviewValidation = async (campaignId: string, review: string) => {
        // Simulate an API call to review the campaign
        setIsLoaded(true); // Set loading state to true while processing
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log(`Campaign ${campaignId} reviewed with comment: ${review}`);
        setSelectedCampaign(null);
        setIsLoaded(false); // Reset loading state after the operation
    }


    return {
        sendRejectValidation,
        selectedCampaign,
        isLoaded,
        sendAcceptValidation,
        sendReviewValidation,
        setSelectedCampaign
    }

}