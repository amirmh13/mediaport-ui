import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeToCurrencyPipe } from './change-to-currency.pipe';

@NgModule({
  declarations: [ChangeToCurrencyPipe],
  imports: [
    CommonModule
  ],
  exports:[ChangeToCurrencyPipe]
})
export class ChangeToCurrencyModule { }
