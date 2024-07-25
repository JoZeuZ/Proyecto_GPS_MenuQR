import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:3000/api/auth'; // Cambia esta URL por la de tu backend
  private authState = new BehaviorSubject<boolean>(this.isAuthenticated());

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  login(formValue: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, formValue, { withCredentials: true })
      .pipe(
        tap(response => {
          this.cookieService.set('awa', response.data.accessToken);
          console.log(response.data.accessToken);
          console.log(this.cookieService.get('jwt'));
          this.authState.next(true); // Emitir nuevo estado de autenticación
        })
      );
  }

  logout(): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/logout`, {}, { withCredentials: true })
      .pipe(
        tap(() => {
          this.cookieService.delete('awa');
          this.authState.next(false); // Emitir nuevo estado de autenticación
        })
      );
  }
  isAuthenticated(): boolean {
    // Comprobar si hay una cookie con el token
    const token = this.cookieService.get('awa');
    return !!token;  // Devuelve true si existe el token, false si no
  }

  getAuthState(): Observable<boolean> {
    return this.authState.asObservable();
  }


}
