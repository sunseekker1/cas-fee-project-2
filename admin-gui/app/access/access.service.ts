import { Injectable }    from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Access } from './access';
import 'rxjs/add/operator/toPromise';
import {LoginService} from "../login/login.service";



@Injectable()
export class AccessService {
  private accessesUrl = 'http://localhost:8080/api/accesses';  // URL to web api
  private headers = new Headers({'Content-Type': 'application/json', 'Authorization': "Basic " + btoa(this.loginService.admin.username + ":" + this.loginService.admin.password)});

  constructor(private http: Http, private loginService: LoginService) { }

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
