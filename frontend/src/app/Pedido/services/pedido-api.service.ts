import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidoApiService {
  baseURL = 'http://localhost:3000/api/pedidos';

  constructor(private http: HttpClient) {}

  getPedidos(): Observable<any[]> {
    return this.http.get<any>(this.baseURL).pipe(map((data) => data.pedidos));
  }

  createPedido(pedido: any): Observable<any> {
    return this.http.post(this.baseURL, pedido);
  }

  updatePedido(id: string, pedido: any): Observable<any> {
    return this.http.put(`${this.baseURL}/${id}`, pedido);
  }

  deletePedido(id: string): Observable<any> {
    return this.http.delete(`${this.baseURL}/${id}`);
  }
}
