import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Site } from './site';
import 'rxjs/add/operator/toPromise';



@Injectable()
export class SiteService {
  private sitesUrl = 'http://localhost:8080/api/sites';  // URL to web api

  constructor(private http: Http) { }

  getSites(): Promise<Site[]> {
    return this.http.get(this.sitesUrl, {headers: this.headers})
      .toPromise()
      .then(
        response => response.json().data as Site[]
      )
      .catch(this.handleError);
  }

  getSite(id: string): Promise<Site> {
    return this.getSites()
      .then(sites => sites.find(site => site._id == id));
  }

  private headers = new Headers({'Content-Type': 'application/json'});

  update(site: Site): Promise<Site> {
    const url = `${this.sitesUrl}/${site._id}`;
    return this.http
      .put(url, JSON.stringify(site), {headers: this.headers})
      .toPromise()
      .then(() => site)
      .catch(this.handleError);
  }


  create(name: string): Promise<Site> {
    return this.http
      .post(this.sitesUrl, JSON.stringify({name: name}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  delete(id: string): Promise<void> {
    const url = `${this.sitesUrl}/${id}`;
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
