import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import {
  authentification,
  authentificationEchec,
  authentificationSucces,
  clearToken,
  setCurrentUser,
} from './auth.actions';
import { AuthRestControllerService } from '../../api-client';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { isRole } from '../../utils/utils_role';
import { ROLES } from '../../constant/roles/constant-roles';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authentificationService: AuthRestControllerService,
    private serviceAuth: AuthService,
    private router: Router
  ) {}

  // Effet pour l'authentification
  authentification$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authentification),
      switchMap((action) => {
        return this.authentificationService.login(action.request).pipe(
          map((response) => {
            const token = response.token;
            const refreshToken = response.refreshToken;

            if (token && refreshToken) {
              this.serviceAuth.setToken(token);
              this.serviceAuth.setRefreshToken(refreshToken);
            }

            return setCurrentUser({ token });
          }),
          catchError((error) => {
            return of(authentificationEchec({ error }));
          })
        );
      })
    )
  );

  setCurrentUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setCurrentUser),
      switchMap(() => {
        const token = this.serviceAuth.getToken();
        if (token) {
          return this.authentificationService.getCurrentUser(token).pipe(
            map((userResponse) => {
              return authentificationSucces({ currentUser: userResponse });
            }),
            catchError((userError) => {
              return of(authentificationEchec({ error: userError }));
            })
          );
        } else {
          return of(
            authentificationEchec({ error: new Error('Token manquant') })
          );
        }
      })
    )
  );

  redirectAfterLogin$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authentificationSucces),
        tap(({ currentUser }) => {
          //CHANGER::::!!!!
          if (isRole(currentUser.role?.roleName, ROLES.ADMIN)) {
            this.router.navigate(['monespace/admin/dashboard']);
          } else if (isRole(currentUser.role?.roleName, ROLES.DIRECTOR)) {
            this.router.navigate(['/monespace/parents/dashboard']);
          } else if (isRole(currentUser.role?.roleName, ROLES.EMPLOYEE)) {
            this.router.navigate(['/monespace/employee/dashboard']);
          } else if (isRole(currentUser.role?.roleName, ROLES.PARENT)) {
            this.router.navigate(['/monespace/parents/dashboard']);
          } else {
            this.router.navigate(['/']);
          }
        })
      ),
    { dispatch: false } // Cet effet ne dispatch pas d'action
  );

  redirectAfterLogOut$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(clearToken),
        tap(() => {
          this.serviceAuth.removeRefreshToken();
          this.serviceAuth.removeToken();
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false } // Cet effet ne dispatch pas d'action
  );
}
