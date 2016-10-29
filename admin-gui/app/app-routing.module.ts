import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { HeroesComponent }      from './hero/heroes.component';
import { HeroDetailComponent }  from './hero/hero-detail.component';
import { SitesComponent }  from './sites/sites.component';
import { AccessesComponent }  from './access/accesses.component';
import { ClientsComponent }  from './client/clients.component';
import { ClientComponent }  from './client/client.component';
import { AdminComponent }  from './admin/admin.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard',  component: DashboardComponent },
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'heroes',     component: HeroesComponent },
  { path: 'sites',     component: SitesComponent },
  { path: 'accesses',     component: AccessesComponent },
  { path: 'clients',     component: ClientsComponent },
  { path: 'client',     component: ClientComponent },
  { path: 'admin',     component: AdminComponent }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
