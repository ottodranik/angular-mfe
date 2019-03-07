import { NavbarComponent } from './navbar/navbar.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MainComponent } from './main.component';
import { AppRoutingModule } from './app-routing.module';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
// import { StoreModule } from '@ngrx/store';
// import { reducers, metaReducers } from './reducers';
// import { EffectsModule } from '@ngrx/effects';
// import { AppEffects } from './app.effects';
import { AppStoreModule } from './store';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    MainComponent
  ],
  imports: [
    AppStoreModule,
    BrowserModule,
    AppRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {provide: LocationStrategy, useClass: PathLocationStrategy}
  ],
  bootstrap: [AppComponent],
  exports: [
    SidebarComponent,
    MainComponent
  ]
})
export class AppModule { }
