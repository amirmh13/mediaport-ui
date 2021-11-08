import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShootingScheduleRoutingModule } from './shooting-schedule-routing.module';
import { ShootingScheduleComponent } from './shooting-schedule.component';
import { DragDropModule } from '@angular/cdk/drag-drop'
import { MATERIAL_COMMON_MODULES } from 'src/app/MaterialModulesArray.const';

@NgModule({
  declarations: [
    ShootingScheduleComponent
  ],
  imports: [
    CommonModule,
    ShootingScheduleRoutingModule,
    MATERIAL_COMMON_MODULES,
    DragDropModule,
    FormsModule
  ]
})
export class ShootingScheduleModule { }
