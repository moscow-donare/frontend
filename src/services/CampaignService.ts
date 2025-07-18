import { HttpCampaignRepository } from "@/lib/repositories/Campaign/HttpCampaignRepository";

export const CampaignService = {
    async getPendingCampaigns() {
        return HttpCampaignRepository.getPendingCampaigns();
    },
    async getCampaignById(id: string) {
        return HttpCampaignRepository.getById(id);
    },
    async acceptCampaign(id: string) {
        return HttpCampaignRepository.acceptCampaign(id);
    },
    async rejectCampaign(id: string, reason: string) {
        return HttpCampaignRepository.rejectCampaign(id, reason);
    },
    async cancelCampaign(id: string, reason: string) {
        return HttpCampaignRepository.cancelCampaign(id, reason);
    }
}
