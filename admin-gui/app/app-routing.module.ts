import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { SitesComponent }       from './site/sites.component';
import { AccessesComponent }    from './access/accesses.component';
import { ClientsComponent }     from './client/clients.component';
import { AdminsComponent }       from './admin/admins.component';
import { LoginComponent }       from './authentication/login.component';
import { PrivateComponent }       from './authentication/private.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard',  component: DashboardComponent },
  { path: 'sites',     component: SitesComponent },
  { path: 'accesses',     component: AccessesComponent },
  { path: 'clients',     component: ClientsComponent },
  { path: 'admins',     component: AdminsComponent },
  { path: 'login',     component: LoginComponent },
  { path: 'home',     component: PrivateComponent }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
