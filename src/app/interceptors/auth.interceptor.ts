import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService, TokenPair } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAuthEndpoint =
    req.url.includes('/api/token/') || req.url.includes('/api/token/refresh/');

  const access = authService.accessToken;

  const authReq =
    access && !isAuthEndpoint
      ? req.clone({ setHeaders: { Authorization: `Bearer ${access}` } })
      : req;

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && !isAuthEndpoint) {
        return authService.refreshToken().pipe(
          switchMap((tokens: TokenPair) => {
            authService.setAccessToken(tokens.access);

            const retryReq = req.clone({
              setHeaders: { Authorization: `Bearer ${tokens.access}` },
            });

            return next(retryReq);
          }),
          catchError((refreshErr) => {
            authService.logout();
            router.navigate(['/login']);
            return throwError(() => refreshErr);
          })
        );
      }

      return throwError(() => error);
    })
  );
};
