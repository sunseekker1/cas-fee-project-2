import {Component} from '@angular/core';
import {MdDialogRef} from "@angular/material";
import {LoginService} from '../login/login.service';


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

@Component({
    moduleId: module.id,
    templateUrl: 'dialog.component.html'
})
export class HelloDialogComponent {
    dialogType = 'hello';
    constructor(public dialogRef: MdDialogRef<any>, private loginService: LoginService) { }
}