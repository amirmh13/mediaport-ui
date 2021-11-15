import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ElementTypeDto } from '../../models';

@Component({
  selector: 'app-element-type-card',
  templateUrl: './element-type-card.component.html',
  styleUrls: ['./element-type-card.component.scss']
})
export class ElementTypeCardComponent implements OnInit {

  @Input() elementType: ElementTypeDto | null = null;
  @Output() elementTypeClickEmitter = new EventEmitter<ElementTypeDto | null>();
  @Output() removeEmitter = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

}
