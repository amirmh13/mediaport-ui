import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from './alert/alert.component';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private _dialog: MatDialog,
  ) { }

  open(title: string = '', text: string = '', negativeBtnText: string = 'بازگشت', positiveBtnText: string = 'حذف'): Promise<void> {
    return new Promise((resolve, reject) => {

      const dialogRef = this._dialog.open(AlertComponent, {
        width: '356px',
        panelClass: 'row',
        direction: 'rtl',
        scrollStrategy: new NoopScrollStrategy(),
      });

      dialogRef.componentInstance.title = title;
      dialogRef.componentInstance.text = text;
      dialogRef.componentInstance.negativeBtnText = negativeBtnText;
      dialogRef.componentInstance.positiveBtnText = positiveBtnText;

      dialogRef.componentInstance.confirmEmitter.subscribe(() => {
        resolve();
        dialogRef.close();
      });

    })
  }
}
