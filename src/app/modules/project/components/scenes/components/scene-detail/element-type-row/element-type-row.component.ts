import { Component, Input, OnInit } from '@angular/core';
import { ElementTypeDto } from '../../../../elements/models';

@Component({
  selector: 'app-element-type-row',
  templateUrl: './element-type-row.component.html',
  styleUrls: ['./element-type-row.component.scss']
})
export class ElementTypeRowComponent implements OnInit {

  @Input() elementType: ElementTypeDto | null = null;

  constructor() { }

  ngOnInit(): void {
  }

}
