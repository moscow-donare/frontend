import { BackendResponse } from "@/lib/BackendResponse";
import { ICampaignRepository } from "./ICampaignRepository";
import { Campaign, CreateCampaign } from "@/app/types/Campaign";
import { ABI_CAMPAIGN, ABI_FACTORY_CAMPAIGN } from "@/lib/ABIContracts";
import { ethers, parseUnits } from "ethers";
import { BrowserProvider } from "ethers";

const FACTORY_ADDRESS = process.env.NEXT_PUBLIC_FACTORY_ADDRESS!;
const OWNER_ADDRESS = process.env.NEXT_PUBLIC_OWNER_ADDRESS!;

export class BlockchainCampaignRepository implements ICampaignRepository {
  async createCampaign(
    campaign: CreateCampaign,
    walletClient: ReturnType<typeof import("wagmi").useWalletClient>["data"]
  ): Promise<BackendResponse> {
    if (!walletClient) throw new Error("Wallet no conectada");

    const provider = new BrowserProvider(walletClient.transport as any);
    const signer = await provider.getSigner(walletClient.account.address);

    const factory = new ethers.Contract(
      FACTORY_ADDRESS,
      ABI_FACTORY_CAMPAIGN,
      signer
    );
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
      data: { txHash: receipt.transactionHash },
    };
  }

  async acceptCampaign(address: string, reason:string): Promise<BackendResponse> {
 
    const provider = new ethers.JsonRpcProvider("http://localhost:8545"); // or your RPC URL
    const signer = await provider.getSigner(OWNER_ADDRESS);
    
    const factory = new ethers.Contract(
      address,
      ABI_CAMPAIGN,
      signer
    );
    const tx = await factory.approveCampaign(reason);
    const receipt = await tx.wait();

    return {
      success: true,
      message: "Campaña aceptada exitosamente",
      data: { txHash: receipt.transactionHash },
    };


  }

  async cancelCampaign(address: string, reason:string): Promise<BackendResponse> {
 
    const provider = new ethers.JsonRpcProvider("http://localhost:8545"); // or your RPC URL
    const signer = await provider.getSigner(OWNER_ADDRESS);
    
    const factory = new ethers.Contract(
      address,
      ABI_CAMPAIGN,
      signer
    );
    const tx = await factory.cancelByAdmin(reason);
    const receipt = await tx.wait();

    return {
      success: true,
      message: "Campaña cancelada exitosamente",
      data: { txHash: receipt.transactionHash },
    };


  }

  async requestChanges(address: string, reason:string): Promise<BackendResponse> {
 
    const provider = new ethers.JsonRpcProvider("http://localhost:8545"); // or your RPC URL
    const signer = await provider.getSigner(OWNER_ADDRESS);
    
    const factory = new ethers.Contract(
      address,
      ABI_CAMPAIGN,
      signer
    );
    const tx = await factory.requestChanges(reason);
    const receipt = await tx.wait();

    return {
      success: true,
      message: "Campaña solicitada para cambios exitosamente",
      data: { txHash: receipt.transactionHash },
    };


  }


  getById(id: string): Promise<BackendResponse<Campaign | null>> {
    throw new Error("Method not implemented.");
  }
  async getAll(): Promise<Campaign[]> {
    try {
      const provider = new ethers.JsonRpcProvider("http://localhost:8545"); // Podés cambiar esto por un provider público si hacés test en testnet

      const factory = new ethers.Contract(
        FACTORY_ADDRESS,
        ABI_FACTORY_CAMPAIGN,
        provider
      );
      const campaignAddresses: string[] = await factory.all();
      console.log("Campaign Addresses:", campaignAddresses);

      const campaigns: Campaign[] = await Promise.all(
        campaignAddresses.map(async (addr: string): Promise<Campaign> => {
          const contract = new ethers.Contract(addr, ABI_CAMPAIGN, provider);

          const [id, title, description, goal, deadline, creator, status] =
            await Promise.all([
              contract.id(),
              contract.title(),
              contract.description(),
              contract.goal(),
              contract.deadline(),
              contract.creator(),
              contract.status(),
            ]);

          const endDate = new Date(Number(deadline) * 1000);
          const today = new Date();
          const daysLeft = Math.max(
            0,
            Math.ceil(
              (endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
            )
          );

          return {
            id: Number(id),
            address: addr,
            title,
            description,
            fullDescription: description,
            category: "", // si lo agregás en el contrato lo podés traer
            imageUrl: "", // idem
            goal: Number(ethers.formatUnits(goal, 18)),
            amountRaised: 0, // si agregás un getter en el contrato
            createdAt: today, // o traelo si está en el contrato
            endDate,
            daysLeft,
            donors: 0, // idem
            creator,
            walletAddress: addr,
            isVerified: true,
            status: String(status), // Asegurate que sea string
          };
        })
      );

      return campaigns;
    } catch (err) {
      console.error("Error al obtener campañas:", err);
      return [];
    }
  }
  getPendingCampaigns(): Promise<BackendResponse<Campaign[]>> {
    throw new Error("Method not implemented.");
  }
  getCampaignsByCreator(creator: string): Promise<BackendResponse<Campaign[]>> {
    throw new Error("Method not implemented.");
  }
}
