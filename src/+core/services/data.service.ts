import { Injectable, Inject } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { TokenService } from './token.service';
import { EnvVariables } from '../../environment';

@Injectable()
export class DataService {
  private headers = new Headers({
    'Content-Type': 'application/json',
    'Authorization': ''
  });

  private URL;  // URL to web api

  constructor(private http: Http,
              private tokenService: TokenService,
              @Inject(EnvVariables) private env) {
    this.URL = this.env.apiEndpoint;
  }

  getData(endpoint: string): Promise <any> {
    this.headers.set('Authorization', this.tokenService.accessToken);
    const url = `${this.URL}/${endpoint}`;
    return this.http.get(url, { headers: this.headers })
               .toPromise()
               .then(response => response.json())
               .catch(err => this.handleError(err));
  }

  getQueryData(endpoint: string, query: any): Promise <any> {
    this.headers.set('Authorization', this.tokenService.accessToken);
    let url = `${this.URL}/${endpoint}?`;

    for(let key in query) {
      if(query.hasOwnProperty(key)) {
        url += key + '=' + query[key] + '&';
      }
    }

    return this.http.get(url, { headers: this.headers })
               .toPromise()
               .then(response => response.json())
               .catch(err => this.handleError(err));
  }

  postData(endpoint: string, data: any): Promise<any> {
    this.headers.set('Authorization', this.tokenService.accessToken);
    const url = `${this.URL}/${endpoint}`;
    return this.http
          .post(url, JSON.stringify(data), { headers: this.headers })
          .toPromise()
          .then(res => res.json())
          .catch(err => this.handleError(err));
  }

  putData(endpoint: string, data: any): Promise<any> {
    this.headers.set('Authorization', this.tokenService.accessToken);
    const url = `${this.URL}/${endpoint}`;
    return this.http
          .put(url, JSON.stringify(data), { headers: this.headers })
          .toPromise()
          .then(res => res.json())
          .catch(err => this.handleError(err));
  }

  deleteData(endpoint: string): Promise <any> {
    this.headers.set('Authorization', this.tokenService.accessToken);
    const url = `${this.URL}/${endpoint}`;
    return this.http
            .delete(url, { headers: this.headers })
            .toPromise()
            .then(() =>  null)
            .catch(err => this.handleError(err));
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    if (error.status  === 0){
      let errMsg = '';
      errMsg = 'Problem with connection.';
      return Promise.reject(errMsg);
    } else {
      return Promise.reject(error.error || error);
    }
  }

  
}