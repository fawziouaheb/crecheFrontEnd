import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthentificationState } from './auth.reducer';

export const selectAuthState =
  createFeatureSelector<AuthentificationState>('auth');

// Selector pour récupérer l'utilisateur connecté
export const selectCurrentUser = createSelector(
  selectAuthState,
  (state: AuthentificationState) => state.currentUser
);
