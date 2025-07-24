import { BackendResponse } from "@/lib/BackendResponse";
import { Campaign } from "@/app/types/Campaign";

export interface ICampaignRepository {
  getPendingCampaigns(): Promise<BackendResponse<Campaign[]>>;
  getById(id: number): Promise<Campaign | null>;
  acceptCampaign(address: string, reason: string): Promise<BackendResponse>;
  rejectCampaign(address: string, reason: string): Promise<BackendResponse>;
  cancelCampaign(address: string, reason: string): Promise<BackendResponse>;
}
