import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@shared/services/auth/auth.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AccessTokens, LoginPostBody } from '../models';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    constructor(
        private _http: HttpClient,
        private _authService: AuthService,
    ) { }

    login(body: LoginPostBody): Observable<AccessTokens> {
        return this._http.post<AccessTokens>(`${environment.apiBaseUrl}/v1/Account/Auth/Login`, body).pipe(
            tap(response => {
                this._authService.setToken = response.accessToken;
                this._authService.setRefreshToken = response.refreshToken;
            })
        )
    }
}