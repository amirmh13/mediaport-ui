import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutesEnum } from '@shared/enums';
import { AuthGuardGuard } from '@shared/guards/auth/auth-guard.guard';
import { ProjectComponent } from './project-layout/project.component';

const routes: Routes = [{
    path: '',
    component: ProjectComponent,
    children: [{
            path: 'elements',
            canActivate: [AuthGuardGuard],
            loadChildren: () => import('../project/components/elements/elements.module').then(m => m.ElementsModule),
            data: { name: 'اجزای فیلم' }
        },
        {
            path: 'locations',
            canActivate: [AuthGuardGuard],
            loadChildren: () => import('../project/components/locations/locations.module').then(m => m.LocationsModule),
            data: { name: 'لوکیشن‌ها' }
        },
        {
            path: 'transactions',
            canActivate: [AuthGuardGuard],
            loadChildren: () => import('../project/components/transactions/transactions.module').then(m => m.TransactionsModule),
            data: { name: 'مالی' }
        },
        {
            path: 'contacts',
            canActivate: [AuthGuardGuard],
            loadChildren: () => import('../project/components/contacts/contacts.module').then(m => m.ContactsModule),
            data: { name: 'مخاطبین پروژه' }
        },
        {
            path: 'shooting-schedule',
            canActivate: [AuthGuardGuard],
            loadChildren: () => import('../project/components/shooting-schedule/shooting-schedule.module').then(m => m.ShootingScheduleModule),
            data: { name: 'برنامه ریزی' }
        },
        {
            path: 'scenes',
            canActivate: [AuthGuardGuard],
            loadChildren: () => import('../project/components/scenes/scenes-routing.module').then(m => m.ScenesRoutingModule),
            data: { name: 'فیلم نامه' }
        },
        // { path: '**', redirectTo: `${RoutesEnum.elements}`, pathMatch: 'full' }
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProjectRoutingModule {}