import {Injectable}    from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import {Admin} from '../admin/admin';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class LoginService {
    private adminUrl = 'http://localhost:8080/api/admins/login';  // URL to web api
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) {
    }

    public loginAdmin(username: string, password: string): Promise<Admin> {
        let requestParams = {"username": username, "password": password};

        return this.http
            .post(this.adminUrl, JSON.stringify(requestParams), {headers: this.headers})
            .toPromise()
            .then((res) => res.json().data)
            .catch(this.handleError);
    }



    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

}
