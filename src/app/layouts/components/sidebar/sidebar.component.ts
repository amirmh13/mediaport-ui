import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { selectProjectId } from 'src/app/modules/project/state/Project.selectors';
import { currentRouteAction } from 'src/app/state/App.actions';
import { RootState } from 'src/app/state/App.reducers';

interface sidebarItem {
    title: string;
    iconName: string;
    route: string;
}

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

    currentProjectId: number = 0;

    sidebarItems: sidebarItem[] = [
        { title: 'داشبورد', iconName: 'open-folder', route: '' },
        { title: 'تقویم پروژه', iconName: 'date', route: '' },
        { title: 'مخاطبین پروژه', iconName: 'contact', route: 'contacts' },
        { title: 'فیلم نامه', iconName: 'reader', route: '' },
        { title: 'برنامه ریزی', iconName: 'page-collection', route: '' },
        { title: 'گزارش برنامه ریزی', iconName: 'clipboard', route: '' },
        { title: 'اجزای فیلم', iconName: 'setting', route: 'elements' },
        { title: 'لوکیشن‌ها', iconName: 'location', route: 'locations' },
        { title: 'اطلاعات صحنه', iconName: 'setting', route: '' },
        { title: 'مالی', iconName: 'credit-card', route: 'transactions' },
    ];

    constructor(
        private store: Store < RootState > ,
        private router: Router,
    ) {}

    onSidebarItemClick(item: sidebarItem): void {
        this.store.dispatch(currentRouteAction({ currentRoute: item.title }));
    }

    ngOnInit(): void {
        this.store.pipe(
            select(selectProjectId)
        ).subscribe(res => {
            this.currentProjectId = res;
        })
    }

}