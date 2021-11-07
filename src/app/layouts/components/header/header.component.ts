import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { RootState } from 'src/app/state/App.reducers';
import { selectCurrentRoute } from 'src/app/state/App.selectors';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    currentRoute: string = '';

    constructor(
        private store: Store < RootState > ,
        private route:ActivatedRoute,
    ) {}

    ngOnInit(): void {
        this.store.pipe(
            select(selectCurrentRoute)
        ).subscribe(res => {
            this.currentRoute = res;
        })
    }

}