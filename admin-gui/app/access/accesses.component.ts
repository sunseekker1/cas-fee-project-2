import { Component, OnInit } from '@angular/core';
import { Access } from './access';
import { AccessesService } from './accesses.service';
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
    private accessesService: AccessesService) { }

  getAccesses(): void {
    this.accessesService.getAccesses().then(accesses => this.mapResult(accesses));
  }

  mapResult(result: any): void{
    let mapped: any = [];

    for (let access of result) {
      console.log(access);

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
    this.router.navigate(['/detail', this.selectedAccess.id]);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.accessesService.create(name)
      .then(access => {
        this.accesses.push(access);
        this.selectedAccess = null;
      });
  }

  delete(access: Access): void {
    this.accessesService
      .delete(access.id)
      .then(() => {
        this.accesses = this.accesses.filter(h => h !== access);
        if (this.selectedAccess === access) { this.selectedAccess = null; }
      });
  }

}

