import {Component, ViewContainerRef} from '@angular/core';
import {LoginService} from './login/login.service';
import {Router} from '@angular/router';
import {AppConfigProvider} from './config/app.config.provider';
import {MdDialog, MdDialogRef, MdDialogConfig} from "@angular/material";
import {HelloDialogComponent} from "./dialog/dialog.component";


@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css']
})
export class AppComponent {
    title = 'FastLogin';
    viewState = '';
    dialogRef: MdDialogRef<any>;

    constructor(private loginService: LoginService, private router: Router, private appConfig:AppConfigProvider, public dialog: MdDialog, public viewContainerRef: ViewContainerRef) {
        this.loginService.logout();
        this.router.navigate(['login']);
    }

    setViewState(viewState: string) {

        this.viewState = viewState;
    }

    logout() {
        console.log(this.loginService.isLoggedIn());
        this.loginService.logout();
        this.router.navigate(['login']);
        console.log(this.loginService.isLoggedIn());
    }

    onHelloMessage() {
        let config = new MdDialogConfig();
        config.viewContainerRef = this.viewContainerRef;
        this.dialogRef = this.dialog.open(HelloDialogComponent, config);

        this.dialogRef.afterClosed().subscribe(confirm => {
            this.dialogRef = null;

            if(confirm){
                // do nothing
            }
        });
    }

    changeLang():void {
        if(this.appConfig.appLang == 'de') {
            this.appConfig.appLang = 'en';
        }else {
            this.appConfig.appLang = 'de';
        }
    }
}
