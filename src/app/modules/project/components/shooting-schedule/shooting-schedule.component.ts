import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { RootState } from 'src/app/state/App.reducers';
import { selectProjectId } from '../../state/Project.selectors';
import { ShootingScheduleService } from './service/shooting-schedule.service'
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ShootingScheduleResult } from './models/ShootingScheduleResult.model';

@Component({
  selector: 'app-shooting-schedule',
  templateUrl: './shooting-schedule.component.html',
  styleUrls: ['./shooting-schedule.component.scss']
})
export class ShootingScheduleComponent implements OnInit {

  currentProjectId: number = 0;
  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];
  shootingScheduleData: ShootingScheduleResult[] | undefined;

  constructor(
    private _store: Store<RootState>,
    private _shootingScheduleService: ShootingScheduleService,
  ) { }


  getListOfShootingScheduleDays() {
    this._shootingScheduleService.getListOfShootingScheduleDays(this.currentProjectId).subscribe(res => {
      this.shootingScheduleData = res;
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    console.log(event);

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
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
