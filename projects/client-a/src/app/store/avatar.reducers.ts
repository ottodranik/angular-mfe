import { combineReducers, ActionReducerMap } from '@ngrx/store';
import {
  ClientAListActions,
  ClientACrudActions,
  ClientAAdditionalActions,
  ClientAImportActions,
  ClientAConnectionsActions,
  ClientAExportActions
} from './actions';
import { initialState, State } from './avatar.state';
// import { ClientA, ClientAConnection, ClientAListQueryModel, ClientADetails, ClientACity, ClientAProxy } from '../models/ClientA.model';
// import { ClientAStatus } from '../ClientA.enums';
import { InjectionToken } from '@angular/core';
// import { SseCrawlingErrors } from '@app/shared/shared.enums';

export function list (
  state = initialState.list,
  action: ClientAListActions.Actions
): any[] {
  switch (action.type) {
    case ClientAListActions.ActionTypes.LOAD_FAILURE: {
      return state;
    }
    case ClientAListActions.ActionTypes.LOAD_SUCCESS: {
      return action.payload.ClientAs;
    }
    default: {
      return state;
    }
  }
}

export function avatarsTotal (
  state = initialState.avatarsTotal,
  action: ClientAListActions.Actions
): number {
  switch (action.type) {
    case ClientAListActions.ActionTypes.LOAD_REQUEST:
    case ClientAListActions.ActionTypes.LOAD_FAILURE: {
      return state;
    }
    case ClientAListActions.ActionTypes.LOAD_SUCCESS: {
      return action.payload.totalItemsCount;
    }
    default: {
      return state;
    }
  }
}

export function isLoading (
  state = initialState.isLoading,
  action: ClientAListActions.Actions | ClientACrudActions.Actions | ClientAConnectionsActions.Actions
): boolean {
  switch (action.type) {
    case ClientAListActions.ActionTypes.LOAD_REQUEST:
    case ClientACrudActions.ActionTypes.LOAD_DETAILS_REQUEST:
    case ClientAConnectionsActions.ActionTypes.LOAD_CONNECTIONS_REQUEST: {
      return true;
    }
    case ClientAListActions.ActionTypes.LOAD_FAILURE:
    case ClientACrudActions.ActionTypes.LOAD_DETAILS_FAILURE:
    case ClientAConnectionsActions.ActionTypes.LOAD_CONNECTIONS_FAILURE:
    case ClientAListActions.ActionTypes.LOAD_SUCCESS:
    case ClientACrudActions.ActionTypes.LOAD_DETAILS_SUCCESS:
    case ClientAConnectionsActions.ActionTypes.LOAD_CONNECTIONS_SUCCESS: {
      return false;
    }
    default: {
      return state;
    }
  }
}

export function error (
  state = initialState.isLoading,
  action: ClientAListActions.Actions | ClientACrudActions.Actions | ClientAAdditionalActions.Actions
): any {
  switch (action.type) {
    case ClientAListActions.ActionTypes.LOAD_REQUEST:
    case ClientAListActions.ActionTypes.LOAD_SUCCESS:
    case ClientACrudActions.ActionTypes.LOAD_DETAILS_REQUEST:
    case ClientACrudActions.ActionTypes.LOAD_DETAILS_SUCCESS: {
      return null;
    }
    case ClientAListActions.ActionTypes.LOAD_FAILURE:
    case ClientACrudActions.ActionTypes.LOAD_DETAILS_FAILURE: {
      return action.payload.error;
    }
    case ClientAAdditionalActions.ActionTypes.CLEAR_AVATAR_DETAILS: {
      return initialState.isLoading;
    }
    default: {
      return state;
    }
  }
}

