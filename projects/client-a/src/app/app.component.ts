import { Observable, Subject } from 'rxjs';
import { Component, ViewEncapsulation, Input, Output, EventEmitter, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';
import { reducersProvider } from './store/avatar.reducers';
import { ClientAStoreState, ClientAStoreSelectors } from './store';
import { Store, select } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';

@Component({
  // selector: 'client-a',
  template: `
      <router-outlet></router-outlet>
  `,
  encapsulation: ViewEncapsulation.Emulated
})
export class AppComponent implements OnInit, OnDestroy {

  private _unsubscribe$: Subject<void> = new Subject();

  @Input('state')
  set state(state: string) {
    console.debug('client-a received state', state);
  }

  @Output('cool-event') coolEvent = new EventEmitter<any>();

  constructor(
    private store$: Store<ClientAStoreState.State>,
    private router: Router) {
  }

  private emitState(val) {
    console.log('emitState', val)
    this.coolEvent.emit(val);
  }

  ngOnInit() {
    console.log('Init client-A fired!');

    this.router.initialNavigation(); // Manually triggering initial navigation for @angular/elements ?

    // Standalone mode
    if (environment.standalone) {
      this.router.navigate(['/a/page1']);
    }

    this.store$.pipe(
      takeUntil(this._unsubscribe$),
      select(ClientAStoreSelectors.selectAvatarState)
    ).subscribe(data => {
      console.log(data);
      setTimeout(() => {
        this.emitState({
          name: 'client',
          data: reducersProvider
        });
      }, 0);
    });

    // just for demonstration!
    // setTimeout(() => {
    //   // this.message.next('client a initialized!');
    // }, 2000);

  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    console.log('unsubscribe client a');
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}
