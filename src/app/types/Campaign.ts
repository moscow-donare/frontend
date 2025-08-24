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

export interface StateChange {
  blockNumber: number;
  txHash: string;
  newState: number;
  reason: string;
}

export type CreateCampaign = {
  name: string;
  description: string;
  photo: string;
  goal: number;
  endDate: number;
  url: string;
  category: number
}

export interface Campaign {
  amountRaised: number;
  category: number;
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
  imageCID?: string;
  photo: string;
  isVerified: boolean;
  status: number;
  name: string;
  walletAddress: string;
  stateChanges?: StateChange[];
}
