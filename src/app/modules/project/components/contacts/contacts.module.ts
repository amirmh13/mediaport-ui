import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClickOutsideModule } from 'ng-click-outside';
import { MATERIAL_COMMON_MODULES } from 'src/app/MaterialModulesArray.const';
import { ContactCardComponent } from './components/contact-card/contact-card.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { FolderItemComponent } from './components/folder-item/folder-item.component';
import { ContactsRoutingModule } from './contacts-routing.module';
import { ContactsComponent } from './contacts.component';
import { MoveToListComponent } from './components/move-to-list/move-to-list.component';



@NgModule({
  declarations: [
    ContactsComponent,
    ContactListComponent,
    FolderItemComponent,
    ContactCardComponent,
    MoveToListComponent,
  ],
  imports: [
    CommonModule,
    ContactsRoutingModule,
    FormsModule,
    ClickOutsideModule,
    MATERIAL_COMMON_MODULES,
  ]
})
export class ContactsModule { }
