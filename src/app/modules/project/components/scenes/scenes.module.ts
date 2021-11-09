import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScenesRoutingModule } from './scenes-routing.module';
import { ScenesComponent } from './scenes.component';


@NgModule({
  declarations: [
    ScenesComponent
  ],
  imports: [
    CommonModule,
    ScenesRoutingModule
  ]
})
export class ScenesModule { }
