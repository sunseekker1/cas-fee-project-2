import {Injectable}    from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import {Admin} from '../admin/admin';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class LoginService {
    private adminUrl = 'http://localhost:8080/api/admins/login';  // URL to web api
    private headers = new Headers({'Content-Type': 'application/json'});
    public loggedIn = false;
    public admin: Admin;

    constructor(private http: Http) {
        this.loggedIn = !!sessionStorage.getItem('userSession');
    }

    // public login(username: string, password: string): Promise<Admin> {
    //     let requestParams = {"username": username, "password": password};
    //
    //     return this.http
    //         .post(this.adminUrl, JSON.stringify(requestParams), {headers: this.headers})
    //         .toPromise()
    //         .then((res) => res.json().data)
    //         .catch(this.handleError);
    // }

    public login(username: string, password: string) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http
            .post(
                this.adminUrl,
                JSON.stringify({username, password}),
                {headers}
            )
            .map(res => res.json())
            .map((res) => {

                console.log("login.service.ts", res);

                if (res.success) {
                    console.log("login.service.ts", 'loggedIn');
                    sessionStorage.setItem('userSession', JSON.stringify(res));
                    this.loggedIn = true;
                    this.admin = res.admin;
                    this.admin.password = password;
                    return true;
                }
                else {
                    console.log(res.err);
                    return false;
                }


            });
    }

    public logout() {
        sessionStorage.removeItem('userSession');
        this.loggedIn = false;
    }

    public isLoggedIn() {
        return this.loggedIn;
    }

}
