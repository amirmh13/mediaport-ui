import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { openCloseAnimation } from '@shared/animations';
import { AlertService } from '@shared/services/alert/alert.service';
import { ElementDto, ElementTypeDto } from '../../../elements/models';
import { ElementsService } from '../../../elements/services/elements.service';
import { EditElementComponent } from '../edit-element/edit-element.component';

@Component({
  selector: 'app-element-type-row',
  templateUrl: './element-type-row.component.html',
  styleUrls: ['./element-type-row.component.scss'],
  animations: [openCloseAnimation]
})
export class ElementTypeRowComponent implements OnInit {

  @Input() elementType: ElementTypeDto | null = null;
  @Input() projectId: number = 0;

  isOpen: boolean = false;
  elementsList: ElementDto[] = [];

  constructor(
    private _elementsService: ElementsService,
    private _alertService: AlertService,
    private _dialog: MatDialog,
  ) { }

  onOpenElementsListClick(): void {
    if (!this.isOpen) {
      if (this.elementsList?.length) this.isOpen = true;
      else this.getListOfElements();
    } else this.isOpen = false;
  }

  getListOfElements(): void {
    this._elementsService.getListOfElements({
      elementTypeId: Number(this.elementType?.id),
      projectId: this.projectId,
    }).subscribe(res => {
      this.elementsList = res;
      this.isOpen = true;
    })
  }

  onDeleteClick(element: ElementDto): void {
    this._alertService.open('', `آیا از حذف عنصر ${element.name} اطمینان دارید؟`).then(() => {
      this._elementsService.deleteElement({ projectId: this.projectId, id: element.id }).subscribe(() => {
        this.getListOfElements();

        if (this.elementType?.elementCount) this.elementType.elementCount -= 1;
      })
    })
  }

  onEditClick(element: ElementDto): void {
    const dialogRef = this._dialog.open(EditElementComponent, {
      direction: 'rtl',
      minWidth: '450px'
    });

    dialogRef.componentInstance.element = { ...element };
    dialogRef.componentInstance.projectId = this.projectId;
    dialogRef.componentInstance.projectElementTypeId = Number(this.elementType?.id);
    dialogRef.componentInstance.editIsDoneEmitter.subscribe(() => {
      this.getListOfElements();
      dialogRef.close();
    })
  }

  ngOnInit(): void { }

}
