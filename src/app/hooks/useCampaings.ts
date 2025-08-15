import { STATE_NAME_TO_ID } from "@/shared/const/States";
import { BlockchainCampaignRepository } from "@/shared/repositories/Campaign/BlockchainCampaingRepository";
import { Campaign, CreateCampaign } from "../types/Campaign";
import { BackendCampaignRepository } from "@/shared/repositories/Campaign/HttpCampaignRepository";
import { useWeb3Auth } from "@web3auth/modal/react";



export const useCampaigns = () => {
    const { web3Auth } = useWeb3Auth(); // 👈 acceso al objeto Web3Auth
    // Todo: deberiamos tener una variable campaigns que se actualice cada vez que se crea una campaña
    // o se actualiza una campaña, para no tener que hacer un getAllCampaigns
    // Esto se puede hacer con un estado global o un contexto
    const repository = new BlockchainCampaignRepository();
    const backenRepository = new BackendCampaignRepository(web3Auth);

    const getCampaignById = async (id: number): Promise<Campaign | undefined> => {
        return await repository.getById(id);
    }

    const getAllCampaigns = async (): Promise<Campaign[]> => {       
        console.log("Fetching all campaigns from blockchain repository"); 
        return await repository.getAll();
    }
    
    const createCampaign = async (campaignData: CreateCampaign) => {
        return await backenRepository.createCampaign(campaignData);
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

    return {
        getCampaignById,
        getAllCampaigns,
        createCampaign,
        getPendingCampaigns
    };
}
