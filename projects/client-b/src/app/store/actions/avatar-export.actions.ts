import { Action } from '@ngrx/store';
// import { SseResponseAvatarDataModel } from '@app/shared/models/sse-model';

export enum ActionTypes {
  EXPORT_START_REQUEST = '[Avatar][Export] Start Request',
  EXPORT_START_SUCCESS = '[Avatar][Export] Start Success',
  EXPORT_START_FAILURE = '[Avatar][Export] Start Failure',
  EXPORT_COMPLETE_SUCCESS = '[Avatar][Export] Complete Success',
  EXPORT_COMPLETE_FAILURE = '[Avatar][Export] Complete Failure',
}

export class ExportStartRequest implements Action {
  readonly type = ActionTypes.EXPORT_START_REQUEST;
  constructor(public payload: {
    id: number,
    targets: string[],
    fields: string[]
  }) {}
}

export class ExportStartSuccess implements Action {
  readonly type = ActionTypes.EXPORT_START_SUCCESS;
  constructor(public payload: any) {}
}

export class ExportStartFailure implements Action {
  readonly type = ActionTypes.EXPORT_START_FAILURE;
  constructor(public payload: any) {}
}

export class ExportCompleteSuccess implements Action {
  readonly type = ActionTypes.EXPORT_COMPLETE_SUCCESS;
  constructor(public payload: any) {}
}

export class ExportCompleteFailure implements Action {
  readonly type = ActionTypes.EXPORT_COMPLETE_FAILURE;
  constructor(public payload: any) {}
}

export type Actions =
  ExportStartRequest | ExportStartSuccess | ExportStartFailure |
  ExportCompleteSuccess | ExportCompleteFailure;
