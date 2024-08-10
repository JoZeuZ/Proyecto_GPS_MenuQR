import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { CallWaiterService } from '../websocket.service';
import { CallWaiterWebSocketService } from '../call-waiter-websocket.service';
import { CartService } from '../../Cart/services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-call-waiter',
  templateUrl: './waiter-call-button.component.html',
  styleUrls: ['./waiter-call-button.component.css'],
  imports: [
    CommonModule,
    MatButtonModule
  ]
})
export class CallWaiterComponent implements OnInit, OnDestroy {
  tableNumber: number | null = null;
  private mesaSubscription: Subscription | null = null;

  constructor(
    private waiterService: CallWaiterService,
    private webSocketService: CallWaiterWebSocketService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.mesaSubscription = this.cartService.getMesa().subscribe(
      mesa => {
        this.tableNumber = mesa;
      }
    );

    this.webSocketService.getCallWaiterObservable().subscribe(
      (message) => {
        console.log('Mensaje del WebSocket:', message);
        // Aquí puedes manejar los mensajes recibidos del WebSocket
      }
    );
  }

  ngOnDestroy() {
    if (this.mesaSubscription) {
      this.mesaSubscription.unsubscribe();
    }
  }

  callWaiter() {
    if (this.tableNumber !== null) {
      const data = { tableNumber: this.tableNumber };
      this.waiterService.callWaiter(data).subscribe(
        response => {
          console.log('Mesero llamado:', response);
          // Aquí puedes agregar una notificación para el usuario
        },
        error => {
          console.error('Error al llamar al mesero:', error);
          // Aquí puedes manejar el error, tal vez mostrando un mensaje al usuario
        }
      );
    } else {
      console.error('Número de mesa no disponible');
      // Aquí puedes manejar el caso en que no haya número de mesa
    }
  }
}