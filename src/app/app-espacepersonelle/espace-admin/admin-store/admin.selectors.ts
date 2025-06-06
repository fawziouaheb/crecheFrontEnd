import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AdminState } from './admin.reducer';

// Sélecteur de base pour l'état global
export const selectAdminState = createFeatureSelector<AdminState>('admin');

// Structure sélectionnée
export const selectSelectedStructure = createSelector(
  selectAdminState,
  (state) => state.selectedStructure
);

// Chargement de la structure
export const selectStructureLoading = createSelector(
  selectAdminState,
  (state) => state.loadingStructure
);

// Erreur structure
export const selectStructureError = createSelector(
  selectAdminState,
  (state) => state.error
);
