import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
// import { AvatarService } from '../services/avatar.service';
import * as actions from './actions';
import { Store } from '@ngrx/store';
import * as AvatarStoreSelectors from '../store/avatar.selectors';
import * as AvatarStoreState from '../store/avatar.state';
import { Router } from '@angular/router';
// import { AvatarConnectionSetupResponse, AvatarCity } from '../models/avatar.model';
// import { SnackBarImportComponent } from '../avatar-details/snack-bar-import/snack-bar-import.component';
// import { SocialNetworks } from '../avatar.enums';

@Injectable()
export class ClientAStoreEffects {

  constructor(
    // private dataService: AvatarService,
    private actions$: Actions,
    private router: Router,
    private store$: Store<AvatarStoreState.State>,
  ) {}

  // @Effect()
  // loadAvatarListEffect$: Observable<Action> = this.actions$
  //   .pipe(
  //     ofType(
  //       actions.AvatarListActions.ActionTypes.FETCH_DATA,
  //       actions.AvatarListActions.ActionTypes.CHANGE_PAGINATION,
  //       actions.AvatarListActions.ActionTypes.CHANGE_FILTER,
  //       actions.AvatarListActions.ActionTypes.CHANGE_SORTING
  //     ),
  //     /* Get LAST values of ListQuery */
  //     withLatestFrom(this.store$.select(AvatarStoreSelectors.getListQuery)),

  //     /* Use LAST values of ListQuery */
  //     switchMap(([action, listQuery]) => {
  //       this.store$.dispatch(new actions.AvatarListActions.LoadRequest());
  //       return this.dataService
  //         .updateAvatarList(listQuery)
  //         .pipe(
  //           map((data) =>
  //             new actions.AvatarListActions.LoadSuccess({
  //               avatars: data.avatars.map(avatar => ({
  //                 ...avatar,
  //                 connections: avatar.connections.reduce((res, item) => {
  //                   res[item.type] = item.enabled;
  //                   return res;
  //                 }, {})
  //               })),
  //               totalItemsCount: data.totalItemsCount
  //             })
  //           ),
  //           catchError(error =>
  //             observableOf(new actions.AvatarListActions.LoadFailure({ error }))
  //           )
  //         );
  //     })
  //   );

  // @Effect()
  // createAvatarEffect$: Observable<Action> = this.actions$
  //   .pipe(
  //     ofType(
  //       actions.AvatarCrudActions.ActionTypes.CREATE_NEW_REQUEST
  //     ),
  //     /* Save avatar data on server */
  //     switchMap((action: any) => {
  //       return this.dataService
  //         .createAvatar(action.payload)
  //         .pipe(
  //           map(() => new actions.AvatarCrudActions.CreateSuccess()),
  //           catchError(error =>
  //             observableOf(new actions.AvatarCrudActions.CreateFailure({ error }))
  //           )
  //         );
  //     })
  //   );

  // @Effect()
  // updateAvatarEffect$: Observable<Action> = this.actions$
  //   .pipe(
  //     ofType(
  //       actions.AvatarCrudActions.ActionTypes.UPDATE_REQUEST
  //     ),
  //     /* Save avatar data on server */
  //     switchMap((action: any) => {
  //       return this.dataService
  //         .modifyAvatar(action.payload)
  //         .pipe(
  //           map(() => new actions.AvatarCrudActions.UpdateSuccess(action.payload.id)),
  //           catchError(error =>
  //             observableOf(new actions.AvatarCrudActions.UpdateFailure({ error }))
  //           )
  //         );
  //     })
  //   );

  // @Effect()
  // getAvatarDetailsEffect$: Observable<Action> = this.actions$
  //   .pipe(
  //     ofType(
  //       actions.AvatarCrudActions.ActionTypes.LOAD_DETAILS_REQUEST
  //     ),
  //     /* Get avatar data from server */
  //     switchMap((action: any) => {
  //       return this.dataService
  //         .getAvatarDetails(action.payload.id)
  //         .pipe(
  //           map((res) => {
  //             const data = {
  //               ...res
  //             };
  //             return new actions.AvatarCrudActions.LoadDetailsSuccess(data);
  //           }),
  //           catchError(error =>
  //             observableOf(new actions.AvatarCrudActions.LoadDetailsFailure({ error }))
  //           )
  //         );
  //     })
  //   );

