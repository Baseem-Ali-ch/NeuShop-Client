export interface WalletTransaction {
  _id: string;
  amount: number;
  type: 'credit' | 'debit';
  description: string;
  orderId?: string;
  createdAt: string;
}

export interface Wallet {
  _id: string;
  userId: string;
  balance: number;
  transactions: WalletTransaction[];
  __v?: number;
}