import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import { AdminService } from './admin.service';
import { Admin } from './admin';
@Component({
  moduleId: module.id,
  selector: 'my-hero-detail',
  templateUrl: 'admin-detail.component.html',
})

export class AdminDetailComponent implements OnInit {
  @Input() admin: Admin;

  constructor(
    private adminService: AdminService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      let id = params['id'];
      this.adminService.getAdmin(id)
        .then(admin => this.admin = admin);
    });
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.adminService.update(this.admin)
      .then(() => this.goBack());
  }


}
