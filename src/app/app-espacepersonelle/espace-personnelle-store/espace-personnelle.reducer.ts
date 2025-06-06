import { createReducer, on } from '@ngrx/store';
import { MenuItemDto } from '../../api-client';
import {
  loadMenu,
  loadMenuFailure,
  loadMenuSuccess,
} from './espace-personnelle.actions';
import { clearToken } from '../../store/authentification/auth.actions';

export interface EspacePersonnelleState {
  menuItems: MenuItemDto[];
  loadingMenu: boolean;
  menuError: any;
}

export const InitialEspacePersonnelleState: EspacePersonnelleState = {
  menuItems: [],
  loadingMenu: false,
  menuError: null,
};

export const EspacePersonnelleReducer = createReducer(
  InitialEspacePersonnelleState,

  // --- MENU ---
  on(loadMenu, (state) => ({
    ...state,
    loadingMenu: true,
    menuError: null,
  })),

  on(loadMenuSuccess, (state, { items }) => ({
    ...state,
    loadingMenu: false,
    menuItems: items,
    menuError: null,
  })),

  on(loadMenuFailure, (state, { error }) => ({
    ...state,
    loadingMenu: false,
    menuError: error,
  })),

  // Réinitialisation du state à la déconnexion
  on(clearToken, () => ({ ...InitialEspacePersonnelleState }))
);
