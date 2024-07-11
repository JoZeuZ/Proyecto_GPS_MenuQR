import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:3000/api/auth'; // Cambia esta URL por la de tu backend

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  login(formValue: any) {
    return firstValueFrom(
      this.http.post(`${this.apiUrl}/login`, formValue, { withCredentials: true })
    );
    
  }

  logout() {
    return firstValueFrom(
      this.http.post(`${this.apiUrl}/logout`, {}, { withCredentials: true })
    );
  }

  cookieExists(cookieName: string): boolean {
    console.log('Revisando cookie:', cookieName);
    return this.cookieService.check(cookieName);
  }

  getAuthStatus(): boolean {
    const exists = this.cookieExists('jwt');
    console.log('Existe?:', exists);
    return exists;
  }
}
