import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidoApiService {
  private apiUrl = 'http://localhost:3000/api/pedidos';

  constructor(private http: HttpClient) {}

  getPedidos(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getPedidoById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createPedido(pedido: any): Observable<any> {
    return this.http.post(this.apiUrl, pedido);
  }

  updatePedido(id: string, pedido: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, pedido);
  }

  deletePedido(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
