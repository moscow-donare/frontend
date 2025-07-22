import { BlockchainCampaignRepository } from "@/lib/repositories/Campaign/BlockchainCampaingRepository";

const repository = new BlockchainCampaignRepository();
export const CampaignService = {
    async getPendingCampaigns() {
        // return HttpCampaignRepository.getPendingCampaigns();
        return repository.getAll();
    },
    async getCampaignById(id: string) {
        // return HttpCampaignRepository.getById(id);
        return repository.getById(id);
    },
    async acceptCampaign(address: string, reason: string) {
        // return HttpCampaignRepository.acceptCampaign(id);
        return repository.acceptCampaign(address, reason);
    },
    async requestChanges(address: string, reason: string) {
        // return HttpCampaignRepository.rejectCampaign(id, reason);
        return repository.requestChanges(address, reason);
    },
    async cancelCampaign(address: string, reason: string) {
        // return HttpCampaignRepository.cancelCampaign(id, reason);
        return repository.cancelCampaign(address, reason);
    }
}
