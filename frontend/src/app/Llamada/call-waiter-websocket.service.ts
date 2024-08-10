import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CallWaiterWebSocketService {
  private ws: WebSocket | null = null;
  private messageSubject: Subject<any> = new Subject<any>();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeWebSocket();
    }
  }

  private initializeWebSocket(): void {
    if (typeof window !== 'undefined' && 'WebSocket' in window) {
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

  public getCallWaiterObservable(): Observable<any> {
    return this.messageSubject.asObservable();
  }
}