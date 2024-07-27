import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})

export class CartService {
  private cart = new BehaviorSubject<any[]>([]);
  private mesa = new BehaviorSubject<number | null>(null);
  cart$ = this.cart.asObservable();
  mesa$ = this.mesa.asObservable();

  constructor(private http: HttpClient) {}

  getCart() {
    return this.cart.value;
  }

  addToCart(product: any) {
    const currentCart = this.cart.value;
    currentCart.push(product);
    this.cart.next(currentCart);
  }

  removeFromCart(index: number) {
    const currentCart = this.cart.value;
    currentCart.splice(index, 1);
    this.cart.next(currentCart);
  }

  setMesa(nMesa: number) {
    this.mesa.next(nMesa);
  }

  getMesa() {
    return this.mesa.value;
  }

  clearCart() {
    this.cart.next([]);
    this.mesa.next(null);
  }

  confirmOrder(orderDetails: any) {
    const pedido = {
      cliente: orderDetails.cliente,
      mesa: this.getMesa(),
      productos: this.getCart(),
      metodoPago: orderDetails.metodoPago,
      propina: orderDetails.propina,
      total: this.calculateTotal()
    };
    return this.http.post('/api/pedidos', pedido);
  }

  private calculateTotal() {
    return this.getCart().reduce((total, product) => total + product.price * product.quantity, 0);
  }
}
