import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { AuthService } from '@shared/services/auth/auth.service';
import { catchError, filter, switchMap, take } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    private isRefreshing: boolean = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(
        private _authService: AuthService,
    ) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const token = this._authService.getToken;
        if (token) {
            request = this.addTokenToRequestHeaders(request, token)
        }
        return next.handle(request).pipe(catchError(error => {
            if (error instanceof HttpErrorResponse && error.status === 401) {
                return this.handle401Error(request, next);
            }

            return throwError(error);
        }));;
    }

    private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
        if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null);

            const refreshToken = this._authService.getRefreshToken;

            if (refreshToken)
                return this._authService.refreshToken({ refreshToken }).pipe(
                    switchMap((token: any) => {
                        this.isRefreshing = false;

                        this._authService.setToken = token.accessToken;
                        this.refreshTokenSubject.next(token.accessToken);

                        return next.handle(this.addTokenToRequestHeaders(request, token.accessToken));
                    }),
                    catchError((err) => {
                        this.isRefreshing = false;

                        this._authService.logout();
                        return throwError(err);
                    })
                );
        }

        return this.refreshTokenSubject.pipe(
            filter(token => token !== null),
            take(1),
            switchMap((token) => next.handle(this.addTokenToRequestHeaders(request, token)))
        );
    }

    private addTokenToRequestHeaders(request: HttpRequest<unknown>, token: string | null | unknown): HttpRequest<unknown> {
        return request.clone({
            setHeaders: {
                'Authorization': `Bearer ${token}`
            }
        })
    }
}