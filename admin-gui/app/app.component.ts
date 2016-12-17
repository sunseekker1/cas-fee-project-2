import {Component} from '@angular/core';
import {MDL} from './material-design-lite-upgrade-element'; // Inofficial Angular Material Design Lite
import {LoginService} from './login/login.service';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {Router} from '@angular/router';
import {AppConfigProvider} from './config/app.config.provider';

@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css']
    // directives: [MDL]
})
export class AppComponent {
    title = 'FastLogin';
    // login: LoginService;
    viewState = '';
    activeRoute = '';
    constructor(private loginService: LoginService, private router: Router, private appConfig:AppConfigProvider) {
        this.loginService.logout();
        this.router.navigate(['login']);
    }

    public setViewState(viewState: string) {

        this.viewState = viewState;
    }

    public logout() {
        console.log(this.loginService.isLoggedIn());
        this.loginService.logout();
        this.router.navigate(['login']);
        console.log(this.loginService.isLoggedIn());
    }

    changeLang():void {
        if(this.appConfig.appLang == 'de') {
            this.appConfig.appLang = 'en';
        }else {
            this.appConfig.appLang = 'de';
        }

    }

}
