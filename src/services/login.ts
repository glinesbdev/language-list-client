import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ILogin } from '../pages/login/iLogin';
import { HttpHelper } from '../helpers/httpHelper';
import { StorageService } from './storage';

@Injectable()
export class LoginService {

  constructor(private http: HttpClient, private httpHelper: HttpHelper, private storageService: StorageService) {}

  private apiUrl: string = 'http://localhost:3000/auth';
  private headers: HttpHeaders;
  private options: Object;

  login(body: ILogin): Observable<any> {
    this.headers = this.httpHelper.getHeaders();
    this.options = this.httpHelper.getOptions(this.headers);

    return this.http.post(`${this.apiUrl}/sign_in.json`, body, this.options);
  }

  logout(): void {
    this.httpHelper.removeAuthHeaders();
    this.storageService.deleteLogin();
  }
  
  isAuthenticated(): boolean {
    if (this.storageService.getUserId() > 0) {
      return true;
    }

    return false;
  }

}