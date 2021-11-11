import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'mp-dialog-footer',
  templateUrl: './dialog-footer.component.html',
  styleUrls: ['./dialog-footer.component.scss']
})
export class DialogFooterComponent implements OnInit {

  @Input() submitTitle: string = 'تایید';
  @Input() disabled: boolean = false;
  @Output() onSubmit = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

}
