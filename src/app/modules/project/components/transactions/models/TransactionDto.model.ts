export interface TransactionDto {
    id: number;
    title: string;
    estimatedAmount: number;
    amount: number;
    transactionTime: Date;
    createdAt: Date;
  }