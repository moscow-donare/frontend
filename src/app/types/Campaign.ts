export interface Campaign {
  id?: string;
  title: string;
  description: string;
  fullDescription: string;
  category: string;
  imageUrl: string;
  goal: number;
  amountRaised: number;
  createdAt: Date;
  endDate: Date;
  daysLeft: number;
  donors: number;
  creator: string;
  creatorImageUrl?: string;
  creatorBio?: string;
  walletAddress: string;
  isVerified: boolean;
  status: 'active' | 'completed' | 'cancelled' | 'revision';
}

export type CampaignStatus = 'InReview' | 'PendingChange' | 'Cancelled' | 'Active' | 'Completed';

export type CreateCampaign = {
    title: string;
    description: string;
    imageCID: string;
    goal: number;
    deadline: number;
    url: string;
}