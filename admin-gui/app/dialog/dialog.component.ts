import {Component} from '@angular/core';
import {MdDialogRef} from "@angular/material";


@Component({
    moduleId: module.id,
    templateUrl: 'dialog.component.html'
})
export class DeleteDialogComponent {
    dialogType = 'delete';
    constructor(public dialogRef: MdDialogRef<any>) { }
}


@Component({
    moduleId: module.id,
    templateUrl: 'dialog.component.html'
})
export class LoginDialogComponent {
    dialogType = 'login';
    constructor(public dialogRef: MdDialogRef<any>) { }
}