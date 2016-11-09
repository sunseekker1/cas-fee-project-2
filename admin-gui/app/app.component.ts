import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  template: `
    <h1>{{title}}</h1>
    
    
    <nav>
      <h3>Client Navigation</h3>
      <a routerLink="/sites" routerLinkActive="active">Sites</a>
      <a routerLink="/access" routerLinkActive="active">Access</a>
      <a routerLink="/clients" routerLinkActive="active">Client</a>
    </nav>
    
    <nav>
      <h3>Admin Navigation</h3>
      <a routerLink="/sites" routerLinkActive="active">Sites</a>
      <a routerLink="/access" routerLinkActive="active">Access</a>
      <a routerLink="/clients" routerLinkActive="active">Clients</a>
      <a routerLink="/admins" routerLinkActive="active">Admin</a>
    </nav>
    <router-outlet></router-outlet>
    <nav>
      <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
      <a routerLink="/heroes" routerLinkActive="active">Heroes</a>
    </nav>
  `,
  styleUrls: ['app.component.css'],
})
export class AppComponent {
  title = 'FastLogin';
}
