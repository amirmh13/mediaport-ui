import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Scene } from '../../models/ShootingScheduleResult.model';
import { ShootingScheduleService } from '../../service/shooting-schedule.service';

@Component({
  selector: 'app-shooting-scene-row',
  templateUrl: './shooting-scene-row.component.html',
  styleUrls: ['./shooting-scene-row.component.scss']
})
export class ShootingSceneRowComponent implements OnInit {

  @Input() currentProjectId: number = 0;
  @Input() scene!: Scene;
  @Output() getListOfShootingScheduleEmitter = new EventEmitter<void>();

  constructor(private _shootingScheduleService: ShootingScheduleService) { }

  setIsDone(e: any, sceneId: number) {
    this._shootingScheduleService.setSceneDone({
      done: JSON.parse(e.target.value),
      projectId: this.currentProjectId,
      sceneId: sceneId
    }).subscribe(res => { });
  }

  lockSceneReorder(sceneId: number) {
    this._shootingScheduleService.lockSceneReorder({ sceneId, projectId: this.currentProjectId }).subscribe(res => {
      this.getListOfShootingScheduleEmitter.emit();
    });
  }

  unlockSceneReorder(sceneId: number) {
    this._shootingScheduleService.unlockSceneReorder({ sceneId, projectId: this.currentProjectId }).subscribe(res => {
      this.getListOfShootingScheduleEmitter.emit();
    });
  }

  ngOnInit(): void {
  }

}
