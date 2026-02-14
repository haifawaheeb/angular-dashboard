import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Role } from '../core/models/Adminenums';

export interface TokenPair {
  access: string;
  refresh: string;
  role?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly api = environment.apiBase;

  private _roles$ = new BehaviorSubject<Role[]>([Role.Admin]);
  roles$ = this._roles$.asObservable();

  constructor(private http: HttpClient) {}

  // ✅ قراءة التوكن من التخزين
  get accessToken(): string | null {
    return localStorage.getItem('access');
  }

  setAccessToken(token: string | null): void {
    if (token) localStorage.setItem('access', token);
    else localStorage.removeItem('access');
  }

  // ✅ تسجيل دخول حقيقي من Django JWT (بدل التوكنات الوهمية)
  login(username: string, password: string): Observable<TokenPair> {
    return this.http
      .post<TokenPair>(`${this.api}/api/token/`, { username, password })
      .pipe(
        tap((tokens) => {
          this.storeTokens(tokens);
          this.setAccessToken(tokens.access);
        })
      );
  }

  // ✅ تحديث التوكن عبر refresh
  refreshToken(): Observable<TokenPair> {
    const refresh = localStorage.getItem('refresh');
    if (!refresh) return throwError(() => new Error('No refresh token'));

    return this.http
      .post<TokenPair>(`${this.api}/api/token/refresh/`, { refresh })
      .pipe(
        tap((tokens) => {
          // بعض السيرفرات ترجع access فقط، لذلك خزّني الموجود فقط
          if (tokens.access) localStorage.setItem('access', tokens.access);
          if (tokens.refresh) localStorage.setItem('refresh', tokens.refresh);
          if (tokens.role) localStorage.setItem('role', tokens.role);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    localStorage.removeItem('role');
  }

  private storeTokens(tokens: TokenPair): void {
    if (tokens.access) localStorage.setItem('access', tokens.access);
    if (tokens.refresh) localStorage.setItem('refresh', tokens.refresh);
    if (tokens.role) localStorage.setItem('role', tokens.role);
  }
}
