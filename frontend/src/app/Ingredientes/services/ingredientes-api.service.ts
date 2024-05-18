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

}
