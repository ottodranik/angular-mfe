import { combineReducers, ActionReducerMap } from '@ngrx/store';
import {
  AvatarListActions,
  AvatarCrudActions,
  AvatarAdditionalActions,
  AvatarImportActions,
  AvatarConnectionsActions,
  AvatarExportActions
} from './actions';
import { initialState, State } from './avatar.state';
// import { Avatar, AvatarConnection, AvatarListQueryModel, AvatarDetails, AvatarCity, AvatarProxy } from '../models/avatar.model';
// import { AvatarStatus } from '../avatar.enums';
import { InjectionToken } from '@angular/core';
// import { SseCrawlingErrors } from '@app/shared/shared.enums';

export function avatars (
  state = initialState.avatars,
  action: AvatarListActions.Actions
): any[] {
  switch (action.type) {
    case AvatarListActions.ActionTypes.LOAD_FAILURE: {
      return state;
    }
    case AvatarListActions.ActionTypes.LOAD_SUCCESS: {
      return action.payload.avatars;
    }
    default: {
      return state;
    }
  }
}

export function avatarsTotal (
  state = initialState.avatarsTotal,
  action: AvatarListActions.Actions
): number {
  switch (action.type) {
    case AvatarListActions.ActionTypes.LOAD_REQUEST:
    case AvatarListActions.ActionTypes.LOAD_FAILURE: {
      return state;
    }
    case AvatarListActions.ActionTypes.LOAD_SUCCESS: {
      return action.payload.totalItemsCount;
    }
    default: {
      return state;
    }
  }
}

export function listQuery (
  state = initialState.listQuery,
  action: AvatarListActions.Actions
): any {
  switch (action.type) {
    case AvatarListActions.ActionTypes.CHANGE_FILTER:
    case AvatarListActions.ActionTypes.CHANGE_PAGINATION:
    case AvatarListActions.ActionTypes.CHANGE_SORTING: {
      return {
        ...state,
        ...action.payload
      };
    }
    case AvatarListActions.ActionTypes.CLEAR_LIST_QUERY: {
      return initialState.listQuery;
    }
    default: {
      return state;
    }
  }
}

export function isLoading (
  state = initialState.isLoading,
  action: AvatarListActions.Actions | AvatarCrudActions.Actions | AvatarConnectionsActions.Actions
): boolean {
  switch (action.type) {
    case AvatarListActions.ActionTypes.LOAD_REQUEST:
    case AvatarCrudActions.ActionTypes.LOAD_DETAILS_REQUEST:
    case AvatarConnectionsActions.ActionTypes.LOAD_CONNECTIONS_REQUEST: {
      return true;
    }
    case AvatarListActions.ActionTypes.LOAD_FAILURE:
    case AvatarCrudActions.ActionTypes.LOAD_DETAILS_FAILURE:
    case AvatarConnectionsActions.ActionTypes.LOAD_CONNECTIONS_FAILURE:
    case AvatarListActions.ActionTypes.LOAD_SUCCESS:
    case AvatarCrudActions.ActionTypes.LOAD_DETAILS_SUCCESS:
    case AvatarConnectionsActions.ActionTypes.LOAD_CONNECTIONS_SUCCESS: {
      return false;
    }
    default: {
      return state;
    }
  }
}

export function error (
  state = initialState.isLoading,
  action: AvatarListActions.Actions | AvatarCrudActions.Actions | AvatarAdditionalActions.Actions
): any {
  switch (action.type) {
    case AvatarListActions.ActionTypes.LOAD_REQUEST:
    case AvatarListActions.ActionTypes.LOAD_SUCCESS:
    case AvatarCrudActions.ActionTypes.LOAD_DETAILS_REQUEST:
    case AvatarCrudActions.ActionTypes.LOAD_DETAILS_SUCCESS: {
      return null;
    }
    case AvatarListActions.ActionTypes.LOAD_FAILURE:
    case AvatarCrudActions.ActionTypes.LOAD_DETAILS_FAILURE: {
      return action.payload.error;
    }
    case AvatarAdditionalActions.ActionTypes.CLEAR_AVATAR_DETAILS: {
      return initialState.isLoading;
    }
    default: {
      return state;
    }
  }
}

export function selected (
  state = initialState.selected,
  action: AvatarCrudActions.Actions | AvatarAdditionalActions.Actions
): any {
  switch (action.type) {
    case AvatarCrudActions.ActionTypes.LOAD_DETAILS_REQUEST: {
      return {
        id: action.payload.id
      };
    }
    case AvatarCrudActions.ActionTypes.LOAD_DETAILS_SUCCESS: {
      const { firstName, lastName, middleName } = action.payload;
      return {
        id: state.id,
        name: `${lastName} ${firstName} ${middleName || ''}`,
        type: action.payload.type
      };
    }
    case AvatarAdditionalActions.ActionTypes.CLEAR_AVATAR_DETAILS: {
      return initialState.selected;
    }
    case AvatarCrudActions.ActionTypes.LOAD_DETAILS_FAILURE:
    default: {
      return state;
    }
  }
}

