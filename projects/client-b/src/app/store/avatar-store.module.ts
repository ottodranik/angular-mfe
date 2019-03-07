import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { reducersToken, reducersProvider } from './avatar.reducers';
import { EffectsModule } from '@ngrx/effects';
import { AvatarStoreEffects } from './avatar.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'projects/client-a/src/environments/environment';

@NgModule({
  imports: [
    CommonModule,
    // StoreModule.forRoot({}),
    // EffectsModule.forRoot([]),
    // StoreModule.forFeature('clientB', reducersToken),
    // EffectsModule.forFeature([AvatarStoreEffects]),
    // StoreDevtoolsModule.instrument({
    //   logOnly: environment.production,
    //   maxAge: 50
    // }),
  ],
  // providers: [reducersProvider]
})
export class ClientBStoreModule {}
