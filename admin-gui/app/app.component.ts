import {Component} from '@angular/core';
import {MDL} from './material-design-lite-upgrade-element'; // Inofficial Angular Material Design Lite
import {LoginComponent} from './login/login.component';
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
    login: LoginComponent;
    userSession: boolean;

    constructor() {
    }

    public logout() {
        this.login.logout();
    }
}
