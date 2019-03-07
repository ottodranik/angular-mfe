import {
  createFeatureSelector,
  createSelector,
  // MemoizedSelector
} from '@ngrx/store';

import { State } from './avatar.state';
import * as fromAvatar from './avatar.reducers';

// Create Avatar Selectors
export const selectAvatarState =
  createFeatureSelector<State>('avatar');

export const getAvatars = createSelector(
  selectAvatarState,
  fromAvatar.getAvatars
);

export const getAvatarsTotal = createSelector(
  selectAvatarState,
  fromAvatar.getAvatarsTotal
);

export const getError = createSelector(
  selectAvatarState,
  fromAvatar.getError
);

export const getIsLoading = createSelector(
  selectAvatarState,
  fromAvatar.getIsLoading
);

export const getSelectedDetails = createSelector(
  selectAvatarState,
  fromAvatar.getSelectedDetails
);

export const getConnections = createSelector(
  selectAvatarState,
  fromAvatar.getConnections
);

export const getProxies = createSelector(
  selectAvatarState,
  fromAvatar.getProxies
);

export const getCurrentTab = createSelector(
  selectAvatarState,
  fromAvatar.getCurrentTab
);

export const getIsCreateBtnDisabled = createSelector(
  selectAvatarState,
  fromAvatar.getIsCreateBtnDisabled
);

export const getCities = createSelector(
  selectAvatarState,
  fromAvatar.getCities
);

// export const avatarListState: MemoizedSelector<
//   object,
//   RequestsState
// > = createFeatureSelector<RequestsState>('avatar');

// export const getAvatarList: (
//   state: object
// ) => Avatar[] = featureAdapter.getSelectors(avatarListState).selectAll;

// export const selectJokeError: MemoizedSelector<object, any> = createSelector(
//   avatarListState,
//   getError
// );

// export const selectJokeIsLoading: MemoizedSelector<
//   object,
//   boolean
// > = createSelector(avatarListState, getIsLoading);
