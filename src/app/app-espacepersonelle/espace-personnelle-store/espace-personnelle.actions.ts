import { createAction, props } from '@ngrx/store';
import { MenuItemDto } from '../../api-client';

// Chargement de menu item
export const loadMenu = createAction('[Admin] Loading menu');

export const loadMenuSuccess = createAction(
  '[Admin] Menu est bien chargée',
  props<{ items: MenuItemDto[] }>()
);

export const loadMenuFailure = createAction(
  '[Admin] Menu échec du chargement',
  props<{ error: any }>()
);
