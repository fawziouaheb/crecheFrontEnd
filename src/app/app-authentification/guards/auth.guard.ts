import { inject } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { AuthService } from '../../store/authentification/auth.service';

export const authGuard = (): boolean | UrlTree => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.getToken();
  return token ? true : router.createUrlTree(['/login']);
};
