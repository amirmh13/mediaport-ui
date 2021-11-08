import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionsListComponent } from './components/transactions-list/transactions-list.component';
import { TransactionsComponent } from './transactions.component';

const routes: Routes = [
    { path: '', component: TransactionsComponent },
    { path: ':categoryId', component: TransactionsListComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TransactionsRoutingModule { }