  // @Effect()
  // getAvatarActivityLog$: Observable<Action> = this.actions$
  //   .pipe(
  //     ofType(
  //       actions.AvatarImportActions.ActionTypes.LOAD_ACTIVITY_LOG_REQUEST
  //     ),
  //     /* Get avatar data from server */
  //     switchMap((action: any) => {
  //       return this.dataService
  //         .getAvatarActivityLog(action.payload.id)
  //         .pipe(
  //           map((res) => {
  //             return new actions.AvatarImportActions.LoadImportActivityLogSuccess(res);
  //           }),
  //           catchError(error =>
  //             observableOf(new actions.AvatarImportActions.LoadImportActivityLogFailure({ error }))
  //           )
  //         );
  //     })
  //   );

  // @Effect()
  // getAvatarCurrentStateEffect$: Observable<Action> = this.actions$
  //   .pipe(
  //     ofType(
  //       actions.AvatarAdditionalActions.ActionTypes.GET_CURRENT_STATE_REQUEST
  //     ),
  //     /* Get avatar data from server */
  //     switchMap((action: any) => {
  //       return this.dataService
  //         .getAvatarCurrentState(action.payload.id)
  //         .pipe(
  //           map((res) => {
  //             return new actions.AvatarAdditionalActions.GetCurrentStateSuccess(res);
  //           }),
  //           catchError(error =>
  //             observableOf(new actions.AvatarAdditionalActions.GetCurrentStateFailure({ error }))
  //           )
  //         );
  //     })
  //   );

  // @Effect()
  // getAvatarConnectionsEffect$: Observable<Action> = this.actions$
  //   .pipe(
  //     ofType(
  //       actions.AvatarConnectionsActions.ActionTypes.LOAD_CONNECTIONS_REQUEST
  //     ),
  //     /* Get avatar data from server */
  //     switchMap((action: any) => {
  //       return this.dataService
  //         .getAvatarConnections(action.payload.id)
  //         .pipe(
  //           map((data: any) => new actions.AvatarConnectionsActions.LoadConnectionsSuccess({
  //             connections: data.getAvatarConnections.connections,
  //             proxies: data.getProxies.regions
  //           })),
  //           catchError(error =>
  //             observableOf(new actions.AvatarConnectionsActions.LoadConnectionsFailure({ error }))
  //           )
  //         );
  //     })
  //   );

  // @Effect()
  // searchCities$: Observable<Action> = this.actions$
  //   .pipe(
  //     ofType(
  //       actions.AvatarAdditionalActions.ActionTypes.SEARCH_CITIES_REQUEST
  //     ),
  //     /* Get avatar data from server */
  //     switchMap((action: any) => {
  //       return this.dataService
  //         .searchCities(action.payload)
  //         .pipe(
  //           map((data: AvatarCity[]) => new actions.AvatarAdditionalActions.SearchCitiesSuccess(data)),
  //           catchError(error =>
  //             observableOf(new actions.AvatarAdditionalActions.SearchCitiesFailure({ error }))
  //           )
  //         );
  //     })
  //   );

  // @Effect()
  // updateAvatarConnectionEffect$: Observable<Action> = this.actions$
  //   .pipe(
  //     ofType(
  //       actions.AvatarConnectionsActions.ActionTypes.UPDATE_CONNECTIONS_REQUEST
  //     ),
  //     /* Update avatar Social Network connection data */
  //     map((action: any) => {
  //       switch (action.payload.connectionId) {
  //         case SocialNetworks.FACEBOOK:
  //           return new actions.AvatarConnectionsActions.UpdateConnectionFacebookRequest(action.payload);
  //         case SocialNetworks.ODNOKLASSNIKI:
  //           return new actions.AvatarConnectionsActions.UpdateConnectionOdnoklassnikiRequest(action.payload);
  //         default:
  //           return new actions.AvatarConnectionsActions.UpdateConnectionWrongTypeRequest();
  //       }
  //     })
  //   );

