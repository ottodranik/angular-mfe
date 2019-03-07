import {
  ActionReducerMap,
  ActionReducer,
  MetaReducer
} from '@ngrx/store';
import { storeLogger } from 'ngrx-store-logger';
import { State } from './app.state';
import { InjectionToken } from '@angular/core';

export function shellIsLoad (
  state = false,
  action
): boolean {
  switch (action.type) {
    default: {
      return state;
    }
  }
}

// Global reducers map
export const reducer: ActionReducerMap<State> = {
  shellIsLoad
};

export const reducersToken = new InjectionToken<ActionReducerMap<State>>('AppReducers');

export function getReducers() {
  return reducer;
}

export const reducersProvider = [
  { provide: reducersToken, useFactory: getReducers }
];

// Logger function
export function logger(reducerToWrap: ActionReducer<{}>): any {
  return storeLogger()(reducerToWrap);
}

// Include meta reducers with logger middleware
export const metaReducers: MetaReducer<{}>[] = [logger];
