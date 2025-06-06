// --- MENU ---

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EspacePersonnelleState } from './espace-personnelle.reducer';

export const selectEspacePersonnelle =
  createFeatureSelector<EspacePersonnelleState>('espacepersonnelle');

export const selectMenuItems = createSelector(
  selectEspacePersonnelle,
  (state) => state.menuItems
);

// Chargement du menu
export const selectLoadingMenu = createSelector(
  selectEspacePersonnelle,
  (state) => state.loadingMenu
);

// Erreur du menu
export const selectMenuError = createSelector(
  selectEspacePersonnelle,
  (state) => state.menuError
);