  // @Effect()
  // updateAvatarConnectionFacebookEffect$: Observable<Action> = this.actions$
  //   .pipe(
  //     ofType(
  //       actions.AvatarConnectionsActions.ActionTypes.UPDATE_FACEBOOK_CONNECTION_REQUEST,
  //     ),
  //     /* Update Facebook connection data */
  //     switchMap((action) => this.updateConnectionHandler(action))
  //   );

  // @Effect()
  // updateAvatarConnectionOdnoklassnikiEffect$: Observable<Action> = this.actions$
  //   .pipe(
  //     ofType(
  //       actions.AvatarConnectionsActions.ActionTypes.UPDATE_ODNOKLASSNIKI_CONNECTION_REQUEST
  //     ),
  //     /* Update Odnoklassniki connection data */
  //     switchMap((action) => this.updateConnectionHandler(action))
  //   );

  // @Effect({ dispatch: false })
  // createAvatarSuccessEffect$ = this.actions$
  //   .pipe(
  //     ofType(
  //       actions.AvatarCrudActions.ActionTypes.CREATE_NEW_SUCCESS
  //     ),
  //     /* Redirect on success avatar save */
  //     map(() => {
  //       this.router.navigate(['/app/avatar/list']);
  //       this.dataService.openSnackBar({
  //         message: 'avatar.validation.create.success',
  //         type: 'success'
  //       },
  //       null,
  //       {
  //         duration: 4000
  //       });
  //     })
  //   );

  // @Effect({ dispatch: false })
  // updateAvatarSuccessEffect$ = this.actions$
  //   .pipe(
  //     ofType(
  //       actions.AvatarCrudActions.ActionTypes.UPDATE_SUCCESS
  //     ),
  //     /* Redirect on success avatar save */
  //     map((action: any) => {
  //       this.router.navigate(['/app/avatar/details', action.payload, 'general']);
  //       this.dataService.openSnackBar({
  //         message: 'avatar.validation.update.success',
  //         type: 'success'
  //       },
  //       null,
  //       {
  //         duration: 4000
  //       });
  //     })
  //   );

  // @Effect({ dispatch: false })
  // handleAvatarSuccessUpdateConnectionEffect$ = this.actions$
  //   .pipe(
  //     ofType(
  //       actions.AvatarConnectionsActions.ActionTypes.UPDATE_CONNECTIONS_SUCCESS
  //     ),
  //     /* Redirect on success avatar save */
  //     map((action: any) => {
  //       const connectionId = action.payload.connectionId.toLowerCase();
  //       const enabled = action.payload.connection.enabled;
  //       this.dataService.openSnackBar({
  //         message: `avatar.validation.links.${connectionId}.${enabled ? 'successfulLink' : 'unlink'}`,
  //         type: 'success'
  //       },
  //       null,
  //       {
  //         duration: 4000
  //       });
  //     })
  //   );

  // @Effect({ dispatch: false })
  // handleAvatarFailureUpdateConnectionEffect$ = this.actions$
  //   .pipe(
  //     ofType(
  //       actions.AvatarConnectionsActions.ActionTypes.UPDATE_CONNECTIONS_FAILURE,
  //       actions.AvatarConnectionsActions.ActionTypes.UPDATE_CONNECTIONS_WRONG_CREDENTIALS
  //     ),
  //     /* Redirect on success avatar save */
  //     map((action: any) => {
  //       const connectionId = action.payload.connectionId.toLowerCase();
  //       const messageType = action.payload.error ? action.payload.error.type : null;
  //       this.dataService.openSnackBar({
  //         message: `avatar.validation.links.${connectionId}.failLink`,
  //         type: 'failed',
  //         messageOptions: action.payload.error ? {
  //           ...action.payload.error,
  //           type: messageType || 'UNKNOWN',
  //           message: messageType
  //             ? `avatar.validation.links.messageType.${messageType}`
  //             : 'avatar.validation.links.messageType.UNKNOWN',
  //         } : null
  //       },
  //       null,
  //       {
  //         duration: 4000
  //       });
  //     })
  //   );

