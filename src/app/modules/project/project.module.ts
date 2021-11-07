import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { ProjectComponent } from './project-layout/project.component';
import { ProjectRoutingModule } from './project-routing.module';
import { projectReducer } from './state/Project.reducers';



@NgModule({
    declarations: [
        ProjectComponent,
    ],
    imports: [
        CommonModule,
        ProjectRoutingModule,
    ]
})
export class ProjectModule {}