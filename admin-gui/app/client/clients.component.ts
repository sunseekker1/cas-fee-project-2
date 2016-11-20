import { Component, OnInit } from '@angular/core';
import { Client } from './client';
import { ClientService } from './client.service';
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
    private clientService: ClientService) { }

  getClientes(): void {
    this.clientService.getClients().then(clients => this.mapResult(clients));
  }

  mapResult(result: any): void{
    let mapped: any = [];

    for (let client of result) {

      mapped.push({
        _id: client._id,
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
    this.router.navigate(['/clients', this.selectedClient.id]);
  }

  add(client: Client): void {
    client.username = client.username.trim();
    if (!client.username || !client.password || !client.email) {
      return;
    }
    this.clientService.create(client)
      .then((client) => {
        client.shortId = client._id.substring(21, 25);
        this.clients.push(client);
        this.selectedClient = null;
      });
  }

  delete(client: Client): void {
    this.clientService
      .delete(client.id)
      .then(() => {
        this.clients = this.clients.filter(h => h !== client);
        if (this.selectedClient === client) { this.selectedClient = null; }
      });
  }

}

