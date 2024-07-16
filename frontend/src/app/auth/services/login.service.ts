import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:3000/api/auth/login'; // Cambia esta URL por la de tu backend

  constructor(private http: HttpClient) {}

  login(formValue: any){
    return firstValueFrom(
      this.http.post(this.apiUrl, formValue,{ withCredentials: true })
    )
  }
}
