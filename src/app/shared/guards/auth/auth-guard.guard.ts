import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '@shared/services/auth/auth.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

    constructor(
        private _authService: AuthService,
        private router: Router,
    ) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable < boolean | UrlTree > | Promise < boolean | UrlTree > | boolean | UrlTree {
          
        if (this._authService.getToken && !this._authService.refreshTokenIsExpired()) return true;
        
       else {
            this.router.navigateByUrl('/auth/login');
            return false;
        }
    }

}