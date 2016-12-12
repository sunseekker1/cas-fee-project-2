import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {Client} from './client';
import {ClientService} from './client.service';
import {Router} from '@angular/router';
import {MdDialog, MdDialogRef, MdDialogConfig} from "@angular/material";
import {DeleteDialogComponent} from "../dialog/dialog.component";

@Component({
    moduleId: module.id,
    templateUrl: 'clients.component.html',
    styleUrls: ['clients.component.css']
})
export class ClientsComponent implements OnInit {
    dialogRef: MdDialogRef<any>;
    clients: Client[];
    selectedClient: Client;
    editedClient: Client;

    private detailEditMode: string;

    constructor(private router: Router, private clientService: ClientService, public dialog: MdDialog, public viewContainerRef: ViewContainerRef) {
        this.resetDetailEditForms();
    }

    ngOnInit(): void {
        this.getClients();
    }

    getClients(): void {
        this.resetDetailEditForms();
        this.clientService.getClients().then(clients => this.mapResult(clients));
    }

    save(): void {
        this.clientService.update(this.editedClient)
            .then(() => {
                let selectedClient = this.editedClient;
                this.getClients();
                this.selectedClient = selectedClient;
                this.detailEditMode = 'detail';
            });
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

        let config = new MdDialogConfig();
        config.viewContainerRef = this.viewContainerRef;
        this.dialogRef = this.dialog.open(DeleteDialogComponent, config);

        this.dialogRef.afterClosed().subscribe(confirm => {
            console.log(confirm);
            this.dialogRef = null;

            if(confirm){
                this.resetDetailEditForms();
                this.clientService
                    .delete(client._id)
                    .then(() => {
                        this.clients = this.clients.filter(h => h !== client);
                        if (this.selectedClient === client) {
                            this.selectedClient = null;
                        }
                    });
            }
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

    onSelect(client: Client): void {
        this.editedClient = null;
        this.selectedClient = client;
        this.detailEditMode = 'detail';
    }

    resetDetailEditForms(): void {
        this.selectedClient = null;
        this.editedClient = null;
        this.detailEditMode = 'new';
    }

    mapResult(result: any): void {
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

}

