import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { RootState } from 'src/app/state/App.reducers';
import { selectProjectId } from '../../state/Project.selectors';
import { AddEpisodeComponent } from './components/add-episode/add-episode.component';
import { AddOrUpdateSceneComponent } from './components/add-or-update-scene/add-or-update-scene.component';
import { Mode } from './enums';
import { AddScenePb, AddSubScenePb, SceneDto, ScenesListPb } from './models';
import { AddEpisodePb, EpisodeDto, EpisodesService } from './service/episodes.service';
import { ScenesService } from './service/scenes.service';
import { UtilitiesService } from '@shared/services/utilities/utilities.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scenes',
  templateUrl: './scenes.component.html',
  styleUrls: ['./scenes.component.scss']
})
export class ScenesComponent implements OnInit {

  episodes: EpisodeDto[] = [];
  currentProjectId: number = 0;
  selectedEpisodeId: number = 0;
  selectedMode: number = 0;
  modeSelectOptions = [
    { name: 'ویرایشگر', id: Mode.EDITOR, svgId: 'edit-secondary' },
    { name: 'خرد کردن', id: Mode.CHOPPING, svgId: 'page-collection-secondary' },
    { name: 'نمای کلی', id: Mode.OVERVIEW, svgId: 'documents-secondary' },
  ];
  scenesListPostBody = new ScenesListPb();
  scenesList: SceneDto[] = [];
  selectedSceneId: string = '';

  constructor(
    private _scenesService: ScenesService,
    private _episodesService: EpisodesService,
    private _store: Store<RootState>,
    private _dialog: MatDialog,
    private _utilitiesService: UtilitiesService,
    private _router: Router,
  ) { }

  getListOfEpisodes(initialize: boolean = false): void {
    this._episodesService.getListOfEpisodes(this.currentProjectId).subscribe(res => {
      this.episodes = res;

      if (this.episodes?.length && initialize) {
        this.selectedEpisodeId = this.episodes[0].id;
        this.scenesListPostBody.projectEpisodeId = this.selectedEpisodeId;

        this.getListOfScenes();
      }

    })
  }

  getListOfScenes(): void {
    this.scenesListPostBody.projectId = this.currentProjectId;
    this._scenesService.getListOfScenes(this.scenesListPostBody).subscribe(res => {
      console.log(res);
      this.scenesList = res;
    })
  }

  async addEpisode(newEpisode: AddEpisodePb): Promise<void> {
    await this._episodesService.addEpisode(newEpisode).toPromise();
    this.getListOfEpisodes();
  }

  episodeSelectChange(id: number): void {
    console.log(id);
    this.scenesListPostBody.projectEpisodeId = id;
    this.getListOfScenes();
  }

  onOpenAddEpisodeModalClick(): void {
    const dialogRef = this._dialog.open(AddEpisodeComponent, {
      direction: 'rtl',
      scrollStrategy: new NoopScrollStrategy(),
    })

    dialogRef.componentInstance.submitEmitter.subscribe(async (result) => {
      result.projectId = this.currentProjectId;
      await this.addEpisode(result);
      dialogRef.close();
    })
  }

  modeSelectChange(mode: number): void {
    switch (mode) {
      case Mode.EDITOR:
        this._router.navigate(['projects', this.currentProjectId, 'episode-scenes','editor']);
        break;
      case Mode.CHOPPING:
        const firstSceneId: number | '' = this.scenesList[0]?.id || '';
        this._router.navigate(['projects', this.currentProjectId, 'episode-scenes', this.selectedEpisodeId,'detail', firstSceneId]);
        break;
    }
  }

  onOpenAddSceneDialog(projectEpisodeSceneId?: number): void {
    const dialogRef = this._dialog.open(AddOrUpdateSceneComponent, {
      direction: 'rtl',
      width: '450px'
    });

    dialogRef.componentInstance.currentProjectId = this.currentProjectId;
    if (projectEpisodeSceneId) dialogRef.componentInstance.projectEpisodeSceneId = projectEpisodeSceneId;

    dialogRef.componentInstance.submitEmitter.subscribe(async (addScenePb) => {
      addScenePb.projectId = this.currentProjectId;
      addScenePb.projectEpisodeId = this.selectedEpisodeId;

      if (addScenePb.projectEpisodeSceneId) await this.addSubScene(addScenePb);
      else await this.addScene(addScenePb);

      dialogRef.close();
      this.getListOfScenes();
    })
  }

  async addScene(postBody: AddScenePb): Promise<void> {
    await this._scenesService.addScene(postBody).toPromise();
  }

  async addSubScene(postBody: AddSubScenePb): Promise<void> {
    await this._scenesService.addSubScene(postBody).toPromise();
  }

  onBriefSceneClick(id: string): void {
    this._utilitiesService.scrollToElement(id);
    this.selectedSceneId = id;
  }

  onOpeAddSubSceneDialog(scene: SceneDto): void {
    this.onOpenAddSceneDialog(scene.id);
  }

  ngOnInit(): void {
    this._store.pipe(select(selectProjectId)).subscribe(projectId => {
      this.currentProjectId = projectId;
    })

    this.selectedMode = Mode.EDITOR;

    this.getListOfEpisodes(true);
  }

}
