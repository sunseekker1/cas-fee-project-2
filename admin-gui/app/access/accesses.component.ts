import { Component, OnInit } from '@angular/core';
import { Access } from './access';
import { AccessService } from './access.service';
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
    private accessesService: AccessService) { }

  getAccesses(): void {
    this.accessesService.getAccesses().then(accesses => this.mapResult(accesses));
  }

  mapResult(result: any): void{
    let mapped: any = [];

    for (let access of result) {

      mapped.push({
        id: access._id,
        shortId: access._id.substring(21, 25),
        used: access.used
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
    this.router.navigate(['/accesses', this.selectedAccess.id]);
  }
}

