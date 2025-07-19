import { BackendResponse } from "@/lib/BackendResponse";
import { ICampaignRepository } from "./ICampaignRepository";
import { Campaign, CreateCampaign } from "@/app/types/Campaign";
import { ABI_CAMPAIGN, ABI_FACTORY_CAMPAIGN } from "@/lib/ABIContracts";
import { ethers, parseUnits } from "ethers";
import { BrowserProvider } from "ethers";

const FACTORY_ADDRESS = process.env.NEXT_PUBLIC_FACTORY_ADDRESS!;

export class BlockchainCampaignRepository implements ICampaignRepository {

    async createCampaign(
        campaign: CreateCampaign,
        walletClient: ReturnType<typeof import("wagmi").useWalletClient>["data"]
    ): Promise<BackendResponse> {
        if (!walletClient) throw new Error("Wallet no conectada");

        const provider = new BrowserProvider(walletClient.transport as any);
        const signer = await provider.getSigner(walletClient.account.address);

        const factory = new ethers.Contract(FACTORY_ADDRESS, ABI_FACTORY_CAMPAIGN, signer);
        const parsedGoal = parseUnits(campaign.goal.toString(), 18);

        const tx = await factory.createCampaign(
            campaign.title,
            campaign.description,
            campaign.imageCID,
            parsedGoal,
            campaign.deadline,
            campaign.url
        );

        const receipt = await tx.wait();

        return {
            success: true,
            message: "Campaña creada exitosamente",
            data: { txHash: receipt.transactionHash }
        };
    }

    acceptCampaign(id: string): Promise<BackendResponse> {
        throw new Error("Method not implemented.");
    }
    cancelCampaign(id: string, reason: string): Promise<BackendResponse> {
        throw new Error("Method not implemented.");
    }
    getById(id: string): Promise<BackendResponse<Campaign | null>> {
        throw new Error("Method not implemented.");
    }
    async getAll(walletClient: ReturnType<typeof import("wagmi").useWalletClient>["data"]): Promise<Campaign[]> {
        try {
            if (!walletClient) throw new Error("Wallet no conectada");

            const provider = new BrowserProvider(walletClient.transport as any);
            const signer = await provider.getSigner(walletClient.account.address);

            const factory = new ethers.Contract(FACTORY_ADDRESS, ABI_FACTORY_CAMPAIGN, signer);
            const campaignAddresses: string[] = await factory.all();
            console.log("Campaign Addresses:", campaignAddresses);

            const campaigns: Campaign[] = await Promise.all(
                campaignAddresses.map(async (addr: string): Promise<Campaign> => {
                    const contract = new ethers.Contract(addr, ABI_CAMPAIGN, provider);
                    console.log("Contract Address:", addr);

                    const [
                        title,
                        description,
                        goal,
                        deadline,
                        creator,
                        status
                    ] = await Promise.all([
                        contract.title(),
                        contract.description(),
                        contract.goal(),
                        contract.deadline(),
                        contract.creator(),
                        contract.status()
                    ]);

                    console.log("Campaign Data:", {
                        title,
                        description,
                        goal: ethers.formatUnits(goal, 18),
                        deadline,
                        creator,
                        status
                    });

                    const endDate = new Date(Number(deadline) * 1000);
                    const today = new Date();
                    const daysLeft = Math.max(0, Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));

                    return {
                        id: addr,
                        title,
                        description,
                        fullDescription: description,
                        category: "", // cargar si está en el contrato
                        imageUrl: "", // cargar si está en el contrato
                        goal: Number(ethers.formatUnits(goal, 18)),
                        amountRaised: 0, // cargar si el contrato lo expone
                        createdAt: today, // opcional si no está onchain
                        endDate,
                        daysLeft,
                        donors: 0, // calcular si el contrato lo expone
                        creator,
                        walletAddress: addr,
                        isVerified: true, // opcional
                        status: status.toLowerCase(), // debería mapear a 'active' | 'revision' | etc.
                    };
                })
            );

            return campaigns;
        } catch (err) {
            console.error(err);
            return [];
        }
    }
    getPendingCampaigns(): Promise<BackendResponse<Campaign[]>> {
        throw new Error("Method not implemented.");
    }
    getCampaignsByCreator(creator: string): Promise<BackendResponse<Campaign[]>> {
        throw new Error("Method not implemented.");
    }
    rejectCampaign(id: string, reason: string): Promise<BackendResponse> {
        throw new Error("Method not implemented.");
    }
}
