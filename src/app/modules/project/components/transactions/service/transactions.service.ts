import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaginateDto } from '@shared/models';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddTransactionCategoryPostBody, AddTransactionPostBody, EditTransactionCategoryPostBody, EditTransactionPostBody, TransactionCategoryDto, TransactionDto, TransactionListPostBody } from '../models';

@Injectable({
    providedIn: 'root'
})
export class TransactionsService {

    constructor(
        private _http: HttpClient,
    ) {}

    addTransactionCategory(body: AddTransactionCategoryPostBody): Observable < unknown > {
        return this._http.post(`${environment.apiBaseUrl}/v1/Project/Transactions/AddTransactionCategory`, body)
    }

    editTransactionCategory(body: EditTransactionCategoryPostBody): Observable < unknown > {
        return this._http.post(`${environment.apiBaseUrl}/v1/Project/Transactions/EditTransactionCategory`, body)
    }

    addTransaction(body: AddTransactionPostBody): Observable < unknown > {
        return this._http.post(`${environment.apiBaseUrl}/v1/Project/Transactions/AddTransaction`, body)
    }

    editTransaction(body: EditTransactionPostBody): Observable < unknown > {
        return this._http.post(`${environment.apiBaseUrl}/v1/Project/Transactions/EditTransaction`, body)
    }

    getListOfProjectTransactionCategories(projectId: number): Observable < TransactionCategoryDto[] > {
        return this._http.get < TransactionCategoryDto[] > (`${environment.apiBaseUrl}/v1/Project/Transactions/GetListOfProjectTransactionCategories`, { params: { projectId } })
    }

    getListOfProjectTransactions(body: TransactionListPostBody): Observable < PaginateDto < TransactionDto > > {
        return this._http.post < PaginateDto < TransactionDto > > (`${environment.apiBaseUrl}/v1/Project/Transactions/GetListOfProjectTransactions`, body)
    }
}