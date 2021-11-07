import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutsRoutingModule } from './layouts-routing.module';
import { MainComponent } from './main/main.component';
import { EmptyComponent } from './empty/empty.component';
import { SidebarModule } from './components/sidebar/sidebar.module';
import { HeaderModule } from './components/header/header.module';


@NgModule({
    declarations: [
        MainComponent,
        EmptyComponent
    ],
    imports: [
        CommonModule,
        LayoutsRoutingModule,

        SidebarModule,
        HeaderModule,
    ]
})
export class LayoutsModule {}