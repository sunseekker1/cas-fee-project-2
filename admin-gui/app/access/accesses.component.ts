import {Component, OnInit} from '@angular/core';
import {Access} from './access';
import {AccessService} from './access.service';
import {SiteService} from '../site/site.service';
import {Router} from '@angular/router';


@Component({
    moduleId: module.id,
    templateUrl: 'accesses.component.html',
    styleUrls: ['accesses.component.css']
})
export class AccessesComponent implements OnInit {
    accesses: Access[];
    selectedAccess: Access;
    private detailEditMode: string;

    constructor(private router: Router, private accessService: AccessService, private siteService: SiteService) {
        this.resetDetailEditForms();
    }

    ngOnInit(): void {
        this.getAccesses();
    }

    getAccesses(): void {

        this.siteService.getSites().then(
            (sites) => {
                this.accessService.getAccesses()
                    .then((accesses) => {
                        this.mapResult(accesses, sites)
                    })
            }
        );
    }

    onSelect(access: Access): void {
        this.selectedAccess = access;
        this.detailEditMode = 'detail';
    }

    resetDetailEditForms(): void {
        this.selectedAccess = null;
        this.detailEditMode = 'new';
    }

    mapResult(accesses: any, sites: any): void {
        let mapped: any = [];
        let siteTitle = '';

        for (let access of accesses) {

            for (var i = 0; i < sites.length; i++) {

                if (sites[i]._id === access.siteId) {
                    siteTitle = sites[i].title;
                    break;
                }
            }

            mapped.push({
                _id: access._id,
                shortId: access._id.substring(21, 25),
                used: access.used,
                siteId: access.siteId,
                siteTitle: siteTitle,
                creationDate: access.creationDate
            });
        }
        this.accesses = mapped;
    }
}

