import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
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
        private _authService: AuthService,
        private _router: Router,
    ) {}

    onFormSubmit(loginForm: NgForm) {
        if (loginForm.valid) {
            this._authenticationService.login(this.loginPostBody).subscribe(res => {
                this._authService.setToken = res.accessToken;
                this._authService.setRefreshToken = res.refreshToken;
                loginForm.resetForm();
                this._router.navigate(['/projects/1/elements']);
            })
        }
    }

    ngOnInit(): void {}

}