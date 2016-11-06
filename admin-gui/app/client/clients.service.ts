import { Injectable }    from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Client } from './client';
import 'rxjs/add/operator/toPromise';



@Injectable()
export class ClientsService {
  private clientsUrl = 'http://localhost:8080/api/clients';  // URL to web api

  constructor(private http: Http) { }

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
      .then(clients => clients.find(client => client.id == id));
  }

  private headers = new Headers({'Content-Type': 'application/json'});

  update(client: Client): Promise<Client> {
    const url = `${this.clientsUrl}/${client.id}`;
    return this.http
      .put(url, JSON.stringify(client), {headers: this.headers})
      .toPromise()
      .then(() => client)
      .catch(this.handleError);
  }


  create(name: string): Promise<Client> {
    return this.http
      .post(this.clientsUrl, JSON.stringify({name: name}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  delete(id: string): Promise<void> {
    const url = `${this.clientsUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }


}
