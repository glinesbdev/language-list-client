import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ILogin } from '../pages/login/iLogin';

@Injectable()
export class LoginService {

  constructor(private http: HttpClient) {}

  private apiUrl: string = 'http://localhost:3000/auth';

  login(body: ILogin): Observable<any> {
    let headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    let options: Object = { headers: headers, observe: 'response' };

    return this.http.post<any>(`${this.apiUrl}/sign_in.json`, body, options);
  }

}