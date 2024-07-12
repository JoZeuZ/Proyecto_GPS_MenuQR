import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  baseURL = 'http://localhost:3000/api/resenas';

  constructor(private http:HttpClient) { }

  getReviews() {
    return this.http.get(this.baseURL);
  }

  addReview(resena: any) {
    return this.http.post(this.baseURL, resena);
  }

  updateReview(id: string, resena: any) {
    return this.http.put(`${this.baseURL}/${id}`, resena);
  }

  deleteReview(id: string) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }

}
