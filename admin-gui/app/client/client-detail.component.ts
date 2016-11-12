import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import { ClientsService } from './clients.service';
import { Client } from './client';
@Component({
  moduleId: module.id,
  selector: 'my-client-detail',
  templateUrl: 'client-detail.component.html',
})

export class ClientDetailComponent implements OnInit {
  @Input() client: Client;

  constructor(
    private clientService: ClientsService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      let id = params['id'];
      this.clientService.getClient(id) //TODO der Servcie gibt kein ClientObjekt zurück
        .then(
          //client => this.client = client

          (client) => {
            console.log('client conroller: ' , client);
            this.client = client;
          }

        );
    });
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.clientService.update(this.client)
      .then(() => this.goBack());
  }


}
