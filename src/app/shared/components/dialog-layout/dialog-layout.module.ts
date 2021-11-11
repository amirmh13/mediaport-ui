import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogHeaderComponent } from './components/dialog-header/dialog-header.component';
import { DialogFooterComponent } from './components/dialog-footer/dialog-footer.component';



@NgModule({
  declarations: [
    DialogHeaderComponent,
    DialogFooterComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
  ],
  exports: [
    DialogHeaderComponent,
    DialogFooterComponent,
    MatButtonModule,
    MatDialogModule,
  ]
})
export class DialogLayoutModule { }
