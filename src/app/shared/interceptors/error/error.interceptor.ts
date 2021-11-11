import { Component, Inject, Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MatSnackBar, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { ErrorSnackBarComponent } from './error-snack-bar/error-snack-bar.component';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private _snackBar: MatSnackBar
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err: HttpEvent<any>) => {

        if (err instanceof HttpErrorResponse && err.status !== 401) {
          const ref = this._snackBar.openFromComponent(ErrorSnackBarComponent, {
            duration: 5 * 1000, //5 Second
            panelClass: ['bg-danger', 'bg-opacity-75'],
            direction: 'rtl',
            horizontalPosition: 'right',
          });

          ref.instance.message = err.error.message || 'خطایی رخ داد!';

        }

        return throwError(err);

      }))
  }


}
