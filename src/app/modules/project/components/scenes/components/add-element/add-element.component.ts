import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AddElementPb, ElementTypeDto } from '../../../elements/models';
import { ElementsService } from '../../../elements/services/elements.service';

@Component({
  selector: 'app-add-element',
  templateUrl: './add-element.component.html',
  styleUrls: ['./add-element.component.scss']
})
export class AddElementComponent implements OnInit {

  @Input() projectId: number = 0;
  @Input() elementTypesList: ElementTypeDto[] = [];
  @Output() callElementTypes = new EventEmitter<void>();

  cloneOfElementTypesList: ElementTypeDto[] = [];
  selectedElementType: number = 0;
  addElementPb = new AddElementPb();

  constructor(
    private _elementService: ElementsService,
  ) { }

  onSubmitClick(): void {
    console.log('submitted!');
    this._elementService.addElement(this.addElementPb).subscribe(res => {
      this.callElementTypes.emit();
    })
  }

  onSearchList(term: string): void {
    if (term.length > 2) {
      this.elementTypesList = this.cloneOfElementTypesList.filter(elementType => {
        return elementType.name.indexOf(term.toLowerCase()) != -1;
      })
    }
    else {
      this.elementTypesList = [...this.cloneOfElementTypesList];
    }
  }

  ngOnInit(): void {
    this.cloneOfElementTypesList = [...this.elementTypesList];
    this.addElementPb.projectId = this.projectId;
  }

}
