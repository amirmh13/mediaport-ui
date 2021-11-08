export interface TransactionDto {
    id: number;
    title: string;
    description: string;
    code: string;
    subCode: string;
    estimatedAmount: number;
    amount?: number;
    transactionTime: Date;
    createdAt: Date;
  }