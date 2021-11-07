import { AddTransactionPostBody } from ".";

export interface EditTransactionPostBody extends AddTransactionPostBody {
    id: number;
}