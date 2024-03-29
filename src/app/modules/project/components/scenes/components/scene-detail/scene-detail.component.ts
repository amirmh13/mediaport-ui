import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { selectProjectId } from 'src/app/modules/project/state/Project.selectors';
import { RootState } from 'src/app/state/App.reducers';
import { ElementTypeDto } from '../../../elements/models';
import { ElementsService } from '../../../elements/services/elements.service';
import { Mode } from '../../enums';
import { AddSubScenePb, SceneDetail, SceneDto } from '../../models';
import { ScenesBase } from '../../ScenesBase.class';
import { EpisodeDto, EpisodesService } from '../../service/episodes.service';
import { ScenesService } from '../../service/scenes.service';
import { episodeIdAction } from '../../state/Scenes.actions';
import { AddElementComponent } from '../add-element/add-element.component';
import { AddOrUpdateSceneComponent } from '../add-or-update-scene/add-or-update-scene.component';

@Component({
  selector: 'app-scene-detail',
  templateUrl: './scene-detail.component.html',
  styleUrls: ['./scene-detail.component.scss', '../../scenes.component.scss']
})
export class SceneDetailComponent extends ScenesBase implements OnInit {

  episodeId: number = 0;
  sceneId: number = 0;
  sceneDetail: SceneDetail | null = null;
  episodes: EpisodeDto[] = [];
  elementTypesList: ElementTypeDto[] = [];

  constructor(
    public router: Router,
    public store: Store<RootState>,
    private _route: ActivatedRoute,
    private _scenesService: ScenesService,
    private _elementService: ElementsService,
    private _episodeService: EpisodesService,
    private _dialog: MatDialog,
  ) {
    super(router, store);
  }

  getSceneDetail(): void {
    this._scenesService.getSceneDetailWithPrevNext({
      projectId: this.currentProjectId,
      episodeId: this.episodeId,
      sceneId: this.sceneId,
    }).subscribe(res => {
      this.sceneDetail = res;
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

  getListOfElementTypesList(): void {
    this._elementService.GetListOfElementTypes(this.currentProjectId).subscribe(res => {
      this.elementTypesList = res;
    })
  }

  async episodeSelectChange(id: number): Promise<void> {
    await this.getListOfScenes();
    const firstSceneId: number | '' = this.scenesList[0]?.id || '';
    this.router.navigate(['projects', this.currentProjectId, 'episode-scenes', this.episodeId, 'detail', firstSceneId]);
  }

  onGoToNextOrPrevScene(id: number): void {
    this.router.navigate(['projects', this.currentProjectId, 'episode-scenes', this.episodeId, 'detail', id]);
  }

  onOpenAddElementDialog(): void {
    const dialogRef = this._dialog.open(AddElementComponent, {
      direction: 'rtl',
      width: '450px'
    });

    dialogRef.componentInstance.elementTypesList = this.elementTypesList;
    dialogRef.componentInstance.projectId = this.currentProjectId;
    dialogRef.componentInstance.callElementTypes.subscribe(() => {
      this.getListOfElementTypesList();
      dialogRef.close();
    })
  }

  onEditScene(): void {
    const convertedScene: AddSubScenePb = {
      briefDescription: this.sceneDetail!.briefDescription,
      dayStatusId: this.sceneDetail!.dayStatus?.id || 0,
      editTime: this.sceneDetail!.editTime,
      locationTypeId: this.sceneDetail!.locationType?.id || 0,
      productionTime: this.sceneDetail!.productionTime,
      projectLocationId: this.sceneDetail!.mainLocation?.id || null,
      projectLocationSubalternId: this.sceneDetail!.subLocation?.id || null,
      sceneCity: this.sceneDetail!.sceneCity,
      sceneNote: this.sceneDetail!.sceneNote,
      scenePageSize: this.sceneDetail!.scenePageSize,
      sceneTime: this.sceneDetail!.sceneTime,
      subOrder: this.sceneDetail!.subOrder,
      projectId: this.currentProjectId,
      projectEpisodeId: this.selectedEpisodeId,
      id: this.sceneDetail!.id
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
    this.store.pipe(select(selectProjectId)).subscribe(projectId => {
      this.currentProjectId = projectId;
      this.getListOfEpisodes();
      this.getListOfElementTypesList();
    })

    this._route.params.subscribe(params => {
      this.sceneDetail = null;

      this.episodeId = +params.episodeId;
      this.sceneId = +params.sceneId;
      console.log(this.episodeId, this.sceneId);
      

      if (this.episodeId && this.sceneId) {
        this.getSceneDetail();
        this.getListOfScenes();

        this.store.dispatch(episodeIdAction({ episodeId: this.episodeId }));
      }
    })

    this.selectedMode = Mode.CHOPPING;
  }

}
