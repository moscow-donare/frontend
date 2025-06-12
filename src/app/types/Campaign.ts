export interface Campaign {
  id: string;
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
}