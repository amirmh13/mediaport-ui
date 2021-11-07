import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AccessTokens, LoginPostBody } from '../models';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    constructor(
        private _http: HttpClient,
    ) {}

    login(body: LoginPostBody): Observable < AccessTokens > {
        return this._http.post < AccessTokens > (`${environment.apiBaseUrl}/v1/Account/Auth/Login`, body)
    }
}