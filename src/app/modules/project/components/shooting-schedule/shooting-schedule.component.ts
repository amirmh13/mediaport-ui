import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { RootState } from 'src/app/state/App.reducers';
import { selectProjectId } from '../../state/Project.selectors';
import { ShootingScheduleService } from './service/shooting-schedule.service'
import { CdkDrag, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ShootingScheduleResult } from './models/ShootingScheduleResult.model';
import { DaySceneReorder } from './models/DaySceneReorder.model';
import { MatDialog } from '@angular/material/dialog';
import { SetShootingDayDateComponent } from './components/set-shooting-day-date/set-shooting-day-date.component';
import { AlertService } from '@shared/services/alert/alert.service';
import { InitShootingScheduleComponent } from './components/init-shooting-schedule/init-shooting-schedule.component';

@Component({
  selector: 'app-shooting-schedule',
  templateUrl: './shooting-schedule.component.html',
  styleUrls: ['./shooting-schedule.component.scss']
})
export class ShootingScheduleComponent implements OnInit {

  currentProjectId: number = 0;
  shootingScheduleData: ShootingScheduleResult[] | undefined;

  constructor(
    public dialog: MatDialog,
    private _store: Store<RootState>,
    private _shootingScheduleService: ShootingScheduleService,
    private _alertService: AlertService
  ) { }


  getListOfShootingScheduleDays() {
    this._shootingScheduleService.getListOfShootingScheduleDays(this.currentProjectId).subscribe(res => {
      this.shootingScheduleData = res;
    });
  }

  lockSceneReorder(sceneId: number) {
    this._shootingScheduleService.lockSceneReorder({ sceneId, projectId: this.currentProjectId }).subscribe(res => {
      this.getListOfShootingScheduleDays();
    });
  }

  unlockSceneReorder(sceneId: number) {
    this._shootingScheduleService.unlockSceneReorder({ sceneId, projectId: this.currentProjectId }).subscribe(res => {
      this.getListOfShootingScheduleDays();
    });
  }

  daySceneReorder(event: CdkDragDrop<ShootingScheduleResult>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data.scenes, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data.scenes,
        event.container.data.scenes,
        event.previousIndex,
        event.currentIndex,
      );
    }

    this._shootingScheduleService.daySceneReorder({
      projectId: this.currentProjectId,
      fromDayId: event.previousContainer.data.id,
      toDayId: event.container.data.id,
      sceneId: event.item.data.sceneId,
      order: (event.currentIndex + 1)
    }).subscribe(res => {
      this.getListOfShootingScheduleDays();
    })
  }

  setIsDone(e: any, sceneId: number) {
    this._shootingScheduleService.setSceneDone({
      done: JSON.parse(e.target.value),
      projectId: this.currentProjectId,
      sceneId: sceneId
    }).subscribe(res => { });
  }

  openSetShootDateModal(dayId: number, date?: Date) {
    const dialogRef = this.dialog.open(SetShootingDayDateComponent, {
      width: '500px',
      direction: 'rtl',
    });

    dialogRef.componentInstance.dayId = dayId;
    dialogRef.componentInstance.projectId = this.currentProjectId;
    dialogRef.componentInstance.date = date;
    dialogRef.componentInstance.setDateEmitter.subscribe(res => {
      this.getListOfShootingScheduleDays();
      dialogRef.close();
    });
  }

  addNewShootingDayConfirmModal() {
    this._alertService.open('تاییدیه', 'از افزودن روز کاری جدید اطمینان دارید؟', 'بستن', 'بله').then(res => {
      this.addNewShootingDay();
    });
  }

  addNewShootingDay() {
    this._shootingScheduleService.addNewShootingDay(this.currentProjectId).subscribe(res => {
      this.getListOfShootingScheduleDays();
    });
  }

  openInitShootingScheduleModal() {
    const dialogRef = this.dialog.open(InitShootingScheduleComponent, {
      width: '500px',
      direction: 'rtl',
      disableClose:true
    });

    dialogRef.componentInstance.projectId = this.currentProjectId;

    dialogRef.componentInstance.initShootinScheduleEmitter.subscribe(res => {
      this.getListOfShootingScheduleDays();
      dialogRef.close();
    });
  }

  ngOnInit(): void {
    this._store.pipe(select(selectProjectId)).subscribe(projectId => {
      this.currentProjectId = projectId;
    });

    this._shootingScheduleService.shootingScheduleExists(this.currentProjectId).subscribe(res => {
      if (res) {
        this.getListOfShootingScheduleDays();
      } else {
        this.openInitShootingScheduleModal();
      }
    });
  }
}
