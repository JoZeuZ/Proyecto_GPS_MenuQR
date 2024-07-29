import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CallWaiterService } from '../websocket.service';

@Component({
  standalone: true,
  selector: 'app-call-waiter',
  templateUrl: './waiter-call-button.component.html',
  styleUrls: ['./waiter-call-button.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class CallWaiterComponent {
  tableNumber: number | null = null;
  isInputVisible = false;
  constructor(private waiterService: CallWaiterService) {}

  toggleInputVisibility() {
    this.isInputVisible = !this.isInputVisible;
  }

  callWaiter() {
    if (this.tableNumber !== null) {
      const data = { tableNumber: this.tableNumber };
      this.waiterService.callWaiter(data).subscribe(response => {
        console.log('Waiter called:', response);
      }, error => {
        console.error('Error calling waiter:', error);
      });
    }
  }
}




