import './rxjs-extensions';

import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule}   from '@angular/forms';
import {HttpModule}    from '@angular/http';

import {AppRoutingModule}     from './app-routing.module';
import {HeroSearchComponent}  from './hero/hero-search.component';

// Imports for loading & configuring the in-memory web api
import {InMemoryWebApiModule} from 'angular-in-memory-web-api/in-memory-web-api.module';
import {InMemoryDataService}  from './in-memory-data.service';

import {AppComponent}         from './app.component';
import {DashboardComponent}   from './dashboard/dashboard.component';
import {HeroesComponent}      from './hero/heroes.component';
import {HeroDetailComponent}  from './hero/hero-detail.component';
import {SitesComponent}       from './sites/sites.component';
import {ClientsComponent}     from './client/clients.component';
import {ClientDetailComponent}      from './client/client-detail.component';
import {AdminComponent}       from './admin/admin.component';
import {AdminDetailComponent}       from './admin/admin-detail.component';
import {AccessesComponent}    from './access/accesses.component';

import {HeroService}          from './hero/hero.service';
import {SitesService}         from './sites/sites.service';
import {ClientsService}       from './client/clients.service';
import {AdminService}         from './admin/admin.service';
import {AccessesService}      from './access/accesses.service';

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
    HeroDetailComponent,
    HeroesComponent,
    HeroSearchComponent,
    SitesComponent,
    ClientDetailComponent,
    ClientsComponent,
    AdminComponent,
    AdminDetailComponent,
    AccessesComponent
  ],
  providers: [HeroService, SitesService, ClientsService, AdminService, AccessesService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
