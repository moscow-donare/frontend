import { BackendResponse } from "@/shared/BackendResponse";
import { Campaign, CreateCampaign } from "@/app/types/Campaign";
import { ICampaignRepository } from "./ICampaignRepository";
import { HttpClient } from "@/shared/HttpClient";
import Result, { AsyncResult } from "@/shared/Result";
import { Criteria } from "@/shared/models/criteria/Criteria";
import { Filter } from "@/shared/models/criteria/Filter";

const API_ROUTE = "/campaigns/";
const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000/api";

export class BackendCampaignRepository implements ICampaignRepository {
  private httpClient: HttpClient;
  constructor() {
    this.httpClient = new HttpClient(BASE_URL);
  }


  getPendingCampaigns(): AsyncResult<BackendResponse<Campaign[]>> {
    throw new Error("Method not implemented.");
  }

  async getById(id: number): AsyncResult<Campaign | null> {
    try {  
      const criteria: Criteria = new Criteria();
      const filter: Filter = new Filter('id', id)
      criteria.addFilter(filter);
      const queryString = this.criteriaToQueryString(criteria);
      const response = await this.httpClient.get<BackendResponse>(`${API_ROUTE}creator/criteria?${queryString}`);
      if (!response || !response.success) {
        return Result.Err({
          code: "GET_CAMPAIGN_BY_ID_FAILED",
          message: response ? response.message : "Unknown error",
          details: response?.error ?? response?.data ?? null
        });
      }
      const campaign = response.data![0];
      return Result.Ok(campaign as Campaign);
    } catch (error) {
      console.error("Error getting campaign by ID:", error);
      return Result.Err({
        code: "GET_CAMPAIGN_BY_ID_EXCEPTION",
        message: (error as Error).message,
        details: error
      }); 
    }
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
      const response = await  this.httpClient.post<BackendResponse>(`${API_ROUTE}create`, createCampaignData);
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

  async getAllByCreator(): AsyncResult<Campaign[] | null> {
    try {  
      const response = await this.httpClient.get<BackendResponse>(`${API_ROUTE}creator/criteria`);
      if (!response || !response.success) {
        return Result.Err({
          code: "GET_CAMPAIGNS_FAILED",
          message: response ? response.message : "Unknown error",
          details: response?.error ?? response?.data ?? null
        });
      }
      console.log("Campaigns fetched successfully:", response.data);
      return Result.Ok(response.data as Campaign[]);
    } catch (error) {
      console.error("Error getting campaigns:", error);
      return Result.Err({
        code: "GET_CAMPAIGNS_EXCEPTION",
        message: (error as Error).message,
        details: error
      }); 
    }
  }

  private criteriaToQueryString(criteria: Criteria): string {
    let queryString = "";  
    criteria.getFilters().forEach((filter, index) => {
      queryString += `filters[${index}][field]=${encodeURIComponent(filter.getField())}&`;
      queryString += `filters[${index}][value]=${encodeURIComponent(String(filter.getValue()))}&`;
      queryString += `filters[${index}][operator]=${encodeURIComponent(filter.getOperator().getOperator())}&`;
    });
    return queryString;
  }

  async updateCampaign(id: number, campaignData: Partial<CreateCampaign>): AsyncResult<Campaign | null> {
    try {  
      const response = await this.httpClient.patch<BackendResponse>(`${API_ROUTE}edit/${id}`, campaignData);
      if (!response || !response.success) {
        return Result.Err({
          code: "PATCH_CAMPAIGN_BY_ID_FAILED",
          message: response ? response.message : "Unknown error",
          details: response?.error ?? response?.data ?? null
        });
      }
      console.log("Campaign updated successfully by ID:", response);
      const campaign = response.data;
      return Result.Ok(campaign as Campaign);
    } catch (error) {
      return Result.Err({
        code: "PATCH_CAMPAIGN_BY_ID_EXCEPTION",
        message: (error as Error).message,
        details: error
      }); 
    }
  }
}

