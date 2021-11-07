export interface AddTransactionPostBody {
    projectId: number;
    projectTransactionCategoryId: number;
    title: string;
    estimatedAmount: number;
    amount: number;
    transactionTime: Date;
}