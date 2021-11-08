import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { RootState } from 'src/app/state/App.reducers';
import { selectProjectId } from '../../state/Project.selectors';
import { ShootingScheduleService } from './service/shooting-schedule.service'
import { CdkDrag, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ShootingScheduleResult } from './models/ShootingScheduleResult.model';
import { DaySceneReorder } from './models/DaySceneReorder.model';

@Component({
  selector: 'app-shooting-schedule',
  templateUrl: './shooting-schedule.component.html',
  styleUrls: ['./shooting-schedule.component.scss']
})
export class ShootingScheduleComponent implements OnInit {

  currentProjectId: number = 0;
  shootingScheduleData: ShootingScheduleResult[] | undefined;
  mamad: string = "1";
  constructor(
    private _store: Store<RootState>,
    private _shootingScheduleService: ShootingScheduleService,
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
    console.log(e.target.value);

  }

  ngOnInit(): void {
    this._store.pipe(select(selectProjectId)).subscribe(projectId => {
      this.currentProjectId = projectId;
    })

    this._shootingScheduleService.shootingScheduleExists(this.currentProjectId).subscribe(res => {
      if (res) {
        this.getListOfShootingScheduleDays();
      } else {
        //open modal
      }
    });
  }
}
