import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {LoginService} from './login.service';
import {Router} from '@angular/router';
import {MdDialog, MdDialogRef, MdDialogConfig} from "@angular/material";
import {LoginDialogComponent} from "../dialog/dialog.component";


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

    submitForm(event: any, username: string, password: string) {
        if (event.keyCode == 13) {
            this.login(username, password);
        }
    }

    login(username: string, password: string): void {
        this.loginService.login(username, password).subscribe((result) => {

            this.router.navigate(['dashboard']);

            if (result) {
                this.router.navigate(['dashboard']);
            }
            else {
                this.showDialog();

                // console.log("login failed");
                // this.router.navigate(['login']);
            }
        });

    }

    showDialog(){
        let config = new MdDialogConfig();
        config.viewContainerRef = this.viewContainerRef;
        this.dialogRef = this.dialog.open(LoginDialogComponent, config);

        this.dialogRef.afterClosed().subscribe(confirm => {
            this.dialogRef = null;

            if(confirm){
                //just close the dialog
            }
        });
    }

    logout(): void {
        this.loginService.logout();
        // Cookie.delete('userSession');
        this.router.navigate(['login']);
    }
}

