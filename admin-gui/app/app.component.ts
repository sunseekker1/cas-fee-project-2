import {Component} from '@angular/core';
import {MDL} from './material-design-lite-upgrade-element'; // Inofficial Angular Material Design Lite
import {LoginService} from './login/login.service';
import {Cookie} from 'ng2-cookies/ng2-cookies';

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
    // userSession: boolean;
    //
    // constructor() {
    //     this.login
    // }
    //
    // public logout() {
    //     this.login.logout();
    // }
}
