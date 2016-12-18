import './rxjs-extensions';

import {NgModule}               from '@angular/core';
import {BrowserModule}          from '@angular/platform-browser';
import {FormsModule}            from '@angular/forms';
import {ReactiveFormsModule}    from "@angular/forms";
import {HttpModule}             from '@angular/http';
import {MaterialModule}         from '@angular/material';
import {AppRoutingModule}       from './app-routing.module';

import {AppComponent}           from './app.component';
import {DashboardComponent}     from './dashboard/dashboard.component';
import {SitesComponent}         from './site/sites.component';
import {ClientsComponent}       from './client/clients.component';
import {AdminsComponent}        from './admin/admins.component';
import {AccessesComponent}      from './access/accesses.component';
import {LoginComponent}         from './login/login.component';

import {SiteService}            from './site/site.service';
import {ClientService}          from './client/client.service';
import {AdminService}           from './admin/admin.service';
import {AccessService}          from './access/access.service';
import {LoginService}           from './login/login.service';
import {LoginStatus}          from './login/login-status.service';

import {FocusDirective}         from './directives/focus.directive';
import {ShortIdPipe}            from './pipes/short-id.pipe';
import {DeleteDialogComponent}  from './dialog/dialog.component';
import {LoginDialogComponent}   from './dialog/dialog.component';
import {HelloDialogComponent}   from './dialog/dialog.component';
import {TranslatePipe}          from './pipes/translate.pipe';
import {AppConfigProvider}      from './config/app.config.provider';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        AppRoutingModule,
        MaterialModule.forRoot()
    ],
    declarations: [
        AppComponent,
        DashboardComponent,
        SitesComponent,
        ClientsComponent,
        AdminsComponent,
        AccessesComponent,
        ShortIdPipe,
        LoginComponent,
        DeleteDialogComponent,
        LoginDialogComponent,
        HelloDialogComponent,
        FocusDirective,
        TranslatePipe
    ],
    entryComponents: [
        DeleteDialogComponent,
        LoginDialogComponent,
        HelloDialogComponent
    ],
    providers: [SiteService, ClientService, AdminService, AccessService, LoginService, LoginStatus, AppConfigProvider],
    bootstrap: [AppComponent]
})
export class AppModule {
}
