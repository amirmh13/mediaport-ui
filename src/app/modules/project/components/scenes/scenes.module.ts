import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScenesRoutingModule } from './scenes-routing.module';
import { ScenesComponent } from './scenes.component';
import { FormsModule } from '@angular/forms';
import { MATERIAL_COMMON_MODULES } from 'src/app/MaterialModulesArray.const';
import { CustomSelectModule } from '@shared/components/custom-select/custom-select.module';
import { AddEpisodeComponent } from './components/add-episode/add-episode.component';
import { AddOrUpdateSceneComponent } from './components/add-or-update-scene/add-or-update-scene.component';
import { SceneCardComponent } from './components/scene-card/scene-card.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { QuillModule } from 'ngx-quill';


@NgModule({
  declarations: [
    ScenesComponent,
    AddEpisodeComponent,
    AddOrUpdateSceneComponent,
    SceneCardComponent
  ],
  imports: [
    CommonModule,
    ScenesRoutingModule,
    FormsModule,
    MATERIAL_COMMON_MODULES,
    CustomSelectModule,
    EditorModule,
    QuillModule.forRoot()
  ]
})
export class ScenesModule { }
