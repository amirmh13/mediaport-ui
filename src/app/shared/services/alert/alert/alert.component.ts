import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  @Input() title: string = '';
  @Input() text: string = '';
  @Input() negativeBtnText: string = '';
  @Input() positiveBtnText: string = '';
  @Output() confirmEmitter = new EventEmitter<void>();

  constructor(
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

}
