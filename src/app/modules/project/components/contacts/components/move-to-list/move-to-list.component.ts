import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ContactsListDto } from '../../models';

@Component({
    selector: 'app-move-to-list',
    templateUrl: './move-to-list.component.html',
    styleUrls: ['./move-to-list.component.scss']
})
export class MoveToListComponent implements OnInit {

    @Input() allList: ContactsListDto[] = [];
    @Output() listIdEmitter = new EventEmitter<number>();

    cloneOfAllList: ContactsListDto[] = [];
    selectedListId: number = 0;

    constructor() { }

    onSearchList(term: string): void {
        if (term.length > 2) {
            this.allList = this.cloneOfAllList.filter(list => {
                return list.name.indexOf(term.toLowerCase()) != -1;
            })
        }
        else {
            this.allList = [...this.cloneOfAllList];
        }
    }

    ngOnInit(): void {
        this.cloneOfAllList = [...this.allList];
    }

}
