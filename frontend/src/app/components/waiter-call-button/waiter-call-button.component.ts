import { Component } from '@angular/core';
import { CallWaiterService } from '../websocket.service';

@Component({
  standalone: true,
  selector: 'app-call-waiter',
  template: `
    <button (click)="callWaiter()">Call Waiter</button>
  `
})
export class CallWaiterComponent {
  constructor(private waiterService: CallWaiterService) {}

  callWaiter() {
    const data = { tableNumber: 1, customerName: 'Estebaby' }; // Esto puede ser dinámico
    this.waiterService.callWaiter(data).subscribe(response => {
      console.log('Waiter called:', response);
    }, error => {
      console.error('Error calling waiter:', error);
    });
  }
}


