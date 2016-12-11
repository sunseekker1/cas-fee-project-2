import {Component} from '@angular/core';
import {MDL} from './material-design-lite-upgrade-element'; // Inofficial Angular Material Design Lite
import {LoginService} from './login/login.service';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {Router} from '@angular/router';

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

    public setViewState(viewState: string) {

        this.viewState = viewState;
    }

    // userSession: boolean;
    //
    constructor(private loginService: LoginService, private router: Router) {
        console.log(loginService.isLoggedIn());
    }

    //
    public logout() {
        console.log(this.loginService.isLoggedIn());
        this.loginService.logout();
        this.router.navigate(['login']);
        console.log(this.loginService.isLoggedIn());
    }
}
