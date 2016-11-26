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
  private detailEditMode: string;

  constructor(
    private router: Router,
    private adminService: AdminService) { }

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
    this.selectedAdmin = admin;
  }

  gotoDetail(): void {
    this.router.navigate(['/admins', this.selectedAdmin._id]);
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

}

