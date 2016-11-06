import { Component, OnInit } from '@angular/core';
import { Site } from './site';
import { SitesService } from './sites.service';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'my-heroes',
  templateUrl: 'sites.component.html',
  styleUrls: [ 'sites.component.css' ]
})
export class SitesComponent implements OnInit {
  sites: Site[];
  selectedSite: Site;

  constructor(
    private router: Router,
    private sitesService: SitesService) { }

  getSites(): void {
    this.sitesService.getSites().then(
      sites => this.mapResult(sites)
    );
  }

  mapResult(result): void{
    let mappedSites = [];

    for (let site of result) {
      console.log(site);

      mappedSites.push({
        id: site._id,
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
    this.selectedSite = site;
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedSite.id]);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.sitesService.create(name)
      .then(site => {
        this.sites.push(site);
        this.selectedSite = null;
      });
  }

  delete(site: Site): void {
    this.sitesService
      .delete(site.id)
      .then(() => {
        this.sites = this.sites.filter(h => h !== site);
        if (this.selectedSite === site) { this.selectedSite = null; }
      });
  }

}

