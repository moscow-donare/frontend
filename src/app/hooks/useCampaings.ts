import { BlockchainCampaignRepository } from "@/lib/repositories/Campaign/BlockchainCampaingRepository";
import { useWalletClient } from "wagmi";
import { Campaign, CreateCampaign } from "../types/Campaign";
import { STATE_NAME_TO_ID } from "@/lib/const/States";

export const useCampaigns = () => {
    // Todo: deberiamos tener una variable campaigns que se actualice cada vez que se crea una campaña
    // o se actualiza una campaña, para no tener que hacer un getAllCampaigns
    // Esto se puede hacer con un estado global o un contexto
    const { data: wallet } = useWalletClient();
    const repository = new BlockchainCampaignRepository();

    const getCampaignById = async (id: number): Promise<Campaign | undefined> => {
        return await repository.getById(id);
    }

    const getAllCampaigns = async (): Promise<Campaign[]> => {       
        console.log("Fetching all campaigns from blockchain repository"); 
        return await repository.getAll();
    }
    
    const createCampaign = async (campaignData: CreateCampaign) => {
        return await repository.createCampaign(campaignData, wallet);
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
        return await repository.getAllByUser(wallet!.account.address);
    }

    return {
        getCampaignById,
        getAllCampaigns,
        createCampaign,
        getPendingCampaigns,
        getCampaignsByCreator,
    };
}
