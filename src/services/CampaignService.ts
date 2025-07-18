import { mockCampaignRepository } from "@/lib/repositories/Campaign/MockCampaignRepository";

export const CampaignService = {
    async getPendingCampaigns() {
        // return HttpCampaignRepository.getPendingCampaigns();
        return mockCampaignRepository.getPendingCampaigns();
    },
    async getCampaignById(id: string) {
        // return HttpCampaignRepository.getById(id);
        return mockCampaignRepository.getById(id);
    },
    async acceptCampaign(id: string) {
        // return HttpCampaignRepository.acceptCampaign(id);
        return mockCampaignRepository.acceptCampaign(id);
    },
    async rejectCampaign(id: string, reason: string) {
        // return HttpCampaignRepository.rejectCampaign(id, reason);
        return mockCampaignRepository.rejectCampaign(id, reason);
    },
    async cancelCampaign(id: string, reason: string) {
        // return HttpCampaignRepository.cancelCampaign(id, reason);
        return mockCampaignRepository.cancelCampaign(id, reason);
    }
}
