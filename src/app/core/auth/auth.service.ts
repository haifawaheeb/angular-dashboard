import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Role } from '../models/Adminenums';

interface TokenPair {
  access: string;
  refresh: string;
  role?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  private api = environment.apiBase;

  private _roles$ = new BehaviorSubject<Role[]>([Role.Admin]);
  roles$ = this._roles$.asObservable();

  constructor(private http: HttpClient) {}

  /* ================= TOKENS ================= */

  get accessToken(): string | null {
    return localStorage.getItem('access');
  }

  setAccessToken(token: string | null): void {
    if (token) localStorage.setItem('access', token);
    else localStorage.removeItem('access');
  }

  private storeTokens(tokens: TokenPair) {
    if (tokens.access) localStorage.setItem('access', tokens.access);
    if (tokens.refresh) localStorage.setItem('refresh', tokens.refresh);
    if (tokens.role) localStorage.setItem('role', tokens.role);
  }

  /* ================= AUTH ================= */

  login(username: string, password: string) {
    // Mock login (مؤقت)
    const fake: TokenPair = {
      access: 'mock-access-token',
      refresh: 'mock-refresh-token',
      role: 'Admin'
    };

    this.storeTokens(fake);
    return of(fake);
  }

  refreshToken() {
    const refresh = localStorage.getItem('refresh');
    if (!refresh) return throwError(() => new Error('No refresh token'));

    return this.http
      .post<TokenPair>(`${this.api}/api/token/refresh/`, { refresh })
      .pipe(
        tap(tokens => {
          this.storeTokens(tokens);
          this.setAccessToken(tokens.access);
        })
      );
  }

  logout() {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    localStorage.removeItem('role');
  }

  isLoggedIn(): boolean {
    return !!this.accessToken;
  }

  get currentRole(): string | null {
    return localStorage.getItem('role');
  }
}