  // @Effect()
  // importStartAvatarEffect$: Observable<Action> = this.actions$
  //   .pipe(
  //     ofType(
  //       actions.AvatarImportActions.ActionTypes.IMPORT_START_REQUEST
  //     ),
  //     /* Get avatar data from server */
  //     switchMap((action: any) => {
  //       return this.dataService
  //         .importAvatarProfile(action.payload)
  //         .pipe(
  //           map((data: any) => new actions.AvatarImportActions.ImportStartSuccess(data)),
  //           catchError(error =>
  //             observableOf(new actions.AvatarImportActions.ImportStartFailure({ error }))
  //           )
  //         );
  //     })
  //   );

  // @Effect()
  // getAvatarImportDiffEffect$: Observable<Action> = this.actions$
  //   .pipe(
  //     ofType(
  //       actions.AvatarImportActions.ActionTypes.LOAD_IMPORT_DIFF_REQUEST
  //     ),
  //     /* Get avatar import diff data from server */
  //     switchMap((action: any) => {
  //       return this.dataService
  //         .getAvatarImportDiff(action.payload.id)
  //         .pipe(
  //           map((diff: any) => new actions.AvatarImportActions.LoadImportDiffSuccess({
  //             id: action.payload.id,
  //             diff,
  //           })),
  //           catchError(() =>
  //             observableOf(new actions.AvatarImportActions.LoadImportDiffFailure())
  //           )
  //         );
  //     })
  //   );

  // @Effect()
  // confirmAvatarImportDiffEffect$: Observable<Action> = this.actions$
  //   .pipe(
  //     ofType(
  //       actions.AvatarImportActions.ActionTypes.CONFIRM_IMPORT_DIFF_REQUEST
  //     ),
  //     /* Confirm avatar import diff */
  //     switchMap((action: any) => {
  //       return this.dataService
  //         .confirmAvatarImport(action.payload.id, action.payload.fields)
  //         .pipe(
  //           map(() => new actions.AvatarImportActions.ConfirmImportDiffSuccess({ id: action.payload.id })),
  //           catchError(() =>
  //             observableOf(new actions.AvatarImportActions.ConfirmImportDiffFailure({ id: action.payload.id }))
  //           )
  //         );
  //     })
  //   );

  // @Effect()
  // cancelAvatarImportDiffEffect$: Observable<Action> = this.actions$
  //   .pipe(
  //     ofType(
  //       actions.AvatarImportActions.ActionTypes.CANCEL_IMPORT_DIFF_REQUEST
  //     ),
  //     /* Cancel avatar import diff */
  //     switchMap((action: any) => {
  //       return this.dataService
  //         .declineAvatarImport(action.payload.id)
  //         .pipe(
  //           map(() => new actions.AvatarImportActions.CancelImportDiffSuccess()),
  //           catchError(() =>
  //             observableOf(new actions.AvatarImportActions.CancelImportDiffFailure())
  //           )
  //         );
  //     })
  //   );

  // @Effect({ dispatch: false })
  // importCompleteAvatarSuccessEffect$ = this.actions$
  //   .pipe(
  //     ofType(
  //       actions.AvatarImportActions.ActionTypes.IMPORT_COMPLETE_SUCCESS
  //     ),
  //     /* Show snack-bar if avatar export success */
  //     map((action: any) => {
  //       this.dataService.openSnackBar({
  //         message: 'avatar.validation.links.successfulImport',
  //         type: 'success',
  //         avatar: action.payload
  //       }, SnackBarImportComponent);
  //     })
  //   );

