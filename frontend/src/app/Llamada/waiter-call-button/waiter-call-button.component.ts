import { Component } from '@angular/core';
import { CallWaiterService } from '../websocket.service';

@Component({
  standalone: true,
  selector: 'app-call-waiter',
  templateUrl: './waiter-call-button.component.html',
  styleUrls: ['./waiter-call-button.component.css']
})
export class CallWaiterComponent {
  constructor(private waiterService: CallWaiterService) {}

  callWaiter() {
    const data = { tableNumber: 1 };
    this.waiterService.callWaiter(data).subscribe(response => {
      console.log('Waiter called:', response);
    }, error => {
      console.error('Error calling waiter:', error);
    });
  }
}



