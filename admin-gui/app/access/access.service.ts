import {Injectable}    from '@angular/core';
import {Headers, Http} from '@angular/http';
import {Access} from './access';
import 'rxjs/add/operator/toPromise';
import {LoginService} from "../login/login.service";
import {AppConfigProvider} from '../config/app.config.provider';


@Injectable()
export class AccessService {
    private accessesUrl = this.appConfig.restApiEndpoints.accesses;  // URL to web api

    constructor(private http: Http, private loginService: LoginService, private appConfig: AppConfigProvider) {
    }

    private headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': "Basic " + btoa(this.loginService.admin.username + ":" + this.loginService.admin.password)
    });

    getAccesses(): Promise<Access[]> {
        return this.http.get(this.accessesUrl, {headers: this.headers})
            .toPromise()
            .then(
                response => response.json().data as Access[]
            )
            .catch(this.handleError);
    }

    getAccess(id: string): Promise<Access> {
        return this.getAccesses()
            .then(accesses => accesses.find(access => access._id == id));
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
