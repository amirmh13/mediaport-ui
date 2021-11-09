import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ShootingScheduleService } from '../../service/shooting-schedule.service';

@Component({
  selector: 'app-set-shooting-day-date',
  templateUrl: './set-shooting-day-date.component.html',
  styleUrls: ['./set-shooting-day-date.component.scss']
})
export class SetShootingDayDateComponent implements OnInit {

  @Input() projectId: number = 0;
  @Input() dayId: number = 0;
  @Input() date?: Date;
  @Output() setDateEmitter = new EventEmitter<void>();

  constructor(private _shootingScheduleService: ShootingScheduleService) { }

  onSubmitFormClick(setDateFrom: NgForm): void {
    this._shootingScheduleService.setShootingScheduleDayDate({
      date: this.date ?? new Date(),
      id: this.dayId,
      projectId: this.projectId
    }).subscribe(res => {
      this.setDateEmitter.emit();
    });
  }

  ngOnInit(): void {
  }
}
