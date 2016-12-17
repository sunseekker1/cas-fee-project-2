import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {LoginService} from './login.service';
import {Router} from '@angular/router';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {MdDialog, MdDialogRef, MdDialogConfig} from "@angular/material";
import {LoginDialogComponent} from "../dialog/dialog.component";
import {AppConfigProvider} from '../config/app.config.provider';



@Component({
    moduleId: module.id,
    selector: 'my-heroes',
    templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
    dialogRef: MdDialogRef<any>;

    constructor(private router: Router, private loginService: LoginService, public dialog: MdDialog, public viewContainerRef: ViewContainerRef) {
    }

    ngOnInit(): void {
    }

    public submitForm(event: any, username: string, password: string) {
        if (event.keyCode == 13) {
            this.login(username, password);
        }
    }

    public login(username: string, password: string): void {
        this.loginService.login(username, password).subscribe((result) => {
            console.log('login.component.ts', result);

            this.router.navigate(['dashboard']);

            if (result) {
                console.log("login passed");
                this.router.navigate(['dashboard']);
            }
            else {
                this.showDialog();

                // console.log("login failed");
                // this.router.navigate(['login']);
            }
        });

    }

    public showDialog(){
        let config = new MdDialogConfig();
        config.viewContainerRef = this.viewContainerRef;
        this.dialogRef = this.dialog.open(LoginDialogComponent, config);

        this.dialogRef.afterClosed().subscribe(confirm => {
            console.log(confirm);
            this.dialogRef = null;

            if(confirm){
                //just close the dialog
            }
        });
    }

    public logout(): void {
        this.loginService.logout();
        // Cookie.delete('userSession');
        this.router.navigate(['login']);
    }


}

