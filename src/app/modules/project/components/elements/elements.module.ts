import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClickOutsideModule } from 'ng-click-outside';
import { MATERIAL_COMMON_MODULES } from 'src/app/MaterialModulesArray.const';
import { AddOrUpdateElementComponent } from './components/add-or-update-element/add-or-update-element.component';
import { ElementRowComponent } from './components/add-or-update-element/element-row/element-row.component';
import { ElementTypeCardComponent } from './components/element-type-card/element-type-card.component';
import { ElementsRoutingModule } from './elements-routing.module';
import { ElementsComponent } from './elements.component';

@NgModule({
  declarations: [
    ElementsComponent,
    ElementTypeCardComponent,
    AddOrUpdateElementComponent,
    ElementRowComponent
  ],
  imports: [
    CommonModule,
    ElementsRoutingModule,
    FormsModule,
    ClickOutsideModule,
    MATERIAL_COMMON_MODULES,
  ]
})
export class ElementsModule { }
