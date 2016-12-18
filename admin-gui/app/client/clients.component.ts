import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {Client} from './client';
import {ClientService} from './client.service';
import {Router} from '@angular/router';
import {MdDialog, MdDialogRef, MdDialogConfig} from "@angular/material";
import {DeleteDialogComponent} from "../dialog/dialog.component";
import {AppConfigProvider} from '../config/app.config.provider';


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
    detailEditMode: string;

    constructor(private appConfig:AppConfigProvider, private router: Router, private clientService: ClientService, public dialog: MdDialog, public viewContainerRef: ViewContainerRef) {
        this.resetDetailEditForms();
    }

    ngOnInit(): void {
        this.getClients();
    }

    create(client: Client): void {
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

    update(): void {
        this.clientService.update(this.editedClient)
            .then(() => {
                let selectedClient = this.editedClient;
                this.getClients();
                this.selectedClient = selectedClient;
                this.detailEditMode = 'detail';
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

    getClients(): void {
        this.resetDetailEditForms();
        this.clientService.getClients().then(clients => this.mapResult(clients));
    }

    onCreate(client: Client): void {
        this.create(client);
    }

    onSave(){
        this.update();
    }

    onEdit(): void {
        this.editedClient = this.cloneObject(this.selectedClient);
        this.detailEditMode = 'edit';
    }

    onNew(): void {
        this.detailEditMode = 'new';
    }

    onDelete(client: Client): void {
        this.delete(client);
    }

    onBack(): void {
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
                email: client.email,
                firstname: client.firstname,
                lastname: client.lastname
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

