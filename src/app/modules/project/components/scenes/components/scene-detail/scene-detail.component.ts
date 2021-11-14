import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { selectProjectId } from 'src/app/modules/project/state/Project.selectors';
import { RootState } from 'src/app/state/App.reducers';
import { Mode } from '../../enums';
import { SceneDetail, SceneDto } from '../../models';
import { EpisodeDto, EpisodesService } from '../../service/episodes.service';
import { ScenesService } from '../../service/scenes.service';

@Component({
  selector: 'app-scene-detail',
  templateUrl: './scene-detail.component.html',
  styleUrls: ['./scene-detail.component.scss']
})
export class SceneDetailComponent implements OnInit {

  episodeId: number = 0;
  sceneId: number = 0;
  sceneDetail: SceneDetail | null = null;
  scenesList: SceneDto[] = [];
  currentProjectId: number = 0;
  episodes: EpisodeDto[] = [];
  modeSelectOptions = [
    { name: 'ویرایشگر', id: Mode.EDITOR, svgId: 'edit-secondary' },
    { name: 'خرد کردن', id: Mode.CHOPPING, svgId: 'page-collection-secondary' },
    { name: 'نمای کلی', id: Mode.OVERVIEW, svgId: 'documents-secondary' },
  ];
  selectedMode: number = 0;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _scenesService: ScenesService,
    private _episodeService: EpisodesService,
    private _store: Store<RootState>,
  ) { }

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
    const scenesList = await this._scenesService.getListOfScenes({
      projectId: this.currentProjectId,
      projectEpisodeId: this.episodeId,
    }).toPromise();
    this.scenesList = scenesList;
  }

  async episodeSelectChange(id: number): Promise<void> {
    await this.getListOfScenes();
    const firstSceneId: number | '' = this.scenesList[0]?.id || '';
    this._router.navigate(['projects', this.currentProjectId, 'episode-scenes', this.episodeId, 'detail', firstSceneId]);
  }

  modeSelectChange(mode: number): void {
    switch (mode) {
      case Mode.EDITOR:
        this._router.navigate(['projects', this.currentProjectId, 'episode-scenes', 'editor']);
        break;
      case Mode.CHOPPING:
        const firstSceneId: number | '' = this.scenesList[0]?.id || '';
        this._router.navigate(['projects', this.currentProjectId, 'episode-scenes', this.episodeId, 'detail', firstSceneId]);
        break;
    }
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
