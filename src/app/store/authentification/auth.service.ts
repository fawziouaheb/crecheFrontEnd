import { Injectable } from '@angular/core';
import {
  REFRESH_TOKEN,
  TOKEN,
} from '../../constant/authentification/auth-constant';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}
  setToken(token: string): void {
    localStorage.setItem(TOKEN, token);
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN);
  }

  setRefreshToken(refreshToken: string): void {
    localStorage.setItem(REFRESH_TOKEN, refreshToken);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(REFRESH_TOKEN);
  }

  removeToken(): void {
    localStorage.removeItem(TOKEN);
  }

  removeRefreshToken(): void {
    localStorage.removeItem(REFRESH_TOKEN);
  }
}
