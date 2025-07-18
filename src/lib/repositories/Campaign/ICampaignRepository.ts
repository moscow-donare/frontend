import { BackendResponse } from "@/lib/BackendResponse";
import { Campaign } from "@/app/types/Campaign";

export interface ICampaignRepository {
  getPendingCampaigns(): Promise<BackendResponse<Campaign[]>>;
  getById(id: string): Promise<BackendResponse<Campaign | null>>;
  acceptCampaign(id: string): Promise<BackendResponse>;
  rejectCampaign(id: string, reason: string): Promise<BackendResponse>;
  cancelCampaign(id: string, reason: string): Promise<BackendResponse>;
}
