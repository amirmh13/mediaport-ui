import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShootingScheduleComponent } from './shooting-schedule.component';

const routes: Routes = [
  { path: '', component: ShootingScheduleComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShootingScheduleRoutingModule { }
