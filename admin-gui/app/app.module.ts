  import './rxjs-extensions';

import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { HeroSearchComponent } from './hero/hero-search.component';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api/in-memory-web-api.module';
import { InMemoryDataService }  from './in-memory-data.service';

import { AppComponent }         from './app.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { HeroesComponent }      from './hero/heroes.component';
import { HeroDetailComponent }  from './hero/hero-detail.component';
import { SitesComponent }  from './sites/sites.component';
import { ClientsComponent }  from './client/clients.component';
import { ClientComponent }  from './client/client.component';
import { AdminComponent }  from './admin/admin.component';
import { AccessesComponent }  from './access/accesses.component';

import { HeroService }          from './hero/hero.service';
  import { SitesService }          from './sites/sites.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    HeroDetailComponent,
    HeroesComponent,
    HeroSearchComponent,
    SitesComponent,
    ClientComponent,
    ClientsComponent,
    AdminComponent,
    AccessesComponent
  ],
  providers: [ HeroService, SitesService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
