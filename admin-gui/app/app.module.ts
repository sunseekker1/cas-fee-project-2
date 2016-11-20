import './rxjs-extensions';

import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule}   from '@angular/forms';
import {HttpModule}    from '@angular/http';

import {AppRoutingModule}     from './app-routing.module';

// Imports for loading & configuring the in-memory web api
import {InMemoryWebApiModule} from 'angular-in-memory-web-api/in-memory-web-api.module';
import {InMemoryDataService}  from './in-memory-data.service';

import {AppComponent}         from './app.component';
import {DashboardComponent}   from './dashboard/dashboard.component';
import {SitesComponent}       from './site/sites.component';
import {SiteDetailComponent}      from './site/site-detail.component';
import {ClientsComponent}     from './client/clients.component';
import {ClientDetailComponent}      from './client/client-detail.component';
import {AdminsComponent}       from './admin/admins.component';
import {AdminDetailComponent}       from './admin/admin-detail.component';
import {AccessesComponent}    from './access/accesses.component';
import {AccessDetailComponent}    from './access/access-detail.component';

import {SiteService}         from './site/site.service';
import {ClientService}       from './client/client.service';
import {AdminService}         from './admin/admin.service';
import {AccessService}      from './access/access.service';

import { ShortIdPipe } from './short-id.pipe'; // import our pipe here

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    // InMemoryWebApiModule.forRoot(InMemoryDataService),
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    SitesComponent,
    SiteDetailComponent,
    ClientDetailComponent,
    ClientsComponent,
    AdminsComponent,
    AdminDetailComponent,
    AccessesComponent,
    AccessDetailComponent,
    ShortIdPipe
  ],
  providers: [SiteService, ClientService, AdminService, AccessService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
