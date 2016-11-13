import { Injectable }    from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Access } from './access';
import 'rxjs/add/operator/toPromise';



@Injectable()
export class AccessService {
  private accessesUrl = 'http://localhost:8080/api/accesses';  // URL to web api

  constructor(private http: Http) { }

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

  private headers = new Headers({'Content-Type': 'application/json'});

  update(access: Access): Promise<Access> {
    const url = `${this.accessesUrl}/${access._id}`;
    return this.http
      .put(url, JSON.stringify(access), {headers: this.headers})
      .toPromise()
      .then(() => access)
      .catch(this.handleError);
  }


  create(name: string): Promise<Access> {
    return this.http
      .post(this.accessesUrl, JSON.stringify({name: name}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  delete(id: string): Promise<void> {
    const url = `${this.accessesUrl}/${id}`;
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
