import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShootingScheduleRoutingModule } from './shooting-schedule-routing.module';
import { ShootingScheduleComponent } from './shooting-schedule.component';


@NgModule({
  declarations: [
    ShootingScheduleComponent
  ],
  imports: [
    CommonModule,
    ShootingScheduleRoutingModule
  ]
})
export class ShootingScheduleModule { }
