import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { HeroesComponent }      from './hero/heroes.component';
import { HeroDetailComponent }  from './hero/hero-detail.component';
import { SitesComponent }       from './site/sites.component';
import { SiteDetailComponent }       from './site/site-detail.component';
import { AccessesComponent }    from './access/accesses.component';
import { AccessDetailComponent }    from './access/access-detail.component';
import { ClientsComponent }     from './client/clients.component';
import { ClientDetailComponent }  from './client/client-detail.component';
import { AdminsComponent }       from './admin/admins.component';
import { AdminDetailComponent } from './admin/admin-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard',  component: DashboardComponent },
  { path: 'heroes',     component: HeroesComponent },
  { path: 'heroes/:id', component: HeroDetailComponent },
  { path: 'sites',     component: SitesComponent },
  { path: 'sites/:id',     component: SiteDetailComponent },
  { path: 'accesses',     component: AccessesComponent },
  { path: 'accesses/:id',     component: AccessDetailComponent },
  { path: 'clients',     component: ClientsComponent },
  { path: 'clients/:id',     component: ClientDetailComponent },
  { path: 'admins',     component: AdminsComponent },
  { path: 'admins/:id',     component: AdminDetailComponent }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
