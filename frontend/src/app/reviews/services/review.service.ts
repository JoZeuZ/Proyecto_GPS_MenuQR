import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environment';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  baseURL = `${environment.apiUrl}/resenas`;

  constructor(private http: HttpClient) { }

  getReviews() {
    return this.http.get(this.baseURL).pipe(
      catchError(this.handleError)
    );
  }

  addReview(resena: any) {
    return this.http.post(this.baseURL, resena).pipe(
      catchError(this.handleError)
    );
  }

  updateReview(id: string, resena: any) {
    return this.http.put(`${this.baseURL}/${id}`, resena).pipe(
      catchError(this.handleError)
    );
  }

  deleteReview(id: string) {
    return this.http.delete(`${this.baseURL}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Un error desconocido ha ocurrido';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      if (error.error && error.error.message) {
        errorMessage = error.error.message;
      } else {
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
    }
    return throwError(() => new Error(errorMessage));
  }
  
}