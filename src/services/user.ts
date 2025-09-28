import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class User {
  private readonly TOKEN_KEY = 'auth_token';
  name: string | undefined;
  token: string | undefined;
  constructor() {
    console.log('calling user services')
  }
  setToken(toke: string) {
    this.token = toke;
    localStorage.setItem(this.TOKEN_KEY, toke);
  }
  getToken() {
    if (!this.token) {
      this.token = localStorage.getItem(this.TOKEN_KEY) || undefined;
    }
    return this.token || null;
  }
  clearToken() {
    this.token = undefined;
    localStorage.removeItem(this.TOKEN_KEY);
  }
  getUser() {

  }
  setUser() {

  }
} 