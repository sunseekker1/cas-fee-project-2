import { Component, OnInit } from '@angular/core';
import { Admin } from './admin';
import { AdminService } from './admin.service';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'my-heroes',
  templateUrl: 'admins.component.html',
  styleUrls: [ 'admins.component.css' ]
})
export class AdminsComponent implements OnInit {
  admins: Admin[];
  selectedAdmin: Admin;
  editedAdmin: Admin;
  private detailEditMode: string;

  constructor(
    private router: Router,
    private adminService: AdminService) {

    this.detailEditMode = 'new';
  }

  getAdmins(): void {
    this.adminService.getAdmins().then((admins) => this.mapResult(admins));
  }

  mapResult(result: any): void{
    let mapped: any = [];

    for (let admin of result) {

      mapped.push({
        _id: admin._id,
        shortId: admin._id.substring(21, 25),
        username: admin.username,
        email: admin.email
      });
    }
    this.admins = mapped;
  }

  ngOnInit(): void {
    this.getAdmins();
  }

  onSelect(admin: Admin): void {
    this.editedAdmin = null;
    this.selectedAdmin = admin;
    this.detailEditMode = 'detail';
  }



  edit(): void {
    this.editedAdmin = this.cloneObject(this.selectedAdmin);
    this.detailEditMode = 'edit';
  }

  new(): void {
    this.detailEditMode = 'new';
  }

  goBack(): void {
    this.editedAdmin = null;
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

  add(admin: Admin): void {
    admin.username = admin.username.trim();
    if (!admin.username || !admin.password || !admin.email) {
      return;
    }
    this.adminService.create(admin)
      .then((admin) => {
        admin.shortId = admin._id.substring(21, 25);
        this.admins.push(admin);
        this.selectedAdmin = null;
      });
  }

  delete(admin: Admin): void {
    this.adminService
      .delete(admin._id)
      .then(() => {
        this.admins = this.admins.filter(h => h !== admin);
        if (this.selectedAdmin === admin) { this.selectedAdmin = null; }
      });
  }

  save(): void {
    this.adminService.update(this.editedAdmin)
        .then(() => {
          this.getAdmins();
          this.selectedAdmin = this.editedAdmin;
          this.editedAdmin = null;
          this.detailEditMode = 'detail';
        });
  }

}

