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