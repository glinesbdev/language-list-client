import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { HttpHelper } from '../helpers/httpHelper';

@Injectable()
export class ListWordService {

  constructor(private http: HttpClient, private httpHelper: HttpHelper) {}

  private apiUrl: string = 'http://localhost:3000/api/v1/word_list_item';
  private headers: HttpHeaders;
  private options: Object;

  addWord(body: any): Observable<any> {
    this.headers = this.httpHelper.getHeaders();
    this.options = this.httpHelper.getOptions(this.headers);

    let params: HttpParams = new HttpParams()
      .set('word', body.word)
      .set('translation', body.translation)
      .set('context', body.context)
      .set('word_list_id', body.word_list_id);

    this.options = { ...this.options, params: params };

    return this.http.post(`${this.apiUrl}.json`, body, this.options);
  }

  editWord(body: any): Observable<any> {
    this.headers = this.httpHelper.getHeaders();
    this.options = this.httpHelper.getOptions(this.headers);

    let params: HttpParams = new HttpParams()
      .set('word', body.word)
      .set('translation', body.translation)
      .set('context', body.context)
      .set('word_list_id', body.word_list_id);

    this.options = { ...this.options, params: params };

    return this.http.put(`${this.apiUrl}/${body.id}.json`, body, this.options);
  }

  deleteWord(id: number): Observable<any> {
    this.headers = this.httpHelper.getHeaders();
    this.options = this.httpHelper.getOptions(this.headers);

    return this.http.delete(`${this.apiUrl}/${id}`, this.options);
  }

}