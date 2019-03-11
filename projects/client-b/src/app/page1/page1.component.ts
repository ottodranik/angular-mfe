import { Component, OnInit } from '@angular/core';
import { AvatarListActions } from '../store/actions';
import { AvatarStoreState } from '../store';
import { Store } from '@ngrx/store';

@Component({
  template: `
  <div class="card">

  <div class="header">
      <h2 class="title">Passenger Search</h2>
  </div>
  <div class="content">


      <div class="form-group">
         <label>Title:</label>
         <input name="to" value="Mag." class="form-control">
      </div>

      <div class="form-group">
          <label>First Name:</label>
          <input name="from" value="Manu" class="form-control">
      </div>
      <div class="form-group">
          <label>Last Name:</label>
          <input name="to" value="" class="form-control">
      </div>

      <div class="form-group">
          <button
              class="btn btn-default" (click)="onDisaptch()">Search</button>
              {{i}}
          </div>

  </div>
  </div>
  `
})
export class Page1Component  {

  i = 0;

  constructor(
    private store$: Store<AvatarStoreState.State>
  ) {}

  onDisaptch() {
    this.store$.dispatch(
      new AvatarListActions.ChangePagination({ pageNumber: ++this.i })
    );
  }
}
