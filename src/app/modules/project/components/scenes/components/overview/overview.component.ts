import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { RootState } from 'src/app/state/App.reducers';
import { Mode } from '../../enums';
import { EpisodeWithSceneBrief, SceneDetail, SceneDto } from '../../models';
import { ScenesBase } from '../../ScenesBase.class';
import { ScenesService } from '../../service/scenes.service';
import { episodeIdAction, sceneIdAction } from '../../state/Scenes.actions';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent extends ScenesBase implements OnInit {

  currentProjectId!: number;
  episodesWithScenesList!: EpisodeWithSceneBrief[];
  sceneDetail: SceneDetail | null = null;

  constructor(
    public router: Router,
    public store: Store<RootState>,
    private _scenesService: ScenesService,
  ) {
    super(router, store);
  }

  getListOfScenes(): void {
    this._scenesService.getListOfEpisodesWithSceneBrief({ projectId: this.currentProjectId }).subscribe(res => {
      this.episodesWithScenesList = res;
      if (this.episodesWithScenesList?.length) {
        this.store.dispatch(episodeIdAction({ episodeId: this.episodesWithScenesList[0].id }));
        this.store.dispatch(sceneIdAction({ sceneId: Number(this.episodesWithScenesList[0].scenes[0]?.id) }));
      }
    })
  }

  onSceneBriefClick(episode: EpisodeWithSceneBrief, scene: Partial<SceneDto>): void {
    this._scenesService.getSceneDetailWithPrevNext({
      projectId: this.currentProjectId,
      episodeId: episode.id,
      sceneId: Number(scene.id),
    }).subscribe(res => {
      this.sceneDetail = res;
      this.store.dispatch(episodeIdAction({ episodeId: episode.id }));
      this.store.dispatch(sceneIdAction({ sceneId: Number(scene.id) }));
    })
  }

  ngOnInit(): void {
    this.store.subscribe(state => {
      this.currentProjectId = state.project.projectId;
    });

    this.getListOfScenes();

    this.selectedMode = Mode.OVERVIEW;
  }

}
