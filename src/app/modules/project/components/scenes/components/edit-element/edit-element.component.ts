import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ElementDto } from '../../../elements/models';
import { ElementsService } from '../../../elements/services/elements.service';

@Component({
  selector: 'app-edit-element',
  templateUrl: './edit-element.component.html',
  styleUrls: ['./edit-element.component.scss']
})
export class EditElementComponent implements OnInit {

  @Input() element: ElementDto = { id: 0, name: '0', scene: [] };
  @Input() projectId: number = 0;
  @Input() projectElementTypeId: number = 0;
  @Output() editIsDoneEmitter = new EventEmitter<void>();

  constructor(
    private _elementsService: ElementsService,
  ) { }

  editElement(): void {
    this._elementsService.updateElement({
      id: this.element.id,
      name: this.element.name,
      projectId: this.projectId,
      projectElementTypeId: this.projectElementTypeId,
    }).subscribe(() => {
      this.editIsDoneEmitter.emit();
    })
  }

  ngOnInit(): void {
  }

}
