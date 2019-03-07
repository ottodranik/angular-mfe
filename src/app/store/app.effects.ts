// import {Injectable} from '@angular/core';
// import {Actions, Effect, ofType} from '@ngrx/effects';
// import {map, tap} from 'rxjs/operators';
// import * as actions from './actions';
// import {Store} from '@ngrx/store';
// import {RootStoreState} from './index';
// import {Router} from '@angular/router';
// import {Location} from '@angular/common';

// @Injectable()
// export class RootStoreEffects {

//   constructor(
//     private actions$: Actions,
//     private store$: Store<RootStoreState.State>,
//     private router: Router,
//     private location: Location
//   ) {}

//   @Effect({ dispatch: false })
//   sseResponse$ = this.actions$
//     .pipe(
//       ofType(
//         actions.SseActions.ActionTypes.SSE_SUCCESS
//       ),
//       /**
//        * Dispatch action according to SSE response type
//        */
//       map((action: any) => {
//         switch (action.payload.type) {
//           case SseConstants.SSE_AVATAR_IMPORT_SUCCESS:
//             this.store$.dispatch(
//               new AvatarStoreActions.AvatarImportActions.ImportCompleteSuccess(action.payload.data)
//             );
//             break;
//           case SseConstants.SSE_AVATAR_IMPORT_FAILED:
//             this.store$.dispatch(
//               new AvatarStoreActions.AvatarImportActions.ImportCompleteFailure(action.payload.data)
//             );
//             break;
//           case SseConstants.SSE_AVATAR_EXPORT_SUCCESS:
//             this.store$.dispatch(
//               new AvatarStoreActions.AvatarExportActions.ExportCompleteSuccess(action.payload.data)
//             );
//             break;
//           case SseConstants.SSE_AVATAR_EXPORT_FAILED:
//             this.store$.dispatch(
//               new AvatarStoreActions.AvatarExportActions.ExportCompleteFailure(action.payload.data)
//             );
//             break;
//           case SseConstants.EXTERNAL_SEARCH_COMPLETED:
//             const {requestId: id, status, countToProcess} = action.payload.data;
//             this.store$.dispatch(
//               new SSEExternalCompleted({id, status, countToProcess})
//             );
//             break;
//           case SseConstants.SSE_DATASOURCE_UPDATED:
//             this.store$.dispatch(
//               new DataSourceStoreActions.DataSourceListActions.DataSourceUpdated(action.payload.data)
//             );
//             break;
//           default:
//             console.log('WRONG SSE TYPE ', action.payload.type);
//         }
//       })
//     );

//   @Effect({ dispatch: false })
//   navigateBack$ = this.actions$.pipe(
//     ofType(ROUTER_BACK_TYPE),
//     tap(() => setTimeout(() => this.location.back())));

//   @Effect({ dispatch: false })
//   navigateForward$ = this.actions$.pipe(
//     ofType(ROUTER_FORWARD_TYPE),
//     tap(() => setTimeout(() => this.location.forward()))
//   );
// }
