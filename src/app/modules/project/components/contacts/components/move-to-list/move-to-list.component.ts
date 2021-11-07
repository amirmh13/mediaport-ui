import { Component, Input, OnInit } from '@angular/core';
import { ContactsListDto } from '../../models';

@Component({
    selector: 'app-move-to-list',
    templateUrl: './move-to-list.component.html',
    styleUrls: ['./move-to-list.component.scss']
})
export class MoveToListComponent implements OnInit {

    @Input() allList: ContactsListDto[] = [];

    selectedListId: number = 0;

    constructor() { }

    ngOnInit(): void {
    }

}
