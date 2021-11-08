export interface AddTransactionPostBody {
    projectId: number;
    projectTransactionCategoryId: number;
    title: string;
    description: string;
    estimatedAmount: number;
    amount?: number;
    transactionTime: Date;
}