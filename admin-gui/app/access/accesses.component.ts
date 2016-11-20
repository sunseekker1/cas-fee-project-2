import { Component, OnInit } from '@angular/core';
import { Access } from './access';
import { AccessService } from './access.service';
import { SiteService } from '../site/site.service';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'my-heroes',
  templateUrl: 'accesses.component.html',
  styleUrls: [ 'accesses.component.css' ]
})
export class AccessesComponent implements OnInit {
  accesses: Access[];
  selectedAccess: Access;

  constructor(
    private router: Router,
    private accessService: AccessService,
    private siteService: SiteService) { }

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

  mapResult(result: any, sites: any): void{
    let mapped: any = [];
    let siteTitle = '';

    for (let access of result) {

      for (var i=0; i < sites.length; i++) {

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

  ngOnInit(): void {
    this.getAccesses();
  }

  onSelect(access: Access): void {
    this.selectedAccess = access;
  }

  gotoDetail(): void {
    this.router.navigate(['/accesses', this.selectedAccess._id]);
  }
}

