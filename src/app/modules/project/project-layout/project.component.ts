import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { currentRouteAction } from 'src/app/state/App.actions';
import { ProjectIdAction } from '../state/Project.actions';

@Component({
    selector: 'app-project',
    templateUrl: './project.component.html',
    styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

    constructor(
        private _route: ActivatedRoute,
        private _store: Store<{ projectId: number }>,
        private _router: Router
    ) { }

    setProjectIdToStore(): void {
        this._route.params.subscribe(({ projectId }) => {
            this._store.dispatch(ProjectIdAction({ projectId: +projectId }));
        })
    }

    setRouteNameToStore(): void {
        this._route.firstChild?.data.subscribe(data => {
            this._store.dispatch(currentRouteAction({ currentRoute: data.name }))
        })
    }

    ngOnInit(): void {
        this.setProjectIdToStore();

        this.setRouteNameToStore();
    }

}