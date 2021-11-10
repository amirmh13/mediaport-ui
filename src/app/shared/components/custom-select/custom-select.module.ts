import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomSelectComponent } from './custom-select.component';
import { ClickOutsideModule } from 'ng-click-outside';



@NgModule({
  declarations: [
    CustomSelectComponent
  ],
  imports: [
    CommonModule,
    ClickOutsideModule,
  ],
  exports: [CustomSelectComponent]
})
export class CustomSelectModule { }
