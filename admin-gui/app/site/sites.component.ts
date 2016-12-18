import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {Site} from './site';
import {SiteService} from './site.service';
import {ClientService} from '../client/client.service';
import {Router} from '@angular/router';
import {MdDialog, MdDialogRef, MdDialogConfig} from "@angular/material";
import {DeleteDialogComponent} from "../dialog/dialog.component";
import {Client} from "../client/client";
import {CommonProvider} from "../common/common.provider";


@Component({
    moduleId: module.id,
    templateUrl: 'sites.component.html',
    styleUrls: ['sites.component.css']
})
export class SitesComponent implements OnInit {
    dialogRef: MdDialogRef<any>;
    public sites: Site[];
    private selectedSite: Site;
    private editedSite: Site;
    private selectedClientName: string;
    private selectedClientId: string;
    private detailEditMode: string;
    public clients: Client[];

    constructor(private router: Router, private siteService: SiteService, private clientService: ClientService, public dialog: MdDialog, public viewContainerRef: ViewContainerRef, public commonProvider: CommonProvider) {
        this.resetDetailEditForms();
    }

    ngOnInit(): void {
        this.getSites();
        this.getClients();
    }

    create(site: Site): void {
        site.title = site.title.trim();

        if (!site.title || !site.clientId) {
            return;
        }
        this.siteService.create(site)
            .then((site) => {
                site.shortId = site._id.substring(21, 25);
                this.sites.push(site);
            });

        this.selectedSite = null;
        this.editedSite = null;
        this.selectedClientName = null;
        this.selectedClientId = null;
    }

    update(): void {
        this.editedSite.clientId = this.selectedClientId;
        this.selectedClientName = this.getClientName(this.editedSite.clientId);

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
            this.dialogRef = null;

            if (confirm) {
                this.resetDetailEditForms();
                this.siteService
                    .delete(site._id)
                    .then(() => {
                        this.sites = this.sites.filter(h => h !== site);
                        if (this.selectedSite === site) {
                            this.selectedSite = null;
                            this.selectedClientName = null;
                            this.selectedClientId = null;
                        }
                    });
            }
        });
    }

    getSites(): void {
        this.resetDetailEditForms();

        this.siteService.getSites().then(
            sites => this.mapResult(sites)
        );
    }

    getClients(): void {
        this.clientService.getClients().then(clients => {
            this.clients = clients;
        });
    }

    onEdit(): void {
        this.editedSite = this.commonProvider.cloneObject(this.selectedSite);
        this.selectedClientName = this.getClientName(this.editedSite.clientId);
        this.detailEditMode = 'edit';
    }

    onCreate(site: Site): void {
        if (site.clientId == undefined){ // very very ugly, but very very late to fix it properly
            site.clientId = this.clients[0]._id;
        }
        this.create(site);
    }

    onSave(): void {
        this.update();
    }

    onNew(): void {
        this.detailEditMode = 'new';
    }

    onDelete(site: Site): void {
        this.delete(site);
    }

    onBack(): void {
        this.editedSite = null;
        this.detailEditMode = 'detail';
    }

    onSelectClient(clientId: string): void {
        this.selectedClientId = clientId;
    }

    onSelect(site: Site): void {
        this.editedSite = null;
        this.selectedSite = site;
        this.selectedClientName = this.getClientName(this.selectedSite.clientId);
        this.selectedClientId = this.selectedSite.clientId;
        this.detailEditMode = 'detail';
    }

    resetDetailEditForms(): void {
        this.selectedSite = null;
        this.editedSite = null;
        this.detailEditMode = 'new';
    }

    getClientName(clientId: string) {
        let selectedClientName = clientId;

        for (let client of this.clients) {
            if (client._id == clientId) {
                selectedClientName = client.firstname + ' ' + client.lastname;
                break;
            }
        }
        return selectedClientName;
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
}

