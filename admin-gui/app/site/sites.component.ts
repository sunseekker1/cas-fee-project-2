import {Component, OnInit} from '@angular/core';
import {Site} from './site';
import {SiteService} from './site.service';
import {Router} from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'my-heroes',
    templateUrl: 'sites.component.html',
    styleUrls: ['sites.component.css']
})
export class SitesComponent implements OnInit {
    public sites: Site[];
    private selectedSite: Site;
    private editedSite: Site;
    private detailEditMode: string;

    constructor(private router: Router,
                private siteService: SiteService) {
        this.detailEditMode = 'new';
    }

    getSites(): void {
        this.siteService.getSites().then(
            sites => this.mapResult(sites)
        );
    }

    mapResult(result: any): void {
        let mappedSites: any = [];

        for (let site of result) {

            mappedSites.push({
                _id: site._id,
                shortId: site._id.substring(21, 25),
                clientId: site.clientId,
                title: site.title
            });
        }
        this.sites = mappedSites;
    }

    ngOnInit(): void {
        this.getSites();
    }

    onSelect(site: Site): void {
        this.editedSite = null;
        this.selectedSite = site;
        this.detailEditMode = 'detail';
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

    delete(site: Site): void {
        this.siteService
            .delete(site._id)
            .then(() => {
                this.sites = this.sites.filter(h => h !== site);
                if (this.selectedSite === site) {
                    this.selectedSite = null;
                }
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

    save(): void {
        this.siteService.update(this.editedSite)
            .then(() => {
                this.getSites();
                this.selectedSite = this.editedSite;
                this.editedSite = null;
                this.detailEditMode = 'detail';
            });
    }

}