export function details (
  state = initialState.details,
  action: ClientACrudActions.Actions | ClientAImportActions.Actions | ClientAAdditionalActions.Actions | ClientAExportActions.Actions
): any {
  switch (action.type) {
    case ClientACrudActions.ActionTypes.LOAD_DETAILS_REQUEST:
    case ClientACrudActions.ActionTypes.LOAD_DETAILS_FAILURE: {
      return state;
    }
    case ClientACrudActions.ActionTypes.LOAD_DETAILS_SUCCESS: {
      return action.payload;
    }
    case ClientAAdditionalActions.ActionTypes.CLEAR_AVATAR_DETAILS: {
      return initialState.details;
    }
    /**
    * Get valid current ClientA state
    */
   case ClientAAdditionalActions.ActionTypes.GET_CURRENT_STATE_SUCCESS: {
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
  action: ClientAConnectionsActions.Actions | ClientAAdditionalActions.Actions | ClientAImportActions.Actions
): object {
  switch (action.type) {
    case ClientAConnectionsActions.ActionTypes.LOAD_CONNECTIONS_REQUEST:
    case ClientAConnectionsActions.ActionTypes.LOAD_CONNECTIONS_FAILURE: {
      return state;
    }
    case ClientAConnectionsActions.ActionTypes.LOAD_CONNECTIONS_SUCCESS: {
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
    case ClientAConnectionsActions.ActionTypes.UPDATE_CONNECTIONS_REQUEST: {
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
    case ClientAConnectionsActions.ActionTypes.UPDATE_CONNECTIONS_SUCCESS: {
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
    case ClientAConnectionsActions.ActionTypes.UPDATE_CONNECTIONS_WRONG_CREDENTIALS: {
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
    case ClientAConnectionsActions.ActionTypes.UPDATE_CONNECTIONS_FAILURE: {
      const current = state[action.payload.connectionId] || {};
      return {
        ...state,
        [action.payload.connectionId]: {
          ...current,
          isLoading: false
        }
      };
    }
    case ClientAAdditionalActions.ActionTypes.CLEAR_AVATAR_DETAILS: {
      return initialState.connections;
    }
    default: {
      return state;
    }
  }
}

export function proxies (
  state = initialState.proxies,
  action: ClientAConnectionsActions.Actions
): any[] {
  switch (action.type) {
    case ClientAConnectionsActions.ActionTypes.LOAD_CONNECTIONS_REQUEST:
    case ClientAConnectionsActions.ActionTypes.LOAD_CONNECTIONS_FAILURE: {
      return state;
    }
    case ClientAConnectionsActions.ActionTypes.LOAD_CONNECTIONS_SUCCESS: {
      return action.payload.proxies;
    }
    default: {
      return state;
    }
  }
}

export function currentTab (
  state = initialState.currentTab,
  action: ClientAAdditionalActions.Actions | ClientAListActions.Actions
): number {
  switch (action.type) {
    case ClientAAdditionalActions.ActionTypes.CHANGE_TAB:
    case ClientAListActions.ActionTypes.CHANGE_PAGINATION: {
      return action.payload.page;
    }
    case ClientAAdditionalActions.ActionTypes.CLEAR_AVATAR_DETAILS: {
      return initialState.currentTab;
    }
    default: {
      return state;
    }
  }
}

export function isCreateBtnDisabled (
  state = initialState.isCreateBtnDisabled,
  action: ClientACrudActions.Actions
): boolean {
  switch (action.type) {
    case ClientACrudActions.ActionTypes.CREATE_NEW_REQUEST: {
      return true;
    }
    case ClientACrudActions.ActionTypes.CREATE_NEW_SUCCESS:
    case ClientACrudActions.ActionTypes.CREATE_NEW_FAILURE: {
      return false;
    }
    default: {
      return state;
    }
  }
}

export function cities (
  state = initialState.cities,
  action: ClientAAdditionalActions.Actions
): any[] {
  switch (action.type) {
    case ClientAAdditionalActions.ActionTypes.SEARCH_CITIES_FAILURE: {
      return state;
    }
    case ClientAAdditionalActions.ActionTypes.SEARCH_CITIES_SUCCESS: {
      return action.payload;
    }
    case ClientAAdditionalActions.ActionTypes.SEARCH_CITIES_REQUEST:
    case ClientAAdditionalActions.ActionTypes.CLEAR_CITIES: {
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

export const getClientAs = (state: State): any[] => state.list;
export const getSelectedDetails = (state: State): any => state.details;
export const getCurrentTab = (state: State): number => state.currentTab;
export const getConnections = (state: State): object => state.connections;
export const getProxies = (state: State): any[] => state.proxies;
export const getError = (state: State): any => state.error;
export const getIsLoading = (state: State): boolean => state.isLoading;
export const getAvatarsTotal = (state: State): number => state.avatarsTotal;
export const getIsCreateBtnDisabled = (state: State): boolean => state.isCreateBtnDisabled;
export const getCities = (state: State): any[] => state.cities;
