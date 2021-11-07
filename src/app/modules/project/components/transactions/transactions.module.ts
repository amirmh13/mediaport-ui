import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MATERIAL_COMMON_MODULES } from 'src/app/MaterialModulesArray.const';
import { TransactionsRoutingModule } from './transactions-routing.module';
import { TransactionsComponent } from './transactions.component';
import { CategoryRowComponent } from './components/category-row/category-row.component';
import { ChangeToCurrencyModule } from '@shared/pipes/change-to-currency/change-to-currency.module';

@NgModule({
  declarations: [
    TransactionsComponent,
    CategoryRowComponent
  ],
  imports: [
    CommonModule,
    TransactionsRoutingModule,
    MATERIAL_COMMON_MODULES,
    ChangeToCurrencyModule
  ]
})
export class TransactionsModule { }
