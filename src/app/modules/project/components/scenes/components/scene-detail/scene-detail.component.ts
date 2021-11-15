import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { selectProjectId } from 'src/app/modules/project/state/Project.selectors';
import { RootState } from 'src/app/state/App.reducers';
import { Mode } from '../../enums';
import { SceneDetail, SceneDto } from '../../models';
import { ScenesBase } from '../../ScenesBase.class';
import { EpisodeDto, EpisodesService } from '../../service/episodes.service';
import { ScenesService } from '../../service/scenes.service';

@Component({
  selector: 'app-scene-detail',
  templateUrl: './scene-detail.component.html',
  styleUrls: ['./scene-detail.component.scss']
})
export class SceneDetailComponent extends ScenesBase implements OnInit {

  episodeId: number = 0;
  sceneId: number = 0;
  sceneDetail: SceneDetail | null = null;
  episodes: EpisodeDto[] = [];

  constructor(
    public _router: Router,
    private _route: ActivatedRoute,
    private _scenesService: ScenesService,
    private _episodeService: EpisodesService,
    private _store: Store<RootState>,
  ) {
    super(_router);
  }

  getSceneDetail(): void {
    this._scenesService.getSceneDetailWithPrevNext({
      projectId: this.currentProjectId,
      episodeId: this.episodeId,
      sceneId: this.sceneId,
    }).subscribe(res => {
      this.sceneDetail = res;
      console.log(this.sceneDetail);

    })
  }

  getListOfEpisodes(): void {
    this._episodeService.getListOfEpisodes(this.currentProjectId).subscribe(res => {
      this.episodes = res;
    })
  }

  async getListOfScenes(): Promise<void> {
    this.scenesList = await this._scenesService.getListOfScenes({
      projectId: this.currentProjectId,
      projectEpisodeId: this.episodeId,
    }).toPromise();
  }

  async episodeSelectChange(id: number): Promise<void> {
    await this.getListOfScenes();
    const firstSceneId: number | '' = this.scenesList[0]?.id || '';
    this._router.navigate(['projects', this.currentProjectId, 'episode-scenes', this.episodeId, 'detail', firstSceneId]);
  }

  onGoToNextOrPrevScene(id: number): void {
    this._router.navigate(['projects', this.currentProjectId, 'episode-scenes', this.episodeId, 'detail', id]);
  }

  ngOnInit(): void {
    this._store.pipe(select(selectProjectId)).subscribe(projectId => {
      this.currentProjectId = projectId;
      this.getListOfEpisodes();
    })

    this._route.params.subscribe(params => {
      this.sceneDetail = null;

      this.episodeId = +params.episodeId;
      this.sceneId = +params.sceneId;

      if (this.episodeId && this.sceneId) {
        this.getSceneDetail();
        this.getListOfScenes();
      }
    })

    this.selectedMode = Mode.CHOPPING;
  }

}
