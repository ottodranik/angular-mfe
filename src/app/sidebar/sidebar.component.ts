import { StateService } from './../state.service';
import { Component, OnInit } from '@angular/core';


@Component({
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent {
    constructor(private stateService: StateService) {
    }

    sendState() {
        console.log('set state');
        this.stateService.setState('Info from Shell');
    }
}
