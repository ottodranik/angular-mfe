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

export function list (
  state = initialState.list,
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

export function details (
  state = initialState.details,
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
      return initialState.details;
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

// Combine reducers
// Add token for 'production' mode
export const reducers = combineReducers({
  list,
  avatarsTotal,
  isLoading,
  error,
  details,
  connections,
  proxies,
  currentTab,
  isCreateBtnDisabled,
  cities
});

export const reducersToken = new InjectionToken<ActionReducerMap<State>>('ClientAReducers');

export function getReducers() {
  return reducers;
}

export const reducersProvider = [
  { provide: reducersToken, useFactory: getReducers }
];

export const getAvatars = (state: State): any[] => state.list;
export const getSelectedDetails = (state: State): any => state.details;
export const getCurrentTab = (state: State): number => state.currentTab;
export const getConnections = (state: State): object => state.connections;
export const getProxies = (state: State): any[] => state.proxies;
export const getError = (state: State): any => state.error;
export const getIsLoading = (state: State): boolean => state.isLoading;
export const getAvatarsTotal = (state: State): number => state.avatarsTotal;
export const getIsCreateBtnDisabled = (state: State): boolean => state.isCreateBtnDisabled;
export const getCities = (state: State): any[] => state.cities;
