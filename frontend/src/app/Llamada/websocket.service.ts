import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root'
})
export class CallWaiterService {
  private apiUrl = `${environment.apiUrl}/llamadas`; 

  constructor(private http: HttpClient) { }

  callWaiter(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/call-waiter`, data);
  }

  getWaiterCalls(): Observable<any> {
    return this.http.get(`${this.apiUrl}/get-waiter-calls`);
  }
}




