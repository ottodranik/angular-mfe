import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ClientAStoreState } from '../store';
import { ClientAListActions } from '../store/actions';

@Component({
  template: `
  <div class="card">

  <div class="header">
      <h2 class="title">Flight Search</h2>
  </div>
  <div class="content">


      <div class="form-group">
          <label>From:</label>
          <input name="from" class="form-control">
      </div>
      <div class="form-group">
          <label>To:</label>
          <input name="to" class="form-control">
      </div>

      <div class="form-group">
          <button
              class="btn btn-default" (click)="onClick()">Search</button>
            {{i}}
          </div>

  </div>
  </div>
  `
})
export class Page1Component  {

  i = 0;

  constructor(
    private store$: Store<ClientAStoreState.State>,
  ) {}

  control = new FormControl();

  onClick() {
    this.store$.dispatch(
      new ClientAListActions.ChangePagination({ page: ++this.i })
    );
  }

}
