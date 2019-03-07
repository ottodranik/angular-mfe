import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StateService {

    constructor() { }

    private state$ = new Subject();
    private clients: any = {};

    public registerClient(client: HTMLElement) {
        this.clients[client.tagName] = client;
        console.log(333, this.clients);
    }

    public setState(state: string) {
        console.log(444, this.clients);
        for(let client of this.clients) {
            client.setAttribute('state', state);
        }
    }

}
