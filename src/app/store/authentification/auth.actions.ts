import { createAction, props } from '@ngrx/store';
import { AuthRequestDto, CurrentUserDto } from '../../api-client';

// Action pour l'authentification (connexion)
export const authentification = createAction(
  '[ Authentification ] Utilisateur se connecter.',
  props<{ request: AuthRequestDto }>()
);

// Action en cas de succès de l'authentification
export const authentificationSucces = createAction(
  '[ Authentification ] Utilisateur se connecter (SUCCES).',
  props<{ currentUser: CurrentUserDto }>()
);

// Action en cas d'échec de l'authentification
export const authentificationEchec = createAction(
  '[ Authentification ] Utilisateur se connecter (ECHEC).',
  props<{ error: Error }>()
);

// Action pour récupérer les informations de l'utilisateur
export const setCurrentUser = createAction(
  '[ Authentification ] Récupérer les informations utilisateur.',
  props<{ token: string | undefined }>()
);

// Action pour effacer les informations d'authentification (déconnexion)
export const clearToken = createAction(
  '[ Authentification ] Utilisateur est deconnecté.'
);
