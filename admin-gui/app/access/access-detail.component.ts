import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import { AccessService } from './access.service';
import { Access } from './access';
@Component({
  moduleId: module.id,
  selector: 'my-hero-detail',
  templateUrl: 'access-detail.component.html',
})

export class AccessDetailComponent implements OnInit {
  @Input() access: Access;

  constructor(
    private accessService: AccessService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      let id = params['id'];
      this.accessService.getAccess(id)
        .then(access => this.access = access);
    });
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.accessService.update(this.access)
      .then(() => this.goBack());
  }


}
