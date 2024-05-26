import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IngredientesApiService {

  baseURL = 'http://localhost:3000/api/ingredientes';

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
}
