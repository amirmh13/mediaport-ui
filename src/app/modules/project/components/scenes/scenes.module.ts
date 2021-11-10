import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScenesRoutingModule } from './scenes-routing.module';
import { ScenesComponent } from './scenes.component';
import { FormsModule } from '@angular/forms';
import { MATERIAL_COMMON_MODULES } from 'src/app/MaterialModulesArray.const';
import { CustomSelectModule } from '@shared/components/custom-select/custom-select.module';
import { AddEpisodeComponent } from './components/add-episode/add-episode.component';


@NgModule({
  declarations: [
    ScenesComponent,
    AddEpisodeComponent
  ],
  imports: [
    CommonModule,
    ScenesRoutingModule,
    FormsModule,
    MATERIAL_COMMON_MODULES,
    CustomSelectModule,
  ]
})
export class ScenesModule { }
