import { Action } from '@ngrx/store';
// import { AvatarConnection, AvatarProxy } from '../../models/avatar.model';

export enum ActionTypes {
  LOAD_CONNECTIONS_REQUEST = '[Avatar][Connections] Load Connections Request',
  LOAD_CONNECTIONS_FAILURE = '[Avatar][Connections] Load Connections Failure',
  LOAD_CONNECTIONS_SUCCESS = '[Avatar][Connections] Load Connections Success',
  UPDATE_FACEBOOK_CONNECTION_REQUEST = '[Avatar][Connections] Update Facebook Request',
  UPDATE_ODNOKLASSNIKI_CONNECTION_REQUEST = '[Avatar][Connections] Update Odnoklassniki Request',
  UPDATE_WRONG_TYPE_CONNECTION_REQUEST = '[Avatar][Connections] Update Wrong Type Request',
  UPDATE_CONNECTIONS_REQUEST = '[Avatar][Connections] Update Connection Request',
  UPDATE_CONNECTIONS_FAILURE = '[Avatar][Connections] Update Connection Failure',
  UPDATE_CONNECTIONS_SUCCESS = '[Avatar][Connections] Update Connection Success',
  UPDATE_CONNECTIONS_WRONG_CREDENTIALS = '[Avatar][Connections] Update Connection Wrong Credentials',
}

export class LoadConnectionsRequest implements Action {
  readonly type = ActionTypes.LOAD_CONNECTIONS_REQUEST;
  constructor(public payload: { id: number }) {}
}

export class LoadConnectionsFailure implements Action {
  readonly type = ActionTypes.LOAD_CONNECTIONS_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class LoadConnectionsSuccess implements Action {
  readonly type = ActionTypes.LOAD_CONNECTIONS_SUCCESS;
  constructor(public payload: {
    connections: any[],
    proxies: any[]
  }) {}
}

export class UpdateConnectionRequest implements Action {
  readonly type = ActionTypes.UPDATE_CONNECTIONS_REQUEST;
  constructor(public payload: {
    connection: any,
    connectionId: string,
    id: number
  }) {}
}

export class UpdateConnectionFacebookRequest implements Action {
  readonly type = ActionTypes.UPDATE_FACEBOOK_CONNECTION_REQUEST;
  constructor(public payload: {
    connection: any,
    connectionId: string,
    id: number
  }) {}
}

export class UpdateConnectionOdnoklassnikiRequest implements Action {
  readonly type = ActionTypes.UPDATE_ODNOKLASSNIKI_CONNECTION_REQUEST;
  constructor(public payload: {
    connection: any,
    connectionId: string,
    id: number
  }) {}
}

export class UpdateConnectionWrongTypeRequest implements Action {
  readonly type = ActionTypes.UPDATE_WRONG_TYPE_CONNECTION_REQUEST;
  constructor() {}
}

export class UpdateConnectionFailure implements Action {
  readonly type = ActionTypes.UPDATE_CONNECTIONS_FAILURE;
  constructor(public payload: {
    error: any,
    connectionId: string
  }) {}
}

export class UpdateConnectionWrongCredentials implements Action {
  readonly type = ActionTypes.UPDATE_CONNECTIONS_WRONG_CREDENTIALS;
  constructor(public payload: {
    error: any,
    connection: any,
    connectionId: string
  }) {}
}

export class UpdateConnectionSuccess implements Action {
  readonly type = ActionTypes.UPDATE_CONNECTIONS_SUCCESS;
  constructor(public payload: {
    connection: any,
    connectionId: string,
    enabled: boolean
  }) {}
}
export type Actions =
  LoadConnectionsRequest | LoadConnectionsFailure | LoadConnectionsSuccess |
  UpdateConnectionRequest | UpdateConnectionFailure | UpdateConnectionSuccess | UpdateConnectionWrongCredentials |
  UpdateConnectionOdnoklassnikiRequest | UpdateConnectionFacebookRequest | UpdateConnectionWrongTypeRequest;
