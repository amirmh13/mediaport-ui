export interface AddTransactionCategoryPostBody {
    projectId: number;
    code: string;
    name: string;
    parentId?: number;
}