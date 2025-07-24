import { BlockchainCampaignRepository } from "@/lib/repositories/Campaign/BlockchainCampaingRepository";
import { Campaign, CreateCampaign } from "../types/Campaign";
import { useWalletClient } from "wagmi";

export type CategoryType = {
    id: number,
    name: string
}

export const CATEGORIES: CategoryType[] = [
    {
        id: 0,
        name: 'Salud'
    },
    {
        id: 1,
        name: 'Educación'
    },
    {
        id: 2,
        name: 'Emergencia'
    },
    {
        id: 3,
        name: 'Rifa'
    },
    {
        id: 4,
        name: 'Proyecto'
    }
];

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

    const getCategoryById = (id: number): CategoryType | null => {
        return CATEGORIES.find((category) => category.id === id) ?? null;
    }

    return {
        getCampaignById,
        getAllCampaigns,
        createCampaign,
        getCategoryById
    };
}
