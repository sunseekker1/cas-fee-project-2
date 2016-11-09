import { Injectable }    from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Admin } from './admin';
import 'rxjs/add/operator/toPromise';



@Injectable()
export class AdminService {
  private adminUrl = 'http://localhost:8080/api/admins';  // URL to web api

  constructor(private http: Http) { }

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
      .then(sites => sites.find(admin => admin.id == id));
  }

  private headers = new Headers({'Content-Type': 'application/json'});

  update(admin: Admin): Promise<Admin> {
    const url = `${this.adminUrl}/${admin.id}`;
    return this.http
      .put(url, JSON.stringify(admin), {headers: this.headers})
      .toPromise()
      .then(() => admin)
      .catch(this.handleError);
  }


  create(name: string): Promise<Admin> {
    return this.http
      .post(this.adminUrl, JSON.stringify({name: name}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  delete(id: string): Promise<void> {
    const url = `${this.adminUrl}/${id}`;
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
