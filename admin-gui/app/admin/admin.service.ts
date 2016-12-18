import {Injectable}    from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import {Admin} from './admin';
import 'rxjs/add/operator/toPromise';
import {LoginService} from "../login/login.service";
import {AppConfigProvider} from '../config/app.config.provider';


@Injectable()
export class AdminService {
    private adminUrl = this.appConfig.restApiEndpoints.admins;  // URL to web api

    private headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': "Basic " + btoa(this.loginService.admin.username + ":" + this.loginService.admin.password)
    });

    constructor(private http: Http, private loginService: LoginService, private appConfig: AppConfigProvider) {
    }

    create(admin: Admin): Promise<Admin> {
        return this.http
            .post(this.adminUrl, JSON.stringify(admin), {headers: this.headers})
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    update(admin: Admin): Promise<Admin> {
        const url = `${this.adminUrl}/${admin._id}`;
        return this.http
            .put(url, JSON.stringify(admin), {headers: this.headers})
            .toPromise()
            .then(() => admin)
            .catch(this.handleError);
    }

    delete(id: string): Promise<void> {
        const url = `${this.adminUrl}/${id}`;
        return this.http.delete(url, {headers: this.headers})
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    getAdmins(): Promise<Admin[]> {
        return this.http.get(this.adminUrl, {headers: this.headers})
            .toPromise()
            .then(
                response => response.json().data as Admin[]
            )
            .catch(this.handleError);
    }

    getAdmin(id: string): Promise<Admin> {
        return this.getAdmins()
            .then(admins => admins.find((admin) => admin._id == id));
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
