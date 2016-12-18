import {Injectable}    from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import {Client} from './client';
import 'rxjs/add/operator/toPromise';
import {LoginService} from "../login/login.service";
import {AppConfigProvider} from '../config/app.config.provider';


@Injectable()
export class ClientService {
    private clientsUrl = this.appConfig.restApiEndpoints.clients;  // URL to web api
    private headers = new Headers({
        'Content-Type': 'application/json', 'Authorization': "Basic " + btoa(this.loginService.admin.username + ":" + this.loginService.admin.password)
    });

    constructor(private http: Http, private loginService: LoginService, private appConfig: AppConfigProvider) {
    }

    create(client: Client): Promise<Client> {
        return this.http
            .post(this.clientsUrl, JSON.stringify(client), {headers: this.headers})
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    update(client: Client): Promise<Client> {
        const url = `${this.clientsUrl}/${client._id}`;
        return this.http
            .put(url, JSON.stringify(client), {headers: this.headers})
            .toPromise()
            .then(() => client)
            .catch(this.handleError);
    }

    delete(id: string): Promise<void> {
        const url = `${this.clientsUrl}/${id}`;
        return this.http.delete(url, {headers: this.headers})
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    getClients(): Promise<Client[]> {
        return this.http.get(this.clientsUrl, {headers: this.headers})
            .toPromise()
            .then(
                response => response.json().data as Client[]
            )
            .catch(this.handleError);
    }

    getClient(id: string): Promise<Client> {
        return this.getClients()
            .then(clients => clients.find(client => client._id == id));
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
