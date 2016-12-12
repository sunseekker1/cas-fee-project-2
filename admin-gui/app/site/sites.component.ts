import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {Site} from './site';
import {SiteService} from './site.service';
import {ClientService} from '../client/client.service';
import {Router} from '@angular/router';
import {MdDialog, MdDialogRef, MdDialogConfig} from "@angular/material";
import {DeleteDialogComponent} from "../dialog/dialog.component";
import {Client} from "../client/client";

@Component({
    moduleId: module.id,
    selector: 'my-heroes',
    templateUrl: 'sites.component.html',
    styleUrls: ['sites.component.css']
})
export class SitesComponent implements OnInit {
    dialogRef: MdDialogRef<any>;
    public sites: Site[];
    private selectedSite: Site;
    private editedSite: Site;
    private selectedClientId: string;
    private detailEditMode: string;
    public clients: Client[];

    constructor(private router: Router, private siteService: SiteService, private clientService: ClientService, public dialog: MdDialog, public viewContainerRef: ViewContainerRef) {
        this.resetDetailEditForms();
    }

    ngOnInit(): void {
        this.getSites();
        this.getClients();
    }

    getSites(): void {
        this.resetDetailEditForms();

        this.siteService.getSites().then(
            sites => this.mapResult(sites)
        );
    }

    save(): void {

        console.log(this.selectedClientId);
        console.log(this.editedSite);
        this.editedSite.clientId = this.selectedClientId;
        console.log(this.editedSite);


        this.siteService.update(this.editedSite)
            .then(() => {
                let selectedSite = this.editedSite;
                this.getSites();
                this.selectedSite = selectedSite;
                this.detailEditMode = 'detail';
            });
    }

    delete(site: Site): void {
        let config = new MdDialogConfig();
        config.viewContainerRef = this.viewContainerRef;
        this.dialogRef = this.dialog.open(DeleteDialogComponent, config);

        this.dialogRef.afterClosed().subscribe(confirm => {
            console.log(confirm);
            this.dialogRef = null;

            if (confirm) {
                this.resetDetailEditForms();
                this.siteService
                    .delete(site._id)
                    .then(() => {
                        this.sites = this.sites.filter(h => h !== site);
                        if (this.selectedSite === site) {
                            this.selectedSite = null;
                        }
                    });
            }
        });
    }

    add(site: Site): void {
        site.title = site.title.trim();
        if (!site.title || !site.clientId) {
            return;
        }
        this.siteService.create(site)
            .then((site) => {
                site.shortId = site._id.substring(21, 25);
                this.sites.push(site);
                this.selectedSite = null;
            });

        this.selectedSite = null;
        this.editedSite = null;
    }

    edit(): void {
        this.editedSite = this.cloneObject(this.selectedSite);
        this.detailEditMode = 'edit';
    }

    new(): void {
        this.detailEditMode = 'new';
    }

    goBack(): void {
        this.editedSite = null;
        this.detailEditMode = 'detail';
    }

    onSelect(site: Site): void {
        this.editedSite = null;
        this.selectedSite = site;
        this.detailEditMode = 'detail';
    }

    resetDetailEditForms(): void {
        this.selectedSite = null;
        this.editedSite = null;
        this.detailEditMode = 'new';
    }

    getClients(): void {
        this.clientService.getClients().then(clients => {
            console.log(clients);
            this.clients = clients;
        });
    }

    onSelectClient(clientId: string): void{
        this.selectedClientId = clientId;
        console.log(this.selectedClientId);
    }

    mapResult(result: any): void {
        let mappedSites: any = [];

        for (let site of result) {

            mappedSites.push({
                _id: site._id,
                shortId: site._id.substring(21, 25),
                clientId: site.clientId,
                title: site.title,
                url: site.url
            });
        }
        this.sites = mappedSites;
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

