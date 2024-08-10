import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PagoApiService } from '../../Pago/services/pago-api.service';
import { environment } from '../../../../environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart = new BehaviorSubject<any[]>([]);
  private mesa = new BehaviorSubject<number | null>(null);
  private metodoPago = new BehaviorSubject<string | null>(null);
  private propina = new BehaviorSubject<number>(0);
  private nombreCliente = new BehaviorSubject<string>('');

  cart$ = this.cart.asObservable();
  mesa$ = this.mesa.asObservable();
  metodoPago$ = this.metodoPago.asObservable();
  propina$ = this.propina.asObservable();
  nombreCliente$ = this.nombreCliente.asObservable();

  pedidoURL = `${environment.apiUrl}/pedidos`;
  mesaURL = `${environment.apiUrl}/mesas/number`;	

  constructor(private http: HttpClient, private pagoApiService: PagoApiService) { }

  getCart() {
    return this.cart.value;
  }

 addToCart(product: any) {
 const currentCart = this.cart.value;
 const index = currentCart.findIndex(item => item.productoId === product.productoId);
 if (index !== -1) {
 currentCart[index].cantidad += product.cantidad;
 } else {
 product.precio = product.precio || 0;
 currentCart.push(product);
 }
 this.cart.next(currentCart);
 }

 removeFromCart(index: number) {
 const currentCart = this.cart.value;
 currentCart.splice(index, 1);
 this.cart.next(currentCart);
 }

 updateQuantity(productoId: string, cantidad: number) {
 const currentCart = this.cart.value;
 const index = currentCart.findIndex(item => item.productoId === productoId);
 if (index !== -1) {
 currentCart[index].cantidad = cantidad;
 if (currentCart[index].cantidad <= 0) {
 currentCart.splice(index, 1);
 }
 this.cart.next(currentCart);
 }
 }

 setMesa(nMesa: number) {
  this.mesa.next(nMesa);
}

getMesa(): Observable<number | null> {
  return this.mesa.asObservable();
}

getMesaValue(): number | null {
  return this.mesa.getValue();
}

 setMetodoPago(metodo: string) {
 this.metodoPago.next(metodo);
 }

 getMetodoPago() {
 return this.metodoPago.value;
 }

 setPropina(amount: number) {
 this.propina.next(amount);
 }

 getPropina() {
 return this.propina.value;
 }

 setNombreCliente(nombre: string) {
 this.nombreCliente.next(nombre);
 }

 getNombreCliente() {
 return this.nombreCliente.value;
 }

 clearCart() {
 this.cart.next([]);
 this.mesa.next(null);
 this.metodoPago.next(null);
 this.propina.next(0);
 this.nombreCliente.next('');
 }

 confirmOrder() {
 const pedido = {
 cliente: this.getNombreCliente(),
 mesa: this.getMesa(),
 productos: this.getCart().map(({ productoId, cantidad }) => ({
 productoId,
 cantidad
 })), // Filtro de datos
 metodoPago: this.getMetodoPago(),
 propina: this.getPropina(),
 };

 console.log('Pedido a enviar:', pedido);

 return this.http.get(`${this.mesaURL}/${pedido.mesa}`).pipe(
 switchMap((mesaResponse: any) => {
 const mesaId = mesaResponse.data._id;
 return this.http.post(`${this.pedidoURL}/${mesaId}`, pedido);
 }),
 map((pedidoResponse: any) => {
 const pagoData = {
 pedidoId: pedidoResponse.data._id,
 metodoPago: this.getMetodoPago(),
 total: pedidoResponse.data.total
 };
 return this.pagoApiService.createPago(pagoData).subscribe();
 })
 );
 }
}