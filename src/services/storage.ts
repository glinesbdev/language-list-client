import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {

  set(key: string, data: string): void {
    localStorage.setItem(key, data);
  }

  setLogin(data: string): void {
    localStorage.setItem('login', data);
  }

  get(key: string): string {
    return localStorage.getItem(key);
  }

  getLogin(): string {
    return localStorage.getItem('login');
  }

  getUserId(): number {
    if (this.getLogin() && this.getLogin().length) {
      return JSON.parse(this.getLogin())['userId'];
    }

    return 0;
  }

  getUserLanguage(): string {
    if (this.getLogin() && this.getLogin().length) {
      return JSON.parse(this.getLogin())['userLanguage'];
    }

    return '';
  }

  delete(key: string): void {
    localStorage.removeItem(key);
  }

  deleteLogin(): void {
    localStorage.removeItem('login');
  }

  clear(): void {
    localStorage.clear();
  }

}