import { createReducer, on } from '@ngrx/store';
import { authentificationSucces, clearToken } from './auth.actions';
import { CurrentUserDto } from '../../api-client';

export interface AuthentificationState {
  currentUser: CurrentUserDto | null;
}

// L'état initial
export const initialState: AuthentificationState = {
  currentUser: null,
};

export const authReducer = createReducer(
  initialState,
  // Lorsque l'utilisateur est authentifié avec succès, on met à jour l'état avec les informations de l'utilisateur
  on(authentificationSucces, (state, { currentUser }) => {
    return {
      ...state,
      currentUser,
    };
  }),

  // Lorsque l'utilisateur se déconnecte, on réinitialise l'état
  on(clearToken, () => ({ ...initialState }))
);
