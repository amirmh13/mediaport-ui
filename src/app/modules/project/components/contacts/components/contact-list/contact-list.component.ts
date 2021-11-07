import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AlertService } from '@shared/services/alert/alert.service';
import { selectProjectId } from 'src/app/modules/project/state/Project.selectors';
import { RootState } from 'src/app/state/App.reducers';
import { ContactsListDto } from '../../models';
import { ContactsService } from '../../service/contacts.service';

@Component({
    selector: 'app-contact-list',
    templateUrl: './contact-list.component.html',
    styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit, OnChanges {

    @Input() currentListId: number | null = 0;
    @Input() contactsList: ContactsListDto[] = [];

    currentProjectId: number = 0;
    selectedFolderId: number | null = null;
    createNewList: boolean = false;

    constructor(
        private _contactService: ContactsService,
        private _store: Store<RootState>,
        private _router: Router,
        private _alertService: AlertService,
    ) { }

    getContactsList(): void {
        this._contactService.getListOfContactLists(this.currentProjectId).subscribe(res => {
            this.contactsList = res;
        })
    }

    onGoToListClick(list?: ContactsListDto): void {
        if (list) this._router.navigate(['projects', this.currentProjectId, 'contacts', list?.id]);
        else this._router.navigate(['projects', this.currentProjectId, 'contacts']);
    }

    onDeleteListClick(list: ContactsListDto): void {
        this._alertService.open('', `آیا از حذف لیست ${list.name} اطمینان دارید؟`).then(result => {
            console.log(list);
        })
    }

    onListItemClick(listId: number): void {
        this.createNewList = false;
        this.selectedFolderId = listId;
    }

    onAddNewListIconClick(): void {
        setTimeout(() => {
            this.createNewList = true;
        }, 50);
    }

    clickOutSideEvent(listId: number): void {
        if (this.selectedFolderId == listId && this.createNewList) {
            this.createNewList = false;
        }
    }

    onCreateNewListClick(name: string): void {
        this._contactService.addContactList({
            projectId: this.currentProjectId,
            parentListId: this.selectedFolderId ? this.selectedFolderId : null,
            name
        }).subscribe(res => {
            this.getContactsList();
            this.createNewList = false;
        })
    }

    ngOnChanges(): void {
        this.selectedFolderId = this.currentListId ? this.currentListId : null;
    }

    ngOnInit(): void {
        this._store.pipe(select(selectProjectId)).subscribe(id => {
            this.currentProjectId = id;
        })

        this.getContactsList();

    }

}
