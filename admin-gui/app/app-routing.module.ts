import {NgModule}             from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent}   from './dashboard/dashboard.component';
import {SitesComponent}       from './site/sites.component';
import {AccessesComponent}    from './access/accesses.component';
import {ClientsComponent}     from './client/clients.component';
import {AdminsComponent}      from './admin/admins.component';
import {LoginComponent}       from './login/login.component';
import {LoginStatus}        from './login/login-status.service';

const routes: Routes = [
    // {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: '', component: LoginComponent},
    {path: 'login', component: LoginComponent},
    {path: 'dashboard', component: DashboardComponent, canActivate: [LoginStatus]},
    {path: 'sites', component: SitesComponent, canActivate: [LoginStatus]},
    {path: 'accesses', component: AccessesComponent, canActivate: [LoginStatus]},
    {path: 'clients', component: ClientsComponent, canActivate: [LoginStatus]},
    {path: 'admins', component: AdminsComponent, canActivate: [LoginStatus]},
    {path: '**', component: LoginComponent}

];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
