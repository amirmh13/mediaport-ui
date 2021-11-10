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

  ngOnInit(): void {

    // this.options = [
    //   { name: 'قسمت اول', id: 1 },
    //   { name: 'قسمت دوم', id: 2 },
    //   { name: 'قسمت سوم', id: 3 },
    //   { name: 'قسمت چهارم', id: 4 },
    //   { name: 'قسمت پنجم', id: 5 },
    //   { name: 'قسمت ششم', id: 6 },
    //   { name: 'قسمت هفتم', id: 7 },
    //   { name: 'قسمت هشتم', id: 8 },
    //   { name: 'قسمت نهم', id: 9 },
    //   { name: 'قسمت دهم', id: 10 },
    // ]
  }

}
