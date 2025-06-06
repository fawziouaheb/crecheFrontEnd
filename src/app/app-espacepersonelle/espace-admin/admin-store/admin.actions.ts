import { createAction, props } from '@ngrx/store';
import { MenuItemDto, StructureDto } from '../../../api-client';

export const setSelectedStructure = createAction(
  '[Admin] Set Selected Structure',
  props<{ structure: StructureDto }>()
);

export const clearSelectedStructure = createAction(
  '[Admin] Clear Selected Structure'
);

// Action déclenchée par le composant
export const loadSelectedStructure = createAction(
  '[Admin] Load Selected Structure',
  props<{ name: string }>()
);

// Actions déclenchées par l’effect
export const loadSelectedStructureSuccess = createAction(
  '[Admin] Load Selected Structure Success',
  props<{ structure: StructureDto }>()
);

export const loadSelectedStructureFailure = createAction(
  '[Admin] Load Selected Structure Failure',
  props<{ error: any }>()
);
