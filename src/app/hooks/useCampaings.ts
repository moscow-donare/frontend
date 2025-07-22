import { BlockchainCampaignRepository } from "@/lib/repositories/Campaign/BlockchainCampaingRepository";
import { Campaign, CreateCampaign } from "../types/Campaign";
import { useWalletClient } from "wagmi";

export const useCampaigns = () => {
    const { data: wallet } = useWalletClient();
    const repository = new BlockchainCampaignRepository();

    const getCampaignById = async (id: number): Promise<Campaign | undefined> => {
        const campaigns = await repository.getAll();
        const filtered = campaigns.filter(campaign => campaign.id == id);
        return filtered.length > 0 ? filtered[0] : undefined;
    }

    const getAllCampaigns = async (): Promise<Campaign[]> => {        
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
