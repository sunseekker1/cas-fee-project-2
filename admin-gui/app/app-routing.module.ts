import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { HeroesComponent }      from './hero/heroes.component';
import { HeroDetailComponent }  from './hero/hero-detail.component';
import { SitesComponent }       from './sites/sites.component';
import { AccessesComponent }    from './access/accesses.component';
import { ClientsComponent }     from './client/clients.component';
import { ClientDetailComponent }  from './client/client-detail.component';
import { AdminComponent }       from './admin/admin.component';
import { AdminDetailComponent } from './admin/admin-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard',  component: DashboardComponent },
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'heroes',     component: HeroesComponent },
  { path: 'sites',     component: SitesComponent },
  { path: 'access',     component: AccessesComponent },
  { path: 'clients',     component: ClientsComponent },
  { path: 'clientDetail/:id',     component: ClientDetailComponent },
  { path: 'admins',     component: AdminComponent },
  { path: 'admins/:id',     component: AdminDetailComponent }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
