import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-init-shooting-schedule',
  templateUrl: './init-shooting-schedule.component.html',
  styleUrls: ['./init-shooting-schedule.component.scss']
})
export class InitShootingScheduleComponent implements OnInit {
 
  @Input() projectId: number = 0;
  @Output() initShootinScheduleEmitter = new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void {
  }
}
