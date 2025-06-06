import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  StructureRestControllerService,
  MenuItemRestControllerService,
  ApiResponseObject,
  MenuItemDto,
  MenuRequestDto,
} from '../../api-client';
import { withLatestFrom, mergeMap, of, map, catchError } from 'rxjs';
import { selectCurrentUser } from '../../store/authentification/auth.selector';
import {
  loadMenu,
  loadMenuFailure,
  loadMenuSuccess,
} from './espace-personnelle.actions';

@Injectable()
export class EspacePersonnelleEffects {
  constructor(
    private actions$: Actions,
    private menuService: MenuItemRestControllerService,
    private store: Store
  ) {}

  loadMenu$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadMenu),
      withLatestFrom(this.store.select(selectCurrentUser)),
      mergeMap(([_, currentUser]) => {
        if (!currentUser || !currentUser.role) {
          return of(loadMenuFailure({ error: 'Utilisateur ou rôle manquant' }));
        }

        if (!currentUser?.id || !currentUser?.role?.roleName) {
          return of(loadMenuFailure({ error: 'Utilisateur ou rôle manquant' }));
        }

        const request: MenuRequestDto = {
          role: currentUser.role.roleName,
        };

        return this.menuService.getMenu(request).pipe(
          map((response: ApiResponseObject) =>
            loadMenuSuccess({
              items: (response.data as MenuItemDto[]) || [],
            })
          ),
          catchError((error) => of(loadMenuFailure({ error })))
        );
      })
    )
  );
}
