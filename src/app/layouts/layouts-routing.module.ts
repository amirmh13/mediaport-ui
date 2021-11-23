import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@shared/guards/auth/auth.guard';
import { EmptyComponent } from './empty/empty.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: '/auth/login' },

    // Empty Layout
    {
        path: '',
        component: EmptyComponent,
        children: [
            { path: 'auth/login', loadChildren: () => import('../modules/auth/login/login.module').then(m => m.LoginModule) },
            { path: 'error', loadChildren: () => import('../modules/error/error.module').then(m => m.ErrorModule) },
        ],
    },

    // Main Layout
    {
        path: '',
        component: MainComponent,
        canActivate: [AuthGuard],
        children: [{
            path: 'projects/:projectId',
            loadChildren: () => import('../modules/project/project.module').then(m => m.ProjectModule),
        },]
    },
    { path: '**', pathMatch: 'full', redirectTo: '/error' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutsRoutingModule { }