import { BackendResponse } from "@/shared/BackendResponse";
import { Campaign, CreateCampaign } from "@/app/types/Campaign";
import { AsyncResult } from "@/shared/Result";

export interface ICampaignRepository {
  getPendingCampaigns(): AsyncResult<BackendResponse<Campaign[]>>;
  getById(id: number): AsyncResult<Campaign | null>;
  acceptCampaign(address: string, reason: string): AsyncResult<BackendResponse>;
  rejectCampaign(address: string, reason: string): AsyncResult<BackendResponse>;
  cancelCampaign(address: string, reason: string): AsyncResult<BackendResponse>;
  createCampaign?(createCampaignData: CreateCampaign): AsyncResult<Campaign>;
}
