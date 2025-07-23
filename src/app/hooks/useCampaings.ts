import { BlockchainCampaignRepository } from "@/lib/repositories/Campaign/BlockchainCampaingRepository";
import { Campaign, CreateCampaign } from "../types/Campaign";
import { useWalletClient } from "wagmi";

export const useCampaigns = () => {
    // Todo: deberiamos tener una variable campaigns que se actualice cada vez que se crea una campaña
    // o se actualiza una campaña, para no tener que hacer un getAllCampaigns
    // Esto se puede hacer con un estado global o un contexto
    const { data: wallet } = useWalletClient();
    const repository = new BlockchainCampaignRepository();

    const getCampaignById = async (id: number): Promise<Campaign | undefined> => {
        const campaigns = await repository.getAll();
        const filtered = campaigns.filter(campaign => campaign.id == id);
        return filtered.length > 0 ? filtered[0] : undefined;
    }

    const getAllCampaigns = async (): Promise<Campaign[]> => {       
        console.log("Fetching all campaigns from blockchain repository"); 
        return await repository.getAll();
    }
    
    const createCampaign = async (campaignData: CreateCampaign) => {
        return await repository.createCampaign(campaignData, wallet);
    }

    return {
        getCampaignById,
        getAllCampaigns,
        createCampaign
    };
}
