import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class User {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly NAME_KEY = 'username';
  name: string | undefined;
  token: string | undefined;
  constructor() {
    this.name = localStorage.getItem(this.NAME_KEY) || undefined;
    this.token = localStorage.getItem(this.TOKEN_KEY) || undefined;
  }
  setname(name: string) {
    this.name = name;
    localStorage.setItem(this.NAME_KEY, name);
  }
  getname() {
    if (!this.name) {
      this.name = localStorage.getItem(this.NAME_KEY) || undefined;
    }
    return this.name;
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
  get isLoggedIn() {
    return !!this.getToken();
  }

} 