import { Injectable } from '@angular/core';

@Injectable()
export class TokenService {

  private _accessToken: string = null;
  private _refreshToken: string = null;

  get accessToken(): string {
    return this._accessToken;
  }

  set accessToken(token: string) {
    this._accessToken = 'Bearer ' + token;
  }

  get refreshToken(): string {
    return this._refreshToken;
  }

  set refreshToken(token: string) {
    this._refreshToken = token;
  }
}
