import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScenesRoutingModule } from './scenes-routing.module';
import { ScenesComponent } from './scenes.component';
import { FormsModule } from '@angular/forms';
import { MATERIAL_COMMON_MODULES } from 'src/app/MaterialModulesArray.const';


@NgModule({
  declarations: [
    ScenesComponent
  ],
  imports: [
    CommonModule,
    ScenesRoutingModule,
    FormsModule,
    MATERIAL_COMMON_MODULES,
  ]
})
export class ScenesModule { }
