import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  loadSelectedStructure,
  loadSelectedStructureSuccess,
  loadSelectedStructureFailure,
} from './admin.actions';
import {
  ApiResponseObject,
  StructureDto,
  MenuItemDto,
  StructureRestControllerService,
  MenuItemRestControllerService,
  MenuRequestDto,
} from '../../../api-client';
import { catchError, map, mergeMap, of, withLatestFrom } from 'rxjs';

@Injectable()
export class AdminEffects {
  constructor(
    private actions$: Actions,
    private structureService: StructureRestControllerService
  ) {}
  // Effect pour charger la structure
  loadSelectedStructure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadSelectedStructure),
      mergeMap(({ name }) =>
        this.structureService.getStructure(name).pipe(
          map((response: ApiResponseObject) =>
            loadSelectedStructureSuccess({
              structure: response.data as StructureDto,
            })
          ),
          catchError((error) => of(loadSelectedStructureFailure({ error })))
        )
      )
    )
  );
}
