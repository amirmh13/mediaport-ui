import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { AppInterceptor } from '@shared/interceptors/app/app.interceptor';
import { AuthInterceptor } from '@shared/interceptors/auth/auth.interceptor';
import { ErrorInterceptor } from '@shared/interceptors/error/error.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutsModule } from './layouts/layouts.module';
import { projectReducer } from './modules/project/state/Project.reducers';
import { ErrorSnackBarComponent } from './shared/interceptors/error/error-snack-bar/error-snack-bar.component';
import { AlertComponent } from './shared/services/alert/alert/alert.component';
import { appReducer } from './state/App.reducers';


@NgModule({
    declarations: [
        AppComponent,
        ErrorSnackBarComponent,
        AlertComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        LayoutsModule,
        HttpClientModule,
        StoreModule.forRoot({ project: projectReducer, app: appReducer }),
        BrowserAnimationsModule,
        MatSnackBarModule,
        MatButtonModule,
        MatDialogModule,
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}