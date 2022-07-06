import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class UsersService {
  constructor(private http: HttpClient) {}
  httpOption = {
    headers: new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    }),
  };

  getToken(): Observable<any> {
    return this.http.post(
      environment.apiURL + '/auth/login',
      environment.apiConfig
    );
  }

  connectAccount(): Observable<any> {
    var body = {
      _id: localStorage.getItem('account_address'),
    };

    return this.http.post(
      environment.apiURL + '/user/connect',
      body,
      this.httpOption
    );
  }

  updateUser(data: any): Observable<any> {
    return this.http.patch(
      environment.apiURL + '/user/update',
      data,
      this.httpOption
    );
  }

  getUserDetailById(id: any): Observable<any> {
    var body = {
      _id: id,
    };
    return this.http.post(
      environment.apiURL + '/user/byid',
      body,
      this.httpOption
    );
  }
}