export function selectedDetails (
  state = initialState.selectedDetails,
  action: AvatarCrudActions.Actions | AvatarImportActions.Actions | AvatarAdditionalActions.Actions | AvatarExportActions.Actions
): any {
  switch (action.type) {
    case AvatarCrudActions.ActionTypes.LOAD_DETAILS_REQUEST:
    case AvatarCrudActions.ActionTypes.LOAD_DETAILS_FAILURE: {
      return state;
    }
    case AvatarCrudActions.ActionTypes.LOAD_DETAILS_SUCCESS: {
      return action.payload;
    }
    case AvatarAdditionalActions.ActionTypes.CLEAR_AVATAR_DETAILS: {
      return initialState.selectedDetails;
    }
    /**
    * Get valid current avatar state
    */
   case AvatarAdditionalActions.ActionTypes.GET_CURRENT_STATE_SUCCESS: {
     return state
       ? {
         ...state,
         ...action.payload
       }
       : state;
   }
    default: {
      return state;
    }
  }
}

export function selectedLog (
  state = initialState.selectedLog,
  action: AvatarCrudActions.Actions | AvatarImportActions.Actions | AvatarAdditionalActions.Actions
): any[] {
  switch (action.type) {
    case AvatarImportActions.ActionTypes.LOAD_ACTIVITY_LOG_SUCCESS: {
      return action.payload
        .map(item => ({
            createdAt: item.createdAt,
            error: item.error,
            messageType: item.entryType + '_' + item.snType
          })
        )
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 6);
    }
    case AvatarImportActions.ActionTypes.LOAD_ACTIVITY_LOG_REQUEST: {
      return [];
    }
    case AvatarImportActions.ActionTypes.IMPORT_COMPLETE_FAILURE:
    case AvatarAdditionalActions.ActionTypes.CLEAR_AVATAR_DETAILS:
    case AvatarCrudActions.ActionTypes.LOAD_DETAILS_FAILURE: {
      return initialState.selectedLog;
    }
    case AvatarAdditionalActions.ActionTypes.CHANGE_TAB: {
      return action.payload.tabIndex === 1
        ? initialState.selectedLog
        : state;
    }
    default: {
      return state;
    }
  }
}

export function connections (
  state = initialState.connections,
  action: AvatarConnectionsActions.Actions | AvatarAdditionalActions.Actions | AvatarImportActions.Actions
): object {
  switch (action.type) {
    case AvatarConnectionsActions.ActionTypes.LOAD_CONNECTIONS_REQUEST:
    case AvatarConnectionsActions.ActionTypes.LOAD_CONNECTIONS_FAILURE: {
      return state;
    }
    case AvatarConnectionsActions.ActionTypes.LOAD_CONNECTIONS_SUCCESS: {
      /**
       * Serialize connections array to object
       */
      return action.payload.connections.reduce((res, item: any) => {
        res[item.type] = {
          ...item,
          isLoading: false
        };
        return res;
      }, {});
    }
    case AvatarConnectionsActions.ActionTypes.UPDATE_CONNECTIONS_REQUEST: {
      const current = state[action.payload.connectionId] || {};
      return {
        ...state,
        [action.payload.connectionId]: {
          ...current,
          ...action.payload.connection,
          enabled: current.enabled,
          isLoading: true
        }
      };
    }
    case AvatarConnectionsActions.ActionTypes.UPDATE_CONNECTIONS_SUCCESS: {
      const current = state[action.payload.connectionId] || {};
      return {
        ...state,
        [action.payload.connectionId]: {
          ...current,
          ...action.payload.connection,
          isLoading: false
        }
      };
    }
    case AvatarConnectionsActions.ActionTypes.UPDATE_CONNECTIONS_WRONG_CREDENTIALS: {
      const current = state[action.payload.connectionId] || {};
      return {
        ...state,
        [action.payload.connectionId]: {
          ...current,
          ...action.payload.connection,
          enabled: current.enabled,
          isLoading: false
        }
      };
    }
    case AvatarConnectionsActions.ActionTypes.UPDATE_CONNECTIONS_FAILURE: {
      const current = state[action.payload.connectionId] || {};
      return {
        ...state,
        [action.payload.connectionId]: {
          ...current,
          isLoading: false
        }
      };
    }
    case AvatarAdditionalActions.ActionTypes.CLEAR_AVATAR_DETAILS: {
      return initialState.connections;
    }
    default: {
      return state;
    }
  }
}

export function proxies (
  state = initialState.proxies,
  action: AvatarConnectionsActions.Actions
): any[] {
  switch (action.type) {
    case AvatarConnectionsActions.ActionTypes.LOAD_CONNECTIONS_REQUEST:
    case AvatarConnectionsActions.ActionTypes.LOAD_CONNECTIONS_FAILURE: {
      return state;
    }
    case AvatarConnectionsActions.ActionTypes.LOAD_CONNECTIONS_SUCCESS: {
      return action.payload.proxies;
    }
    default: {
      return state;
    }
  }
}

