import { Component, ContentChild, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, TemplateRef } from '@angular/core';

@Component({
  selector: 'mp-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.scss']
})
export class CustomSelectComponent implements OnInit, OnChanges {

  @Input('labelKey') labelKey: string = 'name';
  @Input('idKey') idKey: string = 'id';
  @Input() extraLabel: string = '';
  @Input() options: any[] = [];
  @Input() placeHolder: string = 'انتخاب کنید';
  @Input() model: any;
  @Output() modelChange = new EventEmitter<any>();
  @ContentChild('optionsTemp') optionsTemp: TemplateRef<ElementRef> | null = null;

  isOpen: boolean = false;
  label: string = '';

  constructor() { }

  fillLabel(): void {
    const foundedItem = this.options?.find(option => option[this.idKey] == this.model);
    this.label = foundedItem ? foundedItem[this.labelKey] : this.placeHolder;
  }

  onOptionClick(item: any): void {
    this.model = item[this.idKey];
    this.label = item[this.labelKey];
    this.modelChange.emit(this.model);

    this.isOpen = false;
  }

  ngOnChanges(): void {
    this.fillLabel();
  }

  ngOnInit(): void { }

}
