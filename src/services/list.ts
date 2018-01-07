import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { HttpHelper } from "../helpers/httpHelper";

@Injectable()
export class ListService {

  constructor(private http: HttpClient, private httpHelper: HttpHelper) {}

  private apiUrl: string = 'http://localhost:3000/api/v1/word_list';
  private headers: HttpHeaders;
  private options: Object;

  addList(body: any): Observable<any> {
    this.headers = this.httpHelper.getHeaders();
    this.options = this.httpHelper.getOptions(this.headers);

    let params: HttpParams = new HttpParams()
      .set('name', body.name)
      .set('language', body.language)
      .set('userId', body.userId);

    this.options = { ...this.options, params: params };

    return this.http.post(`${this.apiUrl}.json`, body, this.options);
  }

  getList(id: number): Observable<any> {
    this.headers = this.httpHelper.getHeaders();
    this.options = this.httpHelper.getOptions(this.headers);

    return this.http.get(`${this.apiUrl}/${id}.json`, this.options);
  }

  getLists(): Observable<any> {
    this.headers = this.httpHelper.getHeaders();
    this.options = this.httpHelper.getOptions(this.headers);

    return this.http.get(`${this.apiUrl}.json`, this.options);
  }

  deleteList(id: number): Observable<any> {
    this.headers = this.httpHelper.getHeaders();
    this.options = this.httpHelper.getOptions(this.headers);

    return this.http.delete(`${this.apiUrl}/${id}.json`, this.options);
  }

}