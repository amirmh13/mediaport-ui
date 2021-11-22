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
import { AddElementComponent } from './components/add-element/add-element.component';
import { ElementTypeRowComponent } from './components/element-type-row/element-type-row.component';
import { EditElementComponent } from './components/edit-element/edit-element.component';
import { StoreModule } from '@ngrx/store';
import { sceneReducer } from './state/Scenes.reducers';



@NgModule({
  declarations: [
    ScenesComponent,
    AddEpisodeComponent,
    AddOrUpdateSceneComponent,
    SceneCardComponent,
    SceneDetailComponent,
    AddElementComponent,
    ElementTypeRowComponent,
    EditElementComponent
  ],
  imports: [
    CommonModule,
    ScenesRoutingModule,
    FormsModule,
    MATERIAL_COMMON_MODULES,
    CustomSelectModule,
    QuillModule.forRoot(),
    StoreModule.forFeature('scenes', sceneReducer),
  ]
})
export class ScenesModule { }
