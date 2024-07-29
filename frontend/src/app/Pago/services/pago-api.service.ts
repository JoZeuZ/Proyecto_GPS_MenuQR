import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PagoApiService {
  private apiUrl = 'http://localhost:3000/api/pagos'; // Cambia esta URL por la de tu backend

  constructor(private http: HttpClient) {}

  createPago(pagoData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, pagoData);
  }

  getPagoById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(map(response => response.data));
  }

  updatePago(id: string, pagoData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, pagoData);
  }

  getPagos(): Observable<any[]> {
    return this.http.get<any>(this.apiUrl).pipe(map(response => response.data));
  }

  cancelarPago(id: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}/cancelar`, {});
  }

  reembolsarPago(id: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}/reembolsar`, {});
  }
}
