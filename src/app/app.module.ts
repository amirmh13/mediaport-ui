import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { MaterialPersianDateAdapter, PERSIAN_DATE_FORMATS } from '@shared/classes';
import { AppInterceptor } from '@shared/interceptors/app/app.interceptor';
import { AuthInterceptor } from '@shared/interceptors/auth/auth.interceptor';
import { ErrorInterceptor } from '@shared/interceptors/error/error.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutsModule } from './layouts/layouts.module';
import { getPersianPaginatorIntl } from './MaterialModulesArray.const';
import { projectReducer } from './modules/project/state/Project.reducers';
import { SnackbarComponent } from './shared/components/snackbar/snackbar.component';
import { AlertComponent } from './shared/services/alert/alert/alert.component';
import { appReducer } from './state/App.reducers';


@NgModule({
    declarations: [
        AppComponent,
        SnackbarComponent,
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
        { provide: MatPaginatorIntl, useValue: getPersianPaginatorIntl() },
        { provide: DateAdapter, useClass: MaterialPersianDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: PERSIAN_DATE_FORMATS }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }