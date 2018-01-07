import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpHelper } from '../helpers/httpHelper';

@Injectable()
export class LanguageService {

  constructor(private http: HttpClient, private httpHelper: HttpHelper) {}

  private apiUrl: string = 'http://localhost:3000/api/v1/translate';
  private headers: HttpHeaders;
  private options: Object;

  getLanguages(): Observable<any> {
    this.headers = this.httpHelper.getHeaders();
    this.options = this.httpHelper.getOptions(this.headers);

    return this.http.get(`${this.apiUrl}/languages.json`, this.options);
  }

}