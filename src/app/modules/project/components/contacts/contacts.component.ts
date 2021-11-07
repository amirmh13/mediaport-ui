import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AlertService } from '@shared/services/alert/alert.service';
import { RootState } from 'src/app/state/App.reducers';
import { selectProjectId } from '../../state/Project.selectors';
import { ContactDto, ContactsListDto, ContactsPostBody } from './models';
import { ContactsService } from './service/contacts.service';
import { MoveToListComponent } from './components/move-to-list/move-to-list.component';
import { NoopScrollStrategy } from '@angular/cdk/overlay';

@Component({
    selector: 'app-contacts',
    templateUrl: './contacts.component.html',
    styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

    currentProjectId: number = 0;
    contacts: ContactDto[] = [];
    contactsPostBody: ContactsPostBody = new ContactsPostBody();
    contactsList: ContactsListDto[] = [];

    constructor(
        private _contactService: ContactsService,
        private _store: Store<RootState>,
        private _route: ActivatedRoute,
        private _alertService: AlertService,
        private _dialog: MatDialog,
    ) { }

    getListOfContacts(): void {
        this._contactService.getListOfContacts(this.contactsPostBody).subscribe(res => {
            this.contacts = res.data;
        })
    }

    getListOfContactsList(): void {
        this._contactService.getListOfContactLists(this.currentProjectId).subscribe(res => {
            this.contactsList = res;
        })
    }

    onDeleteContactClick(contact: ContactDto): void {
        const fromListAlertTitle: string = `آیا از حذف ${contact.fullName} از این فولدر اطمینان دارید؟`;
        const fromProjectAlertTitle: string = `آیا از حذف ${contact.fullName} از پروژه اطمینان دارید؟`;
        const isList: boolean = !!this.contactsPostBody.listId;

        this._alertService.open('', isList ? fromListAlertTitle : fromProjectAlertTitle).then(result => {
            isList ? this.deleteContactFromList(contact) : this.deleteContactFromProject(contact);
        })
    }

    deleteContactFromList(contact: ContactDto): void {
        this._contactService.removeContactFromList(contact.id, Number(this.contactsPostBody.listId)).subscribe(res => {
            this.getListOfContacts();
            this.getListOfContactsList();
        })
    }

    deleteContactFromProject(contact: ContactDto): void {
        this._contactService.removeContactFromProject(contact.id).subscribe(res => {
            this.getListOfContacts();
            this.getListOfContactsList();
        })
    }

    onOpenMoveToListModal(contact: ContactDto): void {
        let allList: ContactsListDto[] = [];

        /**
         * contact lists to allList array
         */
        allList = [...allList, ...this.contactsList];

        const modalRef = this._dialog.open(MoveToListComponent, {
            direction: 'rtl',
            width: '400px',
            scrollStrategy: new NoopScrollStrategy(),
        })

         /**
         * concat list children to allList array
         */
          this.contactsList.forEach(cl => {
            if (cl.children?.length) allList = [...allList, ...cl.children];
            return
        })

        modalRef.componentInstance.allList = allList;

    }

    ngOnInit(): void {
        this._store.pipe(select(selectProjectId)).subscribe(id => {
            this.contactsPostBody.projectId = this.currentProjectId = id;
        });

        this._route.params.subscribe(params => {
            if (params.listId) this.contactsPostBody.listId = +params.listId;
            this.getListOfContacts();
        })

        this.getListOfContactsList();

    }

}