  // @Effect({ dispatch: false })
  // importCompleteAvatarFailureEffect$ = this.actions$
  //   .pipe(
  //     ofType(
  //       actions.AvatarImportActions.ActionTypes.IMPORT_COMPLETE_FAILURE,
  //       actions.AvatarImportActions.ActionTypes.IMPORT_START_FAILURE
  //     ),
  //     /* Show snack-bar if avatar import failed */
  //     map((action: any) => {
  //       this.dataService.openSnackBar({
  //         message: 'avatar.validation.links.failedImport',
  //         type: 'failed',
  //         avatar: action.payload
  //       }, SnackBarImportComponent);
  //     })
  //   );

  // @Effect({ dispatch: false })
  // importConfirmDiffSuccessEffect$ = this.actions$
  //   .pipe(
  //     ofType(
  //       actions.AvatarImportActions.ActionTypes.CONFIRM_IMPORT_DIFF_SUCCESS
  //     ),
  //     /* Load data on success avatar import confirmation and redirect on details */
  //     map((action: any) => {
  //       this.store$.dispatch(
  //         new actions.AvatarCrudActions.LoadDetailsRequest(action.payload)
  //       );
  //       this.router.navigate(['/app/avatar/details', action.payload.id, 'general']);
  //     })
  //   );

  // @Effect()
  // exportStartAvatarEffect$: Observable<Action> = this.actions$
  //   .pipe(
  //     ofType(
  //       actions.AvatarExportActions.ActionTypes.EXPORT_START_REQUEST
  //     ),
  //     /* Start avatar export process */
  //     switchMap((action: any) => {
  //       return this.dataService
  //         .exportAvatarProfile(action.payload)
  //         .pipe(
  //           map((data: any) => new actions.AvatarExportActions.ExportStartSuccess(data)),
  //           catchError(error =>
  //             observableOf(new actions.AvatarExportActions.ExportStartFailure({ error }))
  //           )
  //         );
  //     })
  //   );

  // @Effect({ dispatch: false })
  // exportCompleteAvatarSuccessEffect$ = this.actions$
  //   .pipe(
  //     ofType(
  //       actions.AvatarExportActions.ActionTypes.EXPORT_COMPLETE_SUCCESS
  //     ),
  //     /* Show snack-bar if avatar export success */
  //     map((action: any) => {
  //       this.dataService.openSnackBar({
  //         message: 'avatar.validation.links.successfulExport',
  //         type: 'success',
  //         avatar: action.payload
  //       }, SnackBarImportComponent);
  //     })
  //   );

  // @Effect({ dispatch: false })
  // exportCompleteAvatarFailureEffect$ = this.actions$
  //   .pipe(
  //     ofType(
  //       actions.AvatarExportActions.ActionTypes.EXPORT_COMPLETE_FAILURE,
  //       actions.AvatarExportActions.ActionTypes.EXPORT_START_FAILURE
  //     ),
  //     /* Show snack-bar if avatar export failed */
  //     map((action: any) => {
  //       this.dataService.openSnackBar({
  //         message: 'avatar.validation.links.failedExport',
  //         type: 'failed',
  //         avatar: action.payload
  //       }, SnackBarImportComponent);
  //     })
  //   );

  // updateConnectionHandler (action: any) {
  //   return this.dataService
  //     .setupAvatarConnection(action.payload.id, action.payload.connection)
  //     .pipe(
  //       map((data: AvatarConnectionSetupResponse) => {
  //         return data.userProfile
  //           ? new actions.AvatarConnectionsActions.UpdateConnectionSuccess({
  //               connection: {
  //                 ...action.payload.connection,
  //                 ...data.userProfile
  //               },
  //               connectionId: action.payload.connection.type,
  //               enabled: action.payload.connection.enabled
  //             })
  //           : new actions.AvatarConnectionsActions.UpdateConnectionWrongCredentials({
  //               error: {
  //                 message: data.errorMessage,
  //                 type: data.errorType
  //               },
  //               connection: action.payload.connection,
  //               connectionId: action.payload.connection.type
  //             });
  //           }),
  //       catchError(error =>
  //         observableOf(new actions.AvatarConnectionsActions.UpdateConnectionFailure({
  //           error,
  //           connectionId: action.payload.connection.type,
  //         }))
  //       )
  //     );
  // }
}
