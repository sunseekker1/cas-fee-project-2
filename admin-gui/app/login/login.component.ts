import {Component, OnInit} from '@angular/core';
import {LoginService} from './login.service';
import {Admin} from '../admin/admin';
import {Router} from '@angular/router';
import {Cookie} from 'ng2-cookies/ng2-cookies';

@Component({
    moduleId: module.id,
    selector: 'my-heroes',
    templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {

    constructor(private router: Router, private loginService: LoginService) {
    }

    ngOnInit(): void {
    }

    public loginAdmin(username: string, password: string): void {
        this.loginService.loginAdmin(username, password).then((result) => {
            console.log(result);
            if (result) {
                Cookie.set('userSession', username);
                this.router.navigate(['dashboard']);
            }
            else {
                console.log("login failed");
                this.router.navigate(['login']);
            }
        });
    }

    public logout(): void {
        Cookie.delete('userSession');
        this.router.navigate(['login']);
    }
}

