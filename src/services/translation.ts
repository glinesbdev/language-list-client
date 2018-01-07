import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpHelper } from '../helpers/httpHelper';

@Injectable()
export class TranslationService {

  constructor(private http: HttpClient, private httpHelper: HttpHelper) {}

  private apiUrl: string = 'http://localhost:3000/api/v1/translate';
  private headers: HttpHeaders;
  private options: Object;

  getTranslation(body: any): Observable<any> {
    this.headers = this.httpHelper.getHeaders();
    this.options = this.httpHelper.getOptions(this.headers);

    let params: HttpParams = new HttpParams()
      .set('from', body.from)
      .set('to', body.to)
      .set('words', body.words);

    this.options = { ...this.options, params: params };

    return this.http.post(`${this.apiUrl}.json`, body, this.options);
  }

}