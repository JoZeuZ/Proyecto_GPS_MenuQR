import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CallWaiterService {
  private apiUrl = 'http://localhost:3000/api/llamadas'; 

  constructor(private http: HttpClient) { }

  callWaiter(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/call-waiter`, data);
  }

  getWaiterCalls(): Observable<any> {
    return this.http.get(`${this.apiUrl}/get-waiter-calls`);
  }
}




