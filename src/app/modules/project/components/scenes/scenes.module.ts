import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomSelectModule } from '@shared/components/custom-select/custom-select.module';
import { QuillModule } from 'ngx-quill';
import { MATERIAL_COMMON_MODULES } from 'src/app/MaterialModulesArray.const';
import { AddEpisodeComponent } from './components/add-episode/add-episode.component';
import { AddOrUpdateSceneComponent } from './components/add-or-update-scene/add-or-update-scene.component';
import { SceneCardComponent } from './components/scene-card/scene-card.component';
import { SceneDetailComponent } from './components/scene-detail/scene-detail.component';
import { ScenesRoutingModule } from './scenes-routing.module';
import { ScenesComponent } from './scenes.component';



@NgModule({
  declarations: [
    ScenesComponent,
    AddEpisodeComponent,
    AddOrUpdateSceneComponent,
    SceneCardComponent,
    SceneDetailComponent
  ],
  imports: [
    CommonModule,
    ScenesRoutingModule,
    FormsModule,
    MATERIAL_COMMON_MODULES,
    CustomSelectModule,
    QuillModule.forRoot()
  ]
})
export class ScenesModule { }
