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
        private route: ActivatedRoute,
        private store: Store < { projectId: number } > ,
        private router:Router
    ) {}

    setProjectIdTpStore(): void {
        this.route.params.subscribe(({ projectId }) => {
            this.store.dispatch(ProjectIdAction({ projectId: +projectId }));
        })
    }

    setRouteNameToStore(): void {
        this.route.firstChild?.data.subscribe(data => {
            this.store.dispatch(currentRouteAction({ currentRoute: data.name }))
        })
    }

    ngOnInit(): void {
        this.setProjectIdTpStore();

        this.setRouteNameToStore();
    }

}