import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '@shared/services/auth/auth.service';
import { LoginPostBody } from '../models';
import { AuthenticationService } from '../service/authentication.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    loginPostBody: LoginPostBody = {
        username: '',
        password: '',
    }

    constructor(
        private _authenticationService: AuthenticationService,
        private _router: Router,
        private _route: ActivatedRoute,
    ) { }

    onFormSubmit(loginForm: NgForm) {
        if (loginForm.valid) {
            this._authenticationService.login(this.loginPostBody).subscribe(res => {
                loginForm.resetForm();
                
                if (this._route.snapshot.queryParams?.returnUrl) {
                    this._router.navigateByUrl(this._route.snapshot.queryParams.returnUrl);
                } else {
                    this._router.navigate(['/projects/1/elements']);
                }
            })
        }
    }

    ngOnInit(): void { }

}