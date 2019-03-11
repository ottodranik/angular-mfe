import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import * as AppStoreReducers from './app.reducer';
import { EffectsModule } from '@ngrx/effects';
// import { RootStoreEffects } from './app.effects';
// import {RouterStateSerializer, StoreRouterConnectingModule} from '@ngrx/router-store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../../environments/environment';
import { ClientBStoreModule } from 'projects/client-b/src/app/store';
import { ClientAStoreModule } from 'projects/client-a/src/app/store';
// import {CustomSerializer} from '@app/shared/utils';

@NgModule({
  imports: [
    CommonModule,
    ClientBStoreModule,
    ClientAStoreModule,
    StoreModule.forRoot(
      AppStoreReducers.reducersToken,
      { metaReducers: AppStoreReducers.metaReducers }
    ),
    // EffectsModule.forRoot([RootStoreEffects]),
    // StoreRouterConnectingModule.forRoot({
    //   serializer: CustomSerializer
    // }),
    StoreDevtoolsModule.instrument({
      logOnly: environment.production,
      maxAge: 50
    }),
  ],
  providers: [AppStoreReducers.reducersProvider],
  declarations: []
})
export class AppStoreModule {}
