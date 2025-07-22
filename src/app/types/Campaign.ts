// export interface CampaignMocked {
//   id?: string;
//   title: string;
//   description: string;
//   fullDescription: string;
//   category: string;
//   imageUrl: string;
//   goal: number;
//   amountRaised: number;
//   createdAt: Date;
//   endDate: Date;
//   daysLeft: number;
//   donors: number;
//   creator: string;
//   creatorImageUrl?: string;
//   creatorBio?: string;
//   walletAddress: string;
//   isVerified: boolean;
//   status: 'active' | 'completed' | 'cancelled' | 'revision';
// }

export type CampaignStatus = 'InReview' | 'PendingChange' | 'Cancelled' | 'Active' | 'Completed';

export type CreateCampaign = {
  title: string;
  description: string;
  imageCID: string;
  goal: number;
  deadline: number;
  url: string;
}

export interface Campaign {
  amountRaised: number;
  category: string;
  createdAt: Date;
  creator: string;
  daysLeft: number;
  description: string;
  donors: number;
  endDate: Date;
  fullDescription: string;
  goal: number;
  id: number;
  address: string;
  imageUrl: string;
  isVerified: boolean;
  status: string;
  title: string;
  walletAddress: string;
}
