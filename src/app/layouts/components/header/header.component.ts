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
    currentProjectName: string = '';

    constructor(
        private _store: Store<RootState>,
        private _route: ActivatedRoute,
    ) { }

    ngOnInit(): void {
        this._store.subscribe(res => {
            this.currentRoute = res.app.currentRoute;
            this.currentProjectName = res.project.projectName;
        })
    }

}