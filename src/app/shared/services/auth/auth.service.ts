import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserClaim } from '@shared/models';

import jwt_decode from "jwt-decode";
import { Observable } from 'rxjs';
import { AccessTokens } from 'src/app/modules/auth/models';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    /** 
     *Salt keys for Access Tokens
     */
    private tokenNameSalt: string = 'mp_a_tsffk748ad4'
    private refreshTokenNameSalt: string = 'mp_rt_rdgnkjnfdd'

    constructor(
        private _http: HttpClient,
        private router: Router,
    ) { }

    /**
     * Get Access Token
     * @returns Access Token String
     */

    get getToken(): string {
        return localStorage.getItem(this.tokenNameSalt) || '';
    }

    /**
     * Set Access Token
     */

    set setToken(token: string) {
        localStorage.setItem(this.tokenNameSalt, token);
    }

    /**
    * Get Refresh Token
    * @returns Refresh Token String
    */

    get getRefreshToken(): string {
        return localStorage.getItem(this.refreshTokenNameSalt) || '';
    }

    /**
     * Set Access Token
     */

    set setRefreshToken(token: string) {
        localStorage.setItem(this.refreshTokenNameSalt, token);
    }

    /**
     * Get User Claim
     * @returns Interface of UserClaim Object
     */

    get getUserClaim(): UserClaim {
        return jwt_decode(this.getToken);
    }

    /**
     * Check token is valid or not?
     * @returns Boolean
     */

    TokenIsExpired(): boolean {
        const expDate = this.getUserClaim.exp * 1000; //To milliseconds

        return expDate < Date.now();
    }

    /**
     * Check refresh token is valid or not?
     * @returns Boolean
     */
    refreshTokenIsExpired(): boolean {
        const decodedRefreshToken: UserClaim = jwt_decode(this.getRefreshToken);
        const expDate = decodedRefreshToken.exp * 1000; //To milliseconds

        return expDate < Date.now();
    }

    /**
    * Logout and remove access and refresh tokens from local storage
    */

    logout(): void {
        localStorage.removeItem(this.tokenNameSalt);
        localStorage.removeItem(this.refreshTokenNameSalt);

        this.router.navigateByUrl('/auth/login');
    }

    /**
     * Refresh Token Request
     * @returns AccessTokens Observable
     */

    refreshToken(body: { refreshToken: string }): Observable<AccessTokens> {
        return this._http.post<AccessTokens>(`${environment.apiBaseUrl}/v1/Account/Auth/RefreshToken`, body);
    }
}