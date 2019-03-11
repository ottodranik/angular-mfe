import { Component, Renderer } from '@angular/core';
import { StateService } from './state.service';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { ReducerManager } from '@ngrx/store';

@Component({
  selector: 'app-main',
  template: `
    <div class="wrapper">
      <div class="sidebar" data-background-color="white" data-active-color="danger">
          <sidebar-cmp></sidebar-cmp>
      </div>
      <div class="main-panel">
          <navbar-cmp></navbar-cmp>
          <div id="content" class="content">
            <!-- Web Components go here -->
          </div>
      </div>
    </div>

  `,
  styleUrls: []
})
export class MainComponent {

  private listenFunc;

  constructor(
    private stateService: StateService,
    private router: Router,
    private reducerManager: ReducerManager,
    private renderer: Renderer
  ) {

  }

  urls = {
    "/a": 'client-a',
    "/b": 'client-b',
    "/test-custom": 'test-custom'
  }

  config = {
    "client-a": {
      loaded: false,
      path: 'client-a/main.js',
      element: 'client-a',
      id: 'client-a'
    },
    "client-b": {
      loaded: false,
      path: 'client-b/main.js',
      element: 'client-b',
      id: 'client-b'
    },
    "test-custom": {
      loaded: false,
      path: 'test-custom/test-custom.js',
      element: 'test-custom',
      id: 'test-custom'
    },

  };

  ngOnInit() {
    // this.load('client-a');
    // this.load('client-b');

    this.router.events.subscribe((value) => {
      // see also
      console.log(111, value);
      if (value instanceof NavigationStart && this.urls[value.url]) {
        console.log(222);
        this.load(this.urls[value.url]);
      }
    });
  }

  load(name: string): void {

    const configItem = this.config[name];
    if (configItem.loaded) return;

    const content = document.getElementById('content');
    const body = document.getElementsByTagName('body')[0];
    content.innerHTML = '';
    const script = document.createElement('script');

    if (!customElements.get(name)) {
      script.src = configItem.path;
      body.appendChild(script);
    }

    const element: HTMLElement = document.createElement(configItem.element);
    content.appendChild(element);

    // this.listenFunc = this.renderer.listen(element, 'cool-event', (event) => {
    //   // Do something with 'event'
    //   console.log('Receive state 1', event);
    //   this.handleMessage(event.detail)
    // });

    // if (!customElements.get(name)) {
    //   element.addEventListener('cool-event', (event: any) => {
    //     console.log('Receive state 2', event);
    //     this.handleMessage(event.detail)
    //   });
    // }
    element.setAttribute('state', 'init');
    element.setAttribute('urlTouch', 'false');
    element.setAttribute('id', configItem.id || name);

    script.onerror = () => console.error(`error loading ${configItem.path}`);

    this.stateService.registerClient(element);
  }

  touch(name: string): void {
    const configItem = this.config[name];
    if (configItem.loaded) return;

    const element: HTMLElement = document.getElementById(name);
    element.setAttribute('urlTouch', '4321');
  }

  handleMessage(msg): void {
    console.log('shell received state: ', msg.name, msg.data);
    this.reducerManager.addReducer(msg.name, msg.data[0].useFactory());
  }

}
