import { Injectable } from "@angular/core";
import { OnInit } from "@angular/core/src/metadata/lifecycle_hooks";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs/Observable';
import { StorageService } from "./storage";

@Injectable()
export class UserService implements OnInit {

  constructor(private http: HttpClient, private storageService: StorageService) {}

  private apiUrl: string = 'http://localhost:3000/api/v1/user';
  private authHeaders = undefined;

  ngOnInit(): void {
  }

  getUser(id: number): Observable<any> {
    this.populateAuthHeaders();
    let headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

    if (this.authHeaders !== undefined) {
      const { contentType, accessToken, client, expiry, tokenType, uid } = this.authHeaders;
      headers = new HttpHeaders({
        'Content-Type': 'applcation/json',
        'access-token': accessToken,
        'client': client,
        'expiry': expiry,
        'token-type': tokenType,
        'uid': uid
      });
    }

    let options: Object = { headers: headers, observe: 'response' };
    return this.http.get(`${this.apiUrl}/${id}.json`, options);
  }

  private populateAuthHeaders() {
    if (this.storageService.getLogin() && this.storageService.getLogin().length) {
      let data = JSON.parse(this.storageService.getLogin());

      this.authHeaders = {
        accessToken: data['access-token'],
        client: data['client'],
        expiry: data['expiry'],
        tokenType: data['token-type'],
        uid: data['uid'],
      };
    }
  }

}