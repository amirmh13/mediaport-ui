export interface TransactionCategoryDto {
    id: number;
    name: string;
    code: string;
    amount: number;
    estimatedAmount: number;
    parentId: number;
    childs: TransactionCategoryDto[];
}