import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

export function redirectAfterLogin() {
  const router = inject(Router);
  const auth = inject(AuthService);

  const role = auth.currentRole;

  switch (role) {
    case 'Admin':
      router.navigate(['/dashboard']);
      break;

    case 'Teacher':
      router.navigate(['/lessons']);
      break;

    case 'Student':
      router.navigate(['/student']);
      break;

    default:
      router.navigate(['/dashboard']); // fallback
  }
}
