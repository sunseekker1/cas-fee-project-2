import './rxjs-extensions';

import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule}   from '@angular/forms';
import {HttpModule}    from '@angular/http';

import {AppRoutingModule}     from './app-routing.module';

import {AppComponent}         from './app.component';
import {DashboardComponent}   from './dashboard/dashboard.component';
import {SitesComponent}       from './site/sites.component';
import {ClientsComponent}     from './client/clients.component';
import {AdminsComponent}       from './admin/admins.component';
import {AccessesComponent}    from './access/accesses.component';

import {SiteService}         from './site/site.service';
import {ClientService}       from './client/client.service';
import {AdminService}         from './admin/admin.service';
import {AccessService}      from './access/access.service';

import {ShortIdPipe} from './short-id.pipe'; // import our pipe here

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        DashboardComponent,
        SitesComponent,
        ClientsComponent,
        AdminsComponent,
        AccessesComponent,
        ShortIdPipe
    ],
    providers: [SiteService, ClientService, AdminService, AccessService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
