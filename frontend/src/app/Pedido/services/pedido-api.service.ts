import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class PedidoApiService {
  baseURL = 'http://localhost:3000/api/pedidos';

  constructor(private http: HttpClient) {}

  getPedidos(): Observable<any[]> {
    return this.http.get<any>(this.baseURL).pipe(map((data) => data.data));
  }

  createPedido(pedido: any): Observable<any> {
    return this.http.post(this.baseURL, pedido);
  }

  updatePedido(id: string, pedido: any): Observable<any> {
    return this.http.put(`${this.baseURL}/${id}`, pedido);
  }

  updatePedidoStatus(id: string, estado: string): Observable<any> {
    return this.http.put(`${this.baseURL}/${id}`, { estado });
  }

  deletePedido(id: string): Observable<any> {
    return this.http.delete(`${this.baseURL}/${id}`);
  }

  getPedidoById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseURL}/${id}`);
  }

  getPedidosByMesaId(mesaId: string): Observable<any> {
    return this.http.get<any>(`${this.baseURL}/mesa/${mesaId}`);
  }

  getPedidosByMesaNum(Nmesa: string): Observable<any> {
    return this.http.get<any>(`${this.baseURL}/mesan/${Nmesa}`);
  }

  deleteProductosDelPedido(pedidoId: string, productoId: string): Observable<any> {
    return this.http.delete(`${this.baseURL}/producto/${pedidoId}/${productoId}`);
  }
}
