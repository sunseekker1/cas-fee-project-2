import { Component, OnInit } from '@angular/core';
import { Admin } from './admin';
import { AdminService } from './admin.service';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'my-heroes',
  templateUrl: 'admin.component.html',
  styleUrls: [ 'admin.component.css' ]
})
export class AdminComponent implements OnInit {
  admins: Admin[];
  selectedAdmin: Admin;

  constructor(
    private router: Router,
    private adminService: AdminService) { }

  getAdmins(): void {
    this.adminService.getAdmins().then(admins => this.mapResult(admins));
  }

  mapResult(result: any): void{
    let mapped: any = [];

    for (let admin of result) {
      console.log(admin);

      mapped.push({
        id: admin._id,
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
    this.router.navigate(['/detail', this.selectedAdmin.id]);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.adminService.create(name)
      .then(admin => {
        this.admins.push(admin);
        this.selectedAdmin = null;
      });
  }

  delete(admin: Admin): void {
    this.adminService
      .delete(admin.id)
      .then(() => {
        this.admins = this.admins.filter(h => h !== admin);
        if (this.selectedAdmin === admin) { this.selectedAdmin = null; }
      });
  }

}

