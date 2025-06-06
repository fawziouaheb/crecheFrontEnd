import { InitialEspacePersonnelleState } from './../../espace-personnelle-store/espace-personnelle.reducer';
import { createReducer, on } from '@ngrx/store';
import { StructureDto, MenuItemDto } from '../../../api-client';
import {
  clearSelectedStructure,
  loadSelectedStructure,
  loadSelectedStructureFailure,
  loadSelectedStructureSuccess,
} from './admin.actions';
import { clearToken } from '../../../store/authentification/auth.actions';

export interface AdminState {
  selectedStructure: StructureDto | null;
  loadingStructure: boolean;
  error: any;
}

export const initialAdminState: AdminState = {
  selectedStructure: null,
  loadingStructure: false,
  error: null,
};

export const adminReducer = createReducer(
  initialAdminState,

  // --- STRUCTURE ---
  on(loadSelectedStructure, (state) => ({
    ...state,
    loadingStructure: true,
    error: null,
  })),

  on(loadSelectedStructureSuccess, (state, { structure }) => ({
    ...state,
    selectedStructure: structure,
    loadingStructure: false,
    error: null,
  })),

  on(loadSelectedStructureFailure, (state, { error }) => ({
    ...state,
    loadingStructure: false,
    error,
  })),

  on(clearSelectedStructure, (state) => ({
    ...state,
    selectedStructure: null,
    loadingStructure: false,
    error: null,
  })),

  on(clearToken, () => ({ ...initialAdminState }))
);
