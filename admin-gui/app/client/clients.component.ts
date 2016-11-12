import { Component, OnInit } from '@angular/core';
import { Client } from './client';
import { ClientsService } from './clients.service';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  templateUrl: 'clients.component.html',
  styleUrls: [ 'clients.component.css' ]
})
export class ClientsComponent implements OnInit {
  clients: Client[];
  selectedClient: Client;

  constructor(
    private router: Router,
    private clientService: ClientsService) { }

  getClientes(): void {
    this.clientService.getClients().then(clients => this.mapResult(clients));
  }

  mapResult(result: any): void{
    let mapped: any = [];

    for (let client of result) {

      mapped.push({
        id: client._id,
        shortId: client._id.substring(21, 25),
        username: client.username,
        password: client.password,
        email: client.email
      });
    }
    this.clients = mapped;
  }

  ngOnInit(): void {
    this.getClientes();
  }

  onSelect(hero: Client): void {
    this.selectedClient = hero;
  }

  gotoDetail(): void {
    this.router.navigate(['/clientDetail', this.selectedClient.id]);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.clientService.create(name)
      .then(hero => {
        this.clients.push(hero);
        this.selectedClient = null;
      });
  }

  delete(hero: Client): void {
    this.clientService
      .delete(hero.id)
      .then(() => {
        this.clients = this.clients.filter(h => h !== hero);
        if (this.selectedClient === hero) { this.selectedClient = null; }
      });
  }

}

