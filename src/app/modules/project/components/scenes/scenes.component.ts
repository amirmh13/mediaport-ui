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
import { ScenesBase } from './ScenesBase.class';
import { SceneState } from './state/Scenes.reducers';
import { episodeIdAction } from './state/Scenes.actions';

@Component({
  selector: 'app-scenes',
  templateUrl: './scenes.component.html',
  styleUrls: ['./scenes.component.scss']
})
export class ScenesComponent extends ScenesBase implements OnInit {

  episodes: EpisodeDto[] = [];
  scenesListPostBody = new ScenesListPb();
  selectedSceneId: string = '';

  constructor(
    public _router: Router,
    private _scenesService: ScenesService,
    private _episodesService: EpisodesService,
    private _store: Store<RootState>,
    private _dialog: MatDialog,
    private _utilitiesService: UtilitiesService,
  ) {
    super(_router);
  }

  getListOfEpisodes(initialize: boolean = false): void {
    this._episodesService.getListOfEpisodes(this.currentProjectId).subscribe(res => {
      this.episodes = res;

      if (this.episodes?.length && initialize) {
        this.selectedEpisodeId = this.episodes[0].id;
        this.scenesListPostBody.projectEpisodeId = this.selectedEpisodeId;

        this._store.dispatch(episodeIdAction({ episodeId: this.selectedEpisodeId }));

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
    this.scenesListPostBody.projectEpisodeId = id;

    this._store.dispatch(episodeIdAction({ episodeId: id }));
    
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

  onOpenAddSceneDialogClick(projectEpisodeSceneId?: number): void {
    const dialogRef = this._dialog.open(AddOrUpdateSceneComponent, {
      direction: 'rtl',
      minWidth: '50vw',
      maxWidth: '90vw',
    });

    dialogRef.componentInstance.currentProjectId = this.currentProjectId;
    if (projectEpisodeSceneId) dialogRef.componentInstance.projectEpisodeSceneId = projectEpisodeSceneId;

    dialogRef.componentInstance.submitEmitter.subscribe(async (addScenePb) => {
      addScenePb.projectId = this.currentProjectId;
      addScenePb.projectEpisodeId = this.selectedEpisodeId;

      if (addScenePb.projectEpisodeSceneId) await this.addSubScene(addScenePb);
      // else if(addScenePb['id'])
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
    this.onOpenAddSceneDialogClick(scene.id);
  }

  onEditScene(scene: SceneDto): void {
    const convertedScene: AddSubScenePb = {
      briefDescription: scene.briefDescription,
      dayStatusId: scene.dayStatus?.id || 0,
      editTime: scene.editTime,
      locationTypeId: scene.locationType?.id || 0,
      productionTime: scene.productionTime,
      projectLocationId: scene.mainLocation?.id || null,
      projectLocationSubalternId: scene.subLocation?.id || null,
      sceneCity: scene.sceneCity,
      sceneNote: scene.sceneNote,
      scenePageSize: scene.scenePageSize,
      sceneTime: scene.sceneTime,
      subOrder: scene.subOrder,
      projectId: this.currentProjectId,
      projectEpisodeId: this.selectedEpisodeId,
      id: scene.id
    }

    const dialogRef = this._dialog.open(AddOrUpdateSceneComponent, {
      direction: 'rtl',
      minWidth: '50vw',
      maxWidth: '90vw',
    });

    dialogRef.componentInstance.currentProjectId = this.currentProjectId;
    dialogRef.componentInstance.addScenePb = convertedScene;

    dialogRef.componentInstance.submitEmitter.subscribe(async (addScenePb) => {

      // TODO Call edit endpoint

      dialogRef.close();
      this.getListOfScenes();
    })
  }

  ngOnInit(): void {
    this._store.pipe(select(selectProjectId)).subscribe(projectId => {
      this.currentProjectId = projectId;
    })

    this.selectedMode = Mode.EDITOR;

    this.getListOfEpisodes(true);
  }

}
