import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs/Observable';
import { HttpHelper } from '../helpers/httpHelper';
import { IUser } from "../pages/user/iUser";

@Injectable()
export class UserService {

  constructor(private http: HttpClient, private httpHelper: HttpHelper) {}

  private apiUrl: string = 'http://localhost:3000/api/v1/user';
  private headers: HttpHeaders;
  private options: Object;

  getUser(id: number): Observable<any> {
    this.headers = this.httpHelper.getHeaders();
    this.options = this.httpHelper.getOptions(this.headers);

    return this.http.get(`${this.apiUrl}/${id}.json`, this.options);
  }

  updateUser(body: IUser): Observable<any> {
    this.headers = this.httpHelper.getHeaders();
    this.options = this.httpHelper.getOptions(this.headers);
    let params: HttpParams = new HttpParams()
      .set('email', body.email)
      .set('username', body.username)
      .set('language', body.language);

    this.options = { ...this.options, params: params };
    
    return this.http.put(`${this.apiUrl}/${body.id}.json`, body, this.options);
  }

}