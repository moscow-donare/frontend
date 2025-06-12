export interface Transaction {
  id: string;
  campaignId: string;
  type: 'donation' | 'withdrawal';
  amount: number;
  from: string;
  to: string;
  txHash: string;
  date: Date;
  message?: string;
}