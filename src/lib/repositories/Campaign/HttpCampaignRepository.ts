import { BackendResponse } from "@/lib/BackendResponse";
import httpClient from "@/lib/HttpClient";
import { Campaign } from "@/app/types/Campaign";
import { ICampaignRepository } from "./ICampaignRepository";

const API_ROUTE = "campaigns";

export const HttpCampaignRepository: ICampaignRepository = {
  async getPendingCampaigns(): Promise<BackendResponse<Campaign[]>> {
    return await httpClient.get<BackendResponse<Campaign[]>>(API_ROUTE);
  },
  async getById(id: number): Promise<BackendResponse<Campaign>> {
    return await httpClient.get<BackendResponse<Campaign>>(`${API_ROUTE}/${id}`);
  },
  async acceptCampaign(id: string): Promise<BackendResponse> {
    return await httpClient.post<BackendResponse>(`${API_ROUTE}/${id}/accept`, {});
  },
  async rejectCampaign(id: string, reason: string): Promise<BackendResponse> {
    return await httpClient.post<BackendResponse>(`${API_ROUTE}/${id}/reject`, { reason });
  },
  async cancelCampaign(id: string, reason: string): Promise<BackendResponse> {
    return await httpClient.post<BackendResponse>(`${API_ROUTE}/${id}/cancel`, { reason });
  }
};

