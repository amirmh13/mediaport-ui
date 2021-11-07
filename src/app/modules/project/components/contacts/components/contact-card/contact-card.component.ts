import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ContactDto } from '../../models';

@Component({
    selector: 'app-contact-card',
    templateUrl: './contact-card.component.html',
    styleUrls: ['./contact-card.component.scss', '../../contacts.component.scss']
})
export class ContactCardComponent implements OnInit {

    @Input() contact: ContactDto | null = null;
    @Output() deleteContactEmitter = new EventEmitter<void>();
    @Output() MoveToListEmitter = new EventEmitter<void>();

    constructor() { }

    ngOnInit(): void {
    }

}
