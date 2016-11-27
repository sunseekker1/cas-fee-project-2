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
  editedClient: Client;
  private detailEditMode: string;

  constructor(
    private router: Router,
    private clientService: ClientService) {
    this.detailEditMode = 'new';
  }

  getClients(): void {
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
    this.getClients();
  }

  cloneObject(obj: any) {
    if (obj === null || typeof obj !== 'object') {
      return obj;
    }

    var newObj = obj.constructor(); // give temp the original obj's constructor
    for (var key in obj) {
      newObj[key] = this.cloneObject(obj[key]);
    }

    return newObj;
  }

  onSelect(client: Client): void {
    this.editedClient = null;
    this.selectedClient = client;
    this.detailEditMode = 'detail';
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
      .delete(client._id)
      .then(() => {
        this.clients = this.clients.filter(h => h !== client);
        if (this.selectedClient === client) { this.selectedClient = null; }
      });
  }

  edit(): void {
    this.editedClient = this.cloneObject(this.selectedClient);
    this.detailEditMode = 'edit';
  }

  new(): void {
    this.detailEditMode = 'new';
  }

  goBack(): void {
    this.editedClient = null;
    this.detailEditMode = 'detail';
  }

  save(): void {
    this.clientService.update(this.editedClient)
      .then(() => {
        this.getClients();
        this.selectedClient = this.editedClient;
        this.editedClient = null;
        this.detailEditMode = 'detail';
      });
  }

}

