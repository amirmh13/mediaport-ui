import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ElementDto } from '../../../models';

@Component({
    selector: 'app-element-row',
    templateUrl: './element-row.component.html',
    styleUrls: ['./element-row.component.scss']
})
export class ElementRowComponent implements OnInit {

    @Input() element: ElementDto = {
        id: 0,
        name: '',
        scene: []
    };
    @Output() deleteEmitter = new EventEmitter < void > ();
    @Output() editEmitter = new EventEmitter < ElementDto > ();

    mode: 'default' | 'add' = 'default';

    constructor() {}

    onDeleteElementClick(): void {
        console.log('id: ' + this.element?.id);
        this.deleteEmitter.emit();
    }

    clickOutsideEvent(): void {
        if (this.mode == 'add') {
            this.mode = 'default';
            this.onChangeNameClick();
        }
    }

    onChangeNameClick(): void {
        this.mode = 'default';
        this.editEmitter.emit(this.element)
    }

    onChangeModeClick(mode: 'default' | 'add'): void {
        setTimeout(() => {
            this.mode = mode;
        }, 50);
    }

    ngOnInit(): void {}

}