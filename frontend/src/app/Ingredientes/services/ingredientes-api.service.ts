import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment';

@Injectable({
  providedIn: 'root'
})
export class IngredientesApiService {

  baseURL = `${environment.apiUrl}/ingredientes`;

  constructor(private http: HttpClient) { }

  getIngredientes() {
    return this.http.get(this.baseURL);
  }

  addIngrediente(ingrediente: any) {
    return this.http.post(this.baseURL, ingrediente);
  }

  updateIngrediente(id: string, ingrediente: any) {
    return this.http.put(`${this.baseURL}/${id}`, ingrediente);
  }

  deleteIngrediente(id: string) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }

  uploadImage(image: FormData): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/uploads/ingredientes`, image);
  }

}
