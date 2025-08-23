import { STATE_NAME_TO_ID } from "@/shared/const/States";
// import { BlockchainCampaignRepository } from "@/shared/repositories/Campaign/BlockchainCampaingRepository";
import { Campaign, CreateCampaign } from "../types/Campaign";
import { BackendCampaignRepository } from "@/shared/repositories/Campaign/HttpCampaignRepository";
import { AsyncResult } from "@/shared/Result";

export const useCampaigns = () => {
    // const repository = new BlockchainCampaignRepository();
    const backendRepository = new BackendCampaignRepository();

    const getCampaignById = async (id: number): AsyncResult<Campaign | null> => {
        return await backendRepository.getById(id);
    }

    const getAllCampaigns = async (): Promise<Campaign[]> => {
        return await backendRepository.getAll();
    }
    
    const createCampaign = async (campaignData: CreateCampaign) => {
        return await backendRepository.createCampaign(campaignData);
    }

    // DEJAR ESTA FUNCION POR SI VAMOS A AGREGAR MAS CATEGORIAS A FUTURO Y NO LA DEJAMOS FIJAS
    // const getCategoryById = (id: number): CategoryType | null => {
    //     return CATEGORIES.find((category) => category.id === id) ?? null;
    // }

    const getPendingCampaigns = async () => {
        const campaigns = await getAllCampaigns();
        const filteredCampaigns = campaigns.filter(campaign => campaign.status === STATE_NAME_TO_ID.IN_REVIEW);
        return filteredCampaigns;
    }

    const getCampaignsByCreator = async () => {
        return await backendRepository.getAllByCreator();
    }

    return {
        getCampaignById,
        getAllCampaigns,
        createCampaign,
        getPendingCampaigns,
        getCampaignsByCreator,
    };
}
