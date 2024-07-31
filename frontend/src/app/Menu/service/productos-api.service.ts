import { Injectable } from '@angular/core';
import { environment } from '../../../../environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosApiService {

  private url = `${environment.apiUrl}/productos`;

  constructor(private http: HttpClient) { }

  getProductos(): Observable<any> {
    return this.http.get(this.url);
  }

  getProducto(id: string): Observable<any> {
    return this.http.get(`${this.url}/${id}`);
  }

  createProducto(producto: any): Observable<any> {
    return this.http.post(this.url, producto);
  }

  updateProducto(id: string, producto: any): Observable<any> {
    return this.http.put(`${this.url}/${id}`, producto);
  }

  deleteProducto(id: string): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }

  uploadImage(image: FormData): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/uploads/productos`, image);
  }

}
