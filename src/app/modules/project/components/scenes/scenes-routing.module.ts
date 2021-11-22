import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OverviewComponent } from './components/overview/overview.component';
import { SceneDetailComponent } from './components/scene-detail/scene-detail.component';
import { ScenesComponent } from './scenes.component';

const routes: Routes = [
  { path: '', component: ScenesComponent },
  { path: 'overview', component: OverviewComponent },
  {
    path: ':episodeId',
    children: [
      { path: '', component: ScenesComponent },
      {
        path: 'detail',
        children: [
          { path: '', component: SceneDetailComponent },
          { path: ':sceneId', component: SceneDetailComponent }
        ]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScenesRoutingModule { }
