import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { SnackbarComponent } from '@shared/components/snackbar/snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class SwalService {

  private _snackbarConfig: MatSnackBarConfig = {
    duration: 5 * 1000, // 5 Seconds
    direction: 'rtl',
    horizontalPosition: 'right',
  }

  private _successPanelClass: string[] = ['bg-success', 'bg-opacity-75'];
  private _dangerPanelClass: string[] = ['bg-danger', 'bg-opacity-75'];

  constructor(
    private _snackBar: MatSnackBar
  ) { }

  show(title: string): void {
    const ref = this._snackBar.openFromComponent(SnackbarComponent, this._snackbarConfig);

    ref.instance.message = title || 'خطایی رخ داد!';
  }

  error(title: string): void {
    this._snackbarConfig.panelClass = this._dangerPanelClass;
    this.show(title);
  }

  success(title: string): void {
    this._snackbarConfig.panelClass = this._successPanelClass;
    this.show(title);
  }
}
