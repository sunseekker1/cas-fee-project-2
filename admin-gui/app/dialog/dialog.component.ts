import {Component} from '@angular/core';
import {MdDialogRef} from "@angular/material";
import {LoginService} from '../login/login.service';
import {AppConfigProvider} from '../config/app.config.provider';


@Component({
    moduleId: module.id,
    templateUrl: 'dialog.component.html'
})
export class DeleteDialogComponent {
    dialogType = 'delete';
    constructor(private appConfig:AppConfigProvider, public dialogRef: MdDialogRef<any>) { }
}


@Component({
    moduleId: module.id,
    templateUrl: 'dialog.component.html'
})
export class LoginDialogComponent {
    dialogType = 'login';
    constructor(private appConfig:AppConfigProvider, public dialogRef: MdDialogRef<any>) { }
}

@Component({
    moduleId: module.id,
    templateUrl: 'dialog.component.html'
})
export class HelloDialogComponent {
    dialogType = 'hello';
    constructor(private appConfig:AppConfigProvider, public dialogRef: MdDialogRef<any>, private loginService: LoginService) { }
}