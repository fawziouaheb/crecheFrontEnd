import { inject } from '@angular/core';
import { Router, ActivatedRouteSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthentificationState } from '../../store/authentification/auth.reducer';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { selectCurrentUser } from '../../store/authentification/auth.selector';

export const roleGuard = (
  route: ActivatedRouteSnapshot
): Observable<boolean | UrlTree> => {
  const store = inject(Store<{ auth: AuthentificationState }>);
  const router = inject(Router);

  const requiredRoles: string[] = route.data['roles'];

  return store.select(selectCurrentUser).pipe(
    take(1),
    map((currentUser) => {
      if (
        currentUser &&
        currentUser.role?.roleName &&
        requiredRoles.includes(currentUser.role.roleName)
      ) {
        return true;
      }
      return router.createUrlTree(['/monespace/unauthorized']);
    })
  );
};
