import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AlertService } from '@shared/services/alert/alert.service';
import { selectProjectId } from 'src/app/modules/project/state/Project.selectors';
import { RootState } from 'src/app/state/App.reducers';
import { AddElementPostBody, ElementDto } from '../../models';
import { ElementsService } from '../../services/elements.service';

@Component({
  selector: 'app-add-or-update-element',
  templateUrl: './add-or-update-element.component.html',
  styleUrls: ['./add-or-update-element.component.scss']
})
export class AddOrUpdateElementComponent implements OnInit {

  @Input() elementPostBody: AddElementPostBody = new AddElementPostBody();
  @Output() callListEmitter = new EventEmitter<void>();

  elements: ElementDto[] = [];
  currentProjectId: number = 0;

  colors: string[] = [
    '#ff991f',
    '#f76437',
    '#00875a',
    '#00e68b',
    '#3848e9',
    '#cea3e5',
    '#5243aa',
    '#a3a9e5',
    '#828284',
    '#2d367d',
  ];

  constructor(
    private _elementService: ElementsService,
    private _store: Store<RootState>,
    private _alertService: AlertService,
  ) { }

  getListOfElements(): void {
    this._elementService.getListOfElements({
      projectId: this.currentProjectId,
      elementTypeId: Number(this.elementPostBody.id)
    }).subscribe(res => {
      this.elements = res;
    })
  }

  onColorClick(color: string): void {
    const selectedColor: string = color.replace('#', '');

    this.elementPostBody.color = selectedColor;
  }

  onSubmitClick(): void {
    this.elementPostBody.projectId = this.currentProjectId;

    this._elementService.addElementType(this.elementPostBody).subscribe(res => {
      this.callListEmitter.emit();
    })

  }

  onDeleteElementClick(element: ElementDto): void {
    this._alertService.open('', `آیا از حذف عنصر ${element.name} اطمینان دارید؟`).then(result => {
      console.log(element);
      this.deleteElement(element.id);
    })
  }

  deleteElement(id: number): void {
    this._elementService.deleteElement({
      projectId: this.currentProjectId,
      id
    }).subscribe(res => {
      this.getListOfElements();
    })
  }

  onEditElementClick(element: ElementDto): void {
    this._elementService.updateElement({
      id: element.id,
      name: element.name,
      projectElementTypeId: Number(this.elementPostBody.id),
      projectId: this.currentProjectId
    }).subscribe(res => {
      this.getListOfElements();
    })
  }

  ngOnInit(): void {
    this._store.pipe(select(selectProjectId)).subscribe(projectId => {
      this.currentProjectId = projectId;
    })

    if (this.elementPostBody?.id) {
      this.getListOfElements();
    }
  }

}
