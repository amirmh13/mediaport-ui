import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from '@shared/guards/auth/auth-guard.guard';
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
        ],


    },

    // Main Layout
    {
        path: '',
        component: MainComponent,
        canActivate: [AuthGuardGuard],
        children: [{
            path: 'projects/:projectId',
            loadChildren: () => import('../modules/project/project.module').then(m => m.ProjectModule),
        },]
    },
    // { path: '**', pathMatch: 'full', redirectTo: '/auth/login' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutsRoutingModule { }