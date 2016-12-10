import {NgModule}             from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent}   from './dashboard/dashboard.component';
import {SitesComponent}       from './site/sites.component';
import {AccessesComponent}    from './access/accesses.component';
import {ClientsComponent}     from './client/clients.component';
import {AdminsComponent}       from './admin/admins.component';
import {LoginComponent}       from './login/login.component';
import { LoggedInGuard }        from './login/logged-in.guard';

const routes: Routes = [
    {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'dashboard', component: DashboardComponent, canActivate: [LoggedInGuard] },
    {path: 'sites', component: SitesComponent, canActivate: [LoggedInGuard] },
    {path: 'accesses', component: AccessesComponent, canActivate: [LoggedInGuard] },
    {path: 'clients', component: ClientsComponent, canActivate: [LoggedInGuard] },
    {path: 'admins', component: AdminsComponent, canActivate: [LoggedInGuard] },

];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
