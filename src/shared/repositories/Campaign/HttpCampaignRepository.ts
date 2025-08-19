import { BackendResponse } from "@/shared/BackendResponse";
import { Campaign, CreateCampaign } from "@/app/types/Campaign";
import { ICampaignRepository } from "./ICampaignRepository";
import { HttpClient } from "@/shared/HttpClient";
import Result, { AsyncResult } from "@/shared/Result";
import { Web3Auth } from "@web3auth/modal";

const API_ROUTE = "/campaigns/create";
const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000/api";

export class BackendCampaignRepository implements ICampaignRepository {
  private httpClient: HttpClient;
  constructor(private web3Auth: Web3Auth | null) {
    this.httpClient = new HttpClient(BASE_URL, web3Auth);
  }


  getPendingCampaigns(): AsyncResult<BackendResponse<Campaign[]>> {
    throw new Error("Method not implemented.");
  }
  getById(id: number): AsyncResult<Campaign | null> {
    throw new Error("Method not implemented.");
  }
  acceptCampaign(address: string, reason: string): AsyncResult<BackendResponse> {
    throw new Error("Method not implemented.");
  }
  rejectCampaign(address: string, reason: string): AsyncResult<BackendResponse> {
    throw new Error("Method not implemented.");
  }
  cancelCampaign(address: string, reason: string): AsyncResult<BackendResponse> {
    throw new Error("Method not implemented.");
  }

  async createCampaign(createCampaignData: CreateCampaign): AsyncResult<Campaign> {
    try {
      const response = await  this.httpClient.post<BackendResponse>(API_ROUTE, createCampaignData);
      if (!response || !response.success) {
        return Result.Err({
          code: "CREATE_CAMPAIGN_FAILED",
          message: response ? response.message : "Unknown error",
          details: response?.error ?? response?.data ?? null
        });
      }
      return Result.Ok(response.data as Campaign);
    } catch (error) {
      console.error("Error creating campaign:", error);
      return Result.Err({
        code: "CREATE_CAMPAIGN_EXCEPTION",
        message: (error as Error).message,
        details: error
      });
    }
  }
}

