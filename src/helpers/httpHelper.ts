import { HttpHeaders } from '@angular/common/http';
import { StorageService } from '../services/storage';
import { Injectable } from '@angular/core';

@Injectable()
export class HttpHelper {

  constructor(private storageService: StorageService) {}

  private authHeaders: any = undefined;

  getHeaders(): HttpHeaders {
    this.populateAuthHeaders();
    let headers = new HttpHeaders({'Content-Type': 'application/json'});

    if (this.authHeaders !== undefined) {
      const { accessToken, client, expiry, tokenType, uid } = this.authHeaders;
      headers = new HttpHeaders({
        'Content-Type': 'applcation/json',
        'access-token': accessToken,
        'client': client,
        'expiry': expiry,
        'token-type': tokenType,
        'uid': uid
      });
    }

    return headers;
  }

  getOptions(headers: HttpHeaders): Object {
    return { headers: headers, observe: 'response' };
  }

  removeAuthHeaders(): void {
    this.authHeaders = undefined;
  }

  private populateAuthHeaders() {
    if (this.storageService.getLogin() && this.storageService.getLogin().length) {
      let login = JSON.parse(this.storageService.getLogin());

      this.authHeaders = {
        accessToken: login['access-token'],
        client: login['client'],
        expiry: login['expiry'],
        tokenType: login['token-type'],
        uid: login['uid'],
      };
    }
  }

}