import './rxjs-extensions';

import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule}   from '@angular/forms';
import {ReactiveFormsModule} from "@angular/forms";
import {HttpModule}    from '@angular/http';
import {MaterialModule} from '@angular/material';

import {AppRoutingModule}     from './app-routing.module';

import {AppComponent}         from './app.component';
import {DashboardComponent}   from './dashboard/dashboard.component';
import {SitesComponent}       from './site/sites.component';
import {ClientsComponent}     from './client/clients.component';
import {AdminsComponent}       from './admin/admins.component';
import {AccessesComponent}    from './access/accesses.component';
import {LoginComponent} from './login/login.component';

import {SiteService}         from './site/site.service';
import {ClientService}       from './client/client.service';
import {AdminService}         from './admin/admin.service';
import {AccessService}      from './access/access.service';
import {LoginService}      from './login/login.service';
import {LoggedInGuard}        from './login/logged-in.guard';
import {ShortIdPipe} from './short-id.pipe'; // import our pipe here
import {DialogComponent} from './dialog/dialog.component';

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
        DialogComponent
    ],
    entryComponents: [
        DialogComponent
    ],
    providers: [SiteService, ClientService, AdminService, AccessService, LoginService, LoggedInGuard],
    bootstrap: [AppComponent]
})
export class AppModule {
}
