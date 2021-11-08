export interface TransactionDto {
    id: number;
    title: string;
    description: string;
    code: string;
    subCode: string;
    estimatedAmount: number;
    amount?: number;
    transactionTime: Date;
    transactionTimeStr: string;
    createdAt: Date;
    createdAtStr: string;
  }