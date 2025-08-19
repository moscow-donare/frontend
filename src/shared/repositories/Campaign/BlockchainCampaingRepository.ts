import { BackendResponse } from "@/shared/BackendResponse";
import { ICampaignRepository } from "./ICampaignRepository";
<<<<<<< HEAD:src/lib/repositories/Campaign/BlockchainCampaingRepository.ts
import { Campaign, CreateCampaign, StateChange } from "@/app/types/Campaign";
import { ABI_CAMPAIGN, ABI_FACTORY_CAMPAIGN } from "@/lib/ABIContracts";
=======
import { Campaign, CreateCampaign } from "@/app/types/Campaign";
import { ABI_CAMPAIGN, ABI_FACTORY_CAMPAIGN } from "@/shared/ABIContracts";
>>>>>>> development:src/shared/repositories/Campaign/BlockchainCampaingRepository.ts
import { ethers, parseUnits } from "ethers";
import { GetWalletClientData } from "wagmi/query";
import { Config } from "wagmi";
const FACTORY_ADDRESS = process.env.NEXT_PUBLIC_FACTORY_ADDRESS!;
const OWNER_ADDRESS = process.env.NEXT_PUBLIC_OWNER_ADDRESS!;

export class BlockchainCampaignRepository implements ICampaignRepository {
  async createCampaign(
    campaign: CreateCampaign,
    walletClient: GetWalletClientData<Config, number> | undefined
  ): Promise<BackendResponse> {
    if (!walletClient) throw new Error("Wallet no conectada");

    const provider = new ethers.JsonRpcProvider("http://localhost:8545");
    const signer = await provider.getSigner(OWNER_ADDRESS);

    const factory = new ethers.Contract(
      FACTORY_ADDRESS,
      ABI_FACTORY_CAMPAIGN,
      signer
    );
    const parsedGoal = parseUnits(campaign.goal.toString(), 18);

    const tx = await factory.createCampaign(
      walletClient.account.address,
      campaign.title,
      campaign.description,
      campaign.imageCID,
      parsedGoal,
      campaign.deadline,
      campaign.url,
      campaign.category
    );

    const receipt = await tx.wait();

    return {
      success: true,
      message: "Campaña creada exitosamente",
      data: { txHash: receipt.transactionHash },
    };
  }

  async acceptCampaign(
    address: string,
    reason: string
  ): Promise<BackendResponse> {
    const provider = new ethers.JsonRpcProvider("http://localhost:8545"); // or your RPC URL
    const signer = await provider.getSigner(OWNER_ADDRESS);

    const factory = new ethers.Contract(address, ABI_CAMPAIGN, signer);
    const tx = await factory.approveCampaign(reason);
    const receipt = await tx.wait();

    return {
      success: true,
      message: "Campaña aceptada exitosamente",
      data: { txHash: receipt.transactionHash },
    };
  }

  async cancelCampaign(
    address: string,
    reason: string
  ): Promise<BackendResponse> {
    const provider = new ethers.JsonRpcProvider("http://localhost:8545"); // or your RPC URL
    const signer = await provider.getSigner(OWNER_ADDRESS);

    const factory = new ethers.Contract(address, ABI_CAMPAIGN, signer);
    const tx = await factory.cancelByAdmin(reason);
    const receipt = await tx.wait();

    return {
      success: true,
      message: "Campaña cancelada exitosamente",
      data: { txHash: receipt.transactionHash },
    };
  }

  async requestChanges(
    address: string,
    reason: string
  ): Promise<BackendResponse> {
    const provider = new ethers.JsonRpcProvider("http://localhost:8545"); // or your RPC URL
    const signer = await provider.getSigner(OWNER_ADDRESS);

    const factory = new ethers.Contract(address, ABI_CAMPAIGN, signer);
    const tx = await factory.requestChanges(reason);
    const receipt = await tx.wait();

    return {
      success: true,
      message: "Campaña solicitada para cambios exitosamente",
      data: { txHash: receipt.transactionHash },
    };
  }

