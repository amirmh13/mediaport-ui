import { NgModule } from '@angular/core';
import { RouterModule, Routes, UrlMatchResult, UrlSegment } from '@angular/router';
import { OverviewComponent } from './components/overview/overview.component';
import { SceneDetailComponent } from './components/scene-detail/scene-detail.component';
import { ScenesComponent } from './scenes.component';

export function idMatcher(url: UrlSegment[]): UrlMatchResult | null {

  const checkPath = (path: string) => {
    return (/[0-9]/g).test(path)
  }

  return checkPath(url[0].path) && checkPath(url[2].path) ? { consumed: url } : null;
}

const routes: Routes = [
  { path: '', component: ScenesComponent },
  { path: 'overview', component: OverviewComponent },
  {
    path: ':episodeId',
    matcher: idMatcher,
    children: [
      { path: '', component: ScenesComponent },
      {
        path: 'detail',

        children: [
          { path: '', component: SceneDetailComponent },
          { path: ':sceneId', matcher: idMatcher, component: SceneDetailComponent }
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
