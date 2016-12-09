import { Component, OnInit } from '@angular/core';
import { Access } from '../access/access';
import { AccessService } from '../access/access.service';
import { Client } from '../client/client';
import { ClientService } from '../client/client.service';
import { Admin } from '../admin/admin';
import { AdminService } from '../admin/admin.service';
import { Site } from '../site/site';
import { SiteService } from '../site/site.service';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'my-heroes',
  templateUrl: 'dashboard.component.html',
  styleUrls: [ 'dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  accesses: Access[];
  selectedAccess: Access;
  clients: Client[];
  selectedClient: Client;
  admins: Admin[];
  selectedAdmin: Admin;
  sites: Site[];
  selectedSite: Site;
  adminsLength: number;
  accessesLength: number;
  clientsLength: number;
  sitesLength: number;

  constructor(
    private router: Router,
    private accessService: AccessService,
    private clientService: ClientService,
    private adminService: AdminService,
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
    this.accessesLength = this.accesses.length;
  }

  getClients(): void {
    this.clientService.getClients().then((clients) => {
      this.clients = clients;
      this.clientsLength = this.clients.length;
    });
  }

  getAdmins(): void {
    this.adminService.getAdmins().then((admins) => {
      this.admins = admins;
      this.adminsLength = this.admins.length;
    });
  }

  getSites(): void {
    this.siteService.getSites().then((sites) => {
      this.sites = sites;
      this.sitesLength = this.sites.length;
    });
  }

  ngOnInit(): void {
    this.getAccesses();
    this.getClients();
    this.getAdmins();
    this.getSites();
  }

  onSelectAccess(access: Access): void {
    this.selectedAccess = access;
    this.selectedAdmin = null;
    this.selectedClient = null;
    this.selectedSite = null;
  }

  onSelectAdmin(admin: Admin): void {
    this.selectedAccess = null;
    this.selectedAdmin = admin;
    this.selectedClient = null;
    this.selectedSite = null;
  }

  onSelectClient(client: Client): void {
    this.selectedAccess = null;
    this.selectedAdmin = null;
    this.selectedClient = client;
    this.selectedSite = null;
  }

  onSelectSite(site: Site): void {
    this.selectedAccess = null;
    this.selectedAdmin = null;
    this.selectedClient = null;
    this.selectedSite = site;
  }

  gotoAccessDetail(): void {
    this.router.navigate(['/accesses', this.selectedAccess._id]);
  }

  gotoClientDetail(): void {
    this.router.navigate(['/clients', this.selectedClient._id]);
  }

  gotoAdminDetail(): void {
    this.router.navigate(['/admins', this.selectedAdmin._id]);
  }

  gotoSiteDetail(): void {
    this.router.navigate(['/sites', this.selectedSite._id]);
  }
}