  async getById(idCampaign: number): Promise<Campaign> {
    try {
      const provider = new ethers.JsonRpcProvider("http://localhost:8545"); // Podés cambiar esto por un provider público si hacés test en testnet

      const factory = new ethers.Contract(
        FACTORY_ADDRESS,
        ABI_FACTORY_CAMPAIGN,
        provider
      );
      const campaignAddress: string = await factory.campaignsById(idCampaign);

      const campaingContract = new ethers.Contract(
        campaignAddress,
        ABI_CAMPAIGN,
        provider
      );

      const [
        id,
        title,
        description,
        goal,
        deadline,
        creator,
        status,
        imageCID,
        category,
      ] = await Promise.all([
        campaingContract.id(),
        campaingContract.title(),
        campaingContract.description(),
        campaingContract.goal(),
        campaingContract.deadline(),
        campaingContract.creator(),
        campaingContract.status(),
        campaingContract.imageCID(),
        campaingContract.category(),
      ]);

      const endDate = new Date(Number(deadline));
      const today = new Date();
      const daysLeft = Math.max(
        0,
        Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
      );

      const campaing: Campaign = {
        id: Number(id),
        address: campaignAddress,
        title,
        description,
        fullDescription: description,
        category: Number(category), // si lo agregás en el contrato lo podés traer
        imageCID,
        goal: Number(ethers.formatUnits(goal, 18)),
        amountRaised: 0, // si agregás un getter en el contrato
        createdAt: today, // o traelo si está en el contrato
        endDate,
        daysLeft,
        donors: 0, // idem
        creator,
        walletAddress: campaignAddress,
        isVerified: true,
        status: Number(status), // Asegurate que sea number
      };

      return campaing;
    } catch (err) {
      console.log(err);
      return Promise.reject();
    }
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

      const campaigns: Campaign[] = await Promise.all(
        campaignAddresses.map(async (addr: string): Promise<Campaign> => {
          const contract = new ethers.Contract(addr, ABI_CAMPAIGN, provider);

          const [
            id,
            title,
            description,
            goal,
            deadline,
            creator,
            status,
            imageCID,
            category,
          ] = await Promise.all([
            contract.id(),
            contract.title(),
            contract.description(),
            contract.goal(),
            contract.deadline(),
            contract.creator(),
            contract.status(),
            contract.imageCID(),
            contract.category(),
          ]);

          const endDate = new Date(Number(deadline));
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
            category: Number(category), // si lo agregás en el contrato lo podés traer
            imageCID,
            goal: Number(ethers.formatUnits(goal, 18)),
            amountRaised: 0, // si agregás un getter en el contrato
            createdAt: today, // o traelo si está en el contrato
            endDate,
            daysLeft,
            donors: 0, // idem
            creator,
            walletAddress: addr,
            isVerified: true,
            status: Number(status),
          };
        })
      );

      return campaigns;
    } catch (err) {
      console.error("Error al obtener campañas:", err);
      return [];
    }
  }

  async fetchStateChanges(
    contract: ethers.Contract,
    fromBlock = 0,
    toBlock: "latest" | number = "latest"
  ): Promise<StateChange[]> {
    const filter = contract.filters.StateChanged();
    const logs = await contract.queryFilter(filter, fromBlock, toBlock);
    return logs.map(evt => ({
      blockNumber: evt.blockNumber,
      txHash: evt.transactionHash,
      newState: evt.args!.newState,
      reason: evt.args!.reason,
    }));
  }

 async getAllByUser(address: string): Promise<Campaign[]> {
  try {
    const provider = new ethers.JsonRpcProvider("http://localhost:8545");
    const factory = new ethers.Contract(
      FACTORY_ADDRESS,
      ABI_FACTORY_CAMPAIGN,
      provider
    );

    console.log("Fetching campaigns by user:", address);
    const campaignAddresses: string[] = await factory.campaignsByUser(address);

    const campaigns: Campaign[] = await Promise.all(
      campaignAddresses.map(async (addr: string): Promise<Campaign> => {
        const contract = new ethers.Contract(addr, ABI_CAMPAIGN, provider);

        // 1) Datos básicos
        const [
          id,
          title,
          description,
          goal,
          deadline,
          creator,
          status,
          imageCID,
          category,
        ] = await Promise.all([
          contract.id(),
          contract.title(),
          contract.description(),
          contract.goal(),
          contract.deadline(),
          contract.creator(),
          contract.status(),
          contract.imageCID(),
          contract.category(),
        ]);

        // 2) Eventos StateChanged
        const stateChanges = await this.fetchStateChanges(contract);

        // 3) Cálculos de fecha
        const endDate = new Date(Number(deadline));
        const today = new Date();
        const daysLeft = Math.max(
          0,
          Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
        );

        return {
          id: Number(id),
          address: addr,
          title,
          description,
          fullDescription: description,
          category: Number(category),
          imageCID,
          goal: Number(ethers.formatUnits(goal, 18)),
          amountRaised: 0,
          createdAt: today,
          endDate,
          daysLeft,
          donors: 0,
          creator,
          walletAddress: addr,
          isVerified: true,
          status: Number(status),
          stateChanges,
        };
      })
    );

    console.log("Campaigns fetched:", campaigns);
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
    console.log(creator);
    throw new Error("Method not implemented.");
  }

  rejectCampaign(address: string, reason: string): Promise<BackendResponse> {
    console.log(address, reason);
    throw new Error("Method not implemented.");
  }
}