export function currentTab (
  state = initialState.currentTab,
  action: AvatarAdditionalActions.Actions
): number {
  switch (action.type) {
    case AvatarAdditionalActions.ActionTypes.CHANGE_TAB: {
      return action.payload.tabIndex;
    }
    case AvatarAdditionalActions.ActionTypes.CLEAR_AVATAR_DETAILS: {
      return initialState.currentTab;
    }
    default: {
      return state;
    }
  }
}

export function isCreateBtnDisabled (
  state = initialState.isCreateBtnDisabled,
  action: AvatarCrudActions.Actions
): boolean {
  switch (action.type) {
    case AvatarCrudActions.ActionTypes.CREATE_NEW_REQUEST: {
      return true;
    }
    case AvatarCrudActions.ActionTypes.CREATE_NEW_SUCCESS:
    case AvatarCrudActions.ActionTypes.CREATE_NEW_FAILURE: {
      return false;
    }
    default: {
      return state;
    }
  }
}

export function cities (
  state = initialState.cities,
  action: AvatarAdditionalActions.Actions
): any[] {
  switch (action.type) {
    case AvatarAdditionalActions.ActionTypes.SEARCH_CITIES_FAILURE: {
      return state;
    }
    case AvatarAdditionalActions.ActionTypes.SEARCH_CITIES_SUCCESS: {
      return action.payload;
    }
    case AvatarAdditionalActions.ActionTypes.SEARCH_CITIES_REQUEST:
    case AvatarAdditionalActions.ActionTypes.CLEAR_CITIES: {
      return initialState.cities;
    }
    default: {
      return state;
    }
  }
}

export function importDiffs (
  state = initialState.importDiffs,
  action: AvatarImportActions.Actions | AvatarAdditionalActions.Actions
): any {
  switch (action.type) {
    case AvatarImportActions.ActionTypes.LOAD_IMPORT_DIFF_SUCCESS: {
      return {
        ...state,
        [action.payload.id]: action.payload.diff
      };
    }
    case AvatarImportActions.ActionTypes.LOAD_IMPORT_DIFF_REQUEST:
    case AvatarImportActions.ActionTypes.CANCEL_IMPORT_DIFF_SUCCESS:
    case AvatarImportActions.ActionTypes.CONFIRM_IMPORT_DIFF_SUCCESS:
    case AvatarAdditionalActions.ActionTypes.CLEAR_AVATAR_DETAILS: {
      return initialState.importDiffs;
    }
    case AvatarImportActions.ActionTypes.LOAD_IMPORT_DIFF_FAILURE:
    default: {
      return state;
    }
  }
}

export function awaitImportConfirmation (
  state = initialState.awaitImportConfirmation,
  action: AvatarImportActions.Actions | AvatarAdditionalActions.Actions | AvatarExportActions.Actions
): number[] {
  switch (action.type) {
    /**
     * Add avatar id to 'await array' when import of this avatar was finished
     */
    case AvatarImportActions.ActionTypes.IMPORT_COMPLETE_SUCCESS:
    case AvatarExportActions.ActionTypes.EXPORT_COMPLETE_SUCCESS:
    case AvatarExportActions.ActionTypes.EXPORT_COMPLETE_FAILURE: {
      const newData = [
        ...state,
        action.payload.avatarId
      ];
      return Array.from(new Set(newData)); // Use `Set` to get only unique values
    }
    /**
     * Remove avatar id from 'await array' if Avatar Details of this avatar was requested
     */
    case AvatarAdditionalActions.ActionTypes.GET_CURRENT_STATE_REQUEST: {
      const index = state.indexOf(action.payload.id);
      return index !== -1 ? state.slice(index, -1) : state;
    }
    default: {
      return state;
    }
  }
}

// Combine reducers
// Add token for 'production' mode
export const reducers = combineReducers({
  avatars,
  avatarsTotal,
  listQuery,
  isLoading,
  error,
  selected,
  selectedDetails,
  selectedLog,
  connections,
  proxies,
  currentTab,
  isCreateBtnDisabled,
  cities,
  importDiffs,
  awaitImportConfirmation
});

export const reducersToken = new InjectionToken<ActionReducerMap<State>>('AvatarReducers');

export function getReducers() {
  return reducers;
}

export const reducersProvider = [
  { provide: reducersToken, useFactory: getReducers }
];

export const getAvatars = (state: State): any[] => state.avatars;
export const getSelected = (state: State): any => state.selected;
export const getSelectedDetails = (state: State): any => state.selectedDetails;
export const getCurrentTab = (state: State): number => state.currentTab;
export const getConnections = (state: State): object => state.connections;
export const getProxies = (state: State): any[] => state.proxies;
export const getError = (state: State): any => state.error;
export const getIsLoading = (state: State): boolean => state.isLoading;
export const getAvatarsTotal = (state: State): number => state.avatarsTotal;
export const getListQuery = (state: State): any => state.listQuery;
export const getSortBy = (state: State): object => state.listQuery.sortBy;
export const getIsCreateBtnDisabled = (state: State): boolean => state.isCreateBtnDisabled;
export const getCities = (state: State): any[] => state.cities;
export const getImportDiffs = (state: State): any => state.importDiffs;
export const getAwaitImportConfirmation = (state: State): any => state.awaitImportConfirmation;
export const getAvatarLog = (state: State): any => state.selectedLog;
