import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { RootState } from 'src/app/state/App.reducers';
import { selectProjectId } from '../../state/Project.selectors';
import { AddEpisodeComponent } from './components/add-episode/add-episode.component';
import { Mode } from './models';
import { AddEpisodePb, EpisodeDto, EpisodesService } from './service/episodes.service';
import { ScenesService } from './service/scenes.service';

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

  constructor(
    private _scenesService: ScenesService,
    private _episodesService: EpisodesService,
    private _store: Store<RootState>,
    private _dialog: MatDialog,
  ) { }

  getListOfEpisodes(): void {
    this._episodesService.getListOfEpisodes(this.currentProjectId).subscribe(res => {
      this.episodes = res;
    })
  }

  async addEpisode(newEpisode: AddEpisodePb): Promise<void> {
    await this._episodesService.addEpisode(newEpisode).toPromise();
    this.getListOfEpisodes();
  }

  episodeSelectChange(id: number): void {
    console.log(id);
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
    console.log(mode);
  }

  ngOnInit(): void {
    this._store.pipe(select(selectProjectId)).subscribe(projectId => {
      this.currentProjectId = projectId;
    })

    this.selectedMode = Mode.EDITOR;

    this.getListOfEpisodes();
  }

}
