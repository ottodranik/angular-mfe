import { environment } from './../environments/environment';
import { Observable, Subject, } from 'rxjs';
import { takeUntil, } from 'rxjs/operators';
import { Component, ViewEncapsulation, Input, Output, EventEmitter, OnInit, OnChanges, OnDestroy, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AvatarStoreState, AvatarStoreSelectors } from './store';
import { Store, select } from '@ngrx/store';
import { reducersProvider } from 'src/app/store/app.reducer';


@Component({
  // selector: 'client-b',
  template: `
      <router-outlet></router-outlet>
      <div>{{state}}</div>
  `,
  encapsulation: ViewEncapsulation.Emulated
})
export class AppComponent implements OnInit, OnDestroy {

  private _unsubscribe$: Subject<void> = new Subject();

  @Input('state')
  private _state;
  set state(state: string) {
    this._state = state;
    console.log('client-b received state', this._state);
  }
  get state() {
    return this._state;
  }

  @Output('cool-event') coolEvent = new EventEmitter();

  constructor(
    private store$: Store<AvatarStoreState.State>,
    private router: Router,
    private el: ElementRef
  ) { }

  private emitState(val) {
    console.log('emitState', val)
    this.coolEvent.emit(val);
  }

  ngOnInit() {
    console.log('client b init again')
    this.router.initialNavigation(); // Manually triggering initial navigation for @angular/elements ?
    
    this.router.events.pipe(
      takeUntil(this._unsubscribe$)
    ).subscribe((val) => {
      // see also 
      console.log('client-b', val) 
    });

    // Standalone mode
    if (environment.standalone) {
      this.router.navigate(['/b/page1']);
    }
    
    // just for demonstration!
    // setTimeout(() => { 
    //   this.message.next('client b initialized!');
    // }, 2000);

    this.store$.pipe(
      takeUntil(this._unsubscribe$),
      select(AvatarStoreSelectors.selectAvatarState)
    ).subscribe(data => {
      console.log(data);
      setTimeout(() => { 
        this.emitState({
          name: 'avatar',
          data: reducersProvider
        });
      }, 0);
    });
    
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    console.log('unsubscribe client b');
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}
