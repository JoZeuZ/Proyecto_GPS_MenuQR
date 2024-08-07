import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CallWaiterWebSocketService {
  private ws!: WebSocket;
  private messageSubject: Subject<any> = new Subject<any>();

  public messages$ = this.messageSubject.asObservable();

  constructor() {
    this.initializeWebSocket();
  }

  private initializeWebSocket(): void {
    if (typeof window !== 'undefined' && window.WebSocket) {
      this.ws = new WebSocket('ws://localhost:3000'); 

      this.ws.onmessage = (event: MessageEvent) => {
        try {
          const data = JSON.parse(event.data);
          this.messageSubject.next(data);
        } catch (e) {
          console.error('Error parsing WebSocket message', e);
        }
      };

      this.ws.onopen = () => {
        console.log('Connected to WebSocket server');
      };

      this.ws.onclose = () => {
        console.log('Disconnected from WebSocket server');
      };

      this.ws.onerror = (error: Event) => {
        console.error('WebSocket error:', error);
      };
    } else {
      console.error('WebSocket is not supported in this environment');
    }
  }

  public getCallWaiterObservable() {
    if (typeof window !== 'undefined' && window.WebSocket) {
      return this.messages$;
    } else {
      console.error('WebSocket is not supported in this environment');
      return new Subject<any>().asObservable(); 
    }
  }
}




