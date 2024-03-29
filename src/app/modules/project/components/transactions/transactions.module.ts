import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MATERIAL_COMMON_MODULES } from 'src/app/MaterialModulesArray.const';
import { TransactionsRoutingModule } from './transactions-routing.module';
import { TransactionsComponent } from './transactions.component';
import { CategoryRowComponent } from './components/category-row/category-row.component';
import { ChangeToCurrencyModule } from '@shared/pipes/change-to-currency/change-to-currency.module';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { FormsModule } from '@angular/forms';
import { TransactionsListComponent } from './components/transactions-list/transactions-list.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { AddTransactionComponent } from './components/add-transaction/add-transaction.component';

@NgModule({
  declarations: [
    TransactionsComponent,
    CategoryRowComponent,
    AddCategoryComponent,
    TransactionsListComponent,
    AddTransactionComponent
  ],
  imports: [
    CommonModule,
    TransactionsRoutingModule,
    MATERIAL_COMMON_MODULES,
    MatPaginatorModule,
    ChangeToCurrencyModule,
    FormsModule,
    MatDatepickerModule
  ]
})
export class TransactionsModule { }
