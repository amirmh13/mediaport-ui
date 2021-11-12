import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShootingScheduleRoutingModule } from './shooting-schedule-routing.module';
import { ShootingScheduleComponent } from './shooting-schedule.component';
import { DragDropModule } from '@angular/cdk/drag-drop'
import { MATERIAL_COMMON_MODULES } from 'src/app/MaterialModulesArray.const';
import { SetShootingDayDateComponent } from './components/set-shooting-day-date/set-shooting-day-date.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { InitShootingScheduleComponent } from './components/init-shooting-schedule/init-shooting-schedule.component';
import { ShootingSceneRowComponent } from './components/shooting-scene-row/shooting-scene-row.component';

@NgModule({
  declarations: [
    ShootingScheduleComponent,
    SetShootingDayDateComponent,
    InitShootingScheduleComponent,
    ShootingSceneRowComponent
  ],
  imports: [
    CommonModule,
    ShootingScheduleRoutingModule,
    MATERIAL_COMMON_MODULES,
    DragDropModule,
    FormsModule,
    MatDatepickerModule
  ]
})
export class ShootingScheduleModule { }
