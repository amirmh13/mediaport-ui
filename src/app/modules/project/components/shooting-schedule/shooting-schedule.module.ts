import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShootingScheduleRoutingModule } from './shooting-schedule-routing.module';
import { ShootingScheduleComponent } from './shooting-schedule.component';
import { DragDropModule } from '@angular/cdk/drag-drop'

@NgModule({
  declarations: [
    ShootingScheduleComponent
  ],
  imports: [
    CommonModule,
    ShootingScheduleRoutingModule,
    DragDropModule
  ]
})
export class ShootingScheduleModule { }
