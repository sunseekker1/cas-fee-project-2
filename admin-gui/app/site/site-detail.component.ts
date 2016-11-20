import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import { SiteService } from './site.service';
import { Site } from './site';
@Component({
  moduleId: module.id,
  selector: 'my-site-detail',
  templateUrl: 'site-detail.component.html',
})

export class SiteDetailComponent implements OnInit {
  @Input() site: Site;

  constructor(
    private siteService: SiteService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      let id = params['id'];
      this.siteService.getSite(id)
        .then(
          //client => this.client = client

          (site) => {
            this.site = site;
          }

        );
    });
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.siteService.update(this.site)
      .then(() => this.goBack());
  }


}
