import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MesasService {

  private apiURL = 'http://localhost:3000/api/mesas/';
  private mesaNumber: number | null = null;

  constructor(private http: HttpClient, ) { }

  getMesas() {
    return this.http.get<any>(this.apiURL);
  }

  createMesa(mesa: any) {
    return this.http.post<any>(this.apiURL, mesa);
  }

  updateMesa(mesaId: string, mesa: any) {
    return this.http.put(`${this.apiURL}${mesaId}`, mesa);
  }
  
  deleteMesa(mesaId: string){
    return this.http.delete(`${this.apiURL}${mesaId}`);
  }

  setMesaNumber(Nmesa: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('Nmesa', Nmesa);
    }
  }

  getMesaNumber(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('Nmesa');
    }
    return null;
  }
  
  clearMesaNumber(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('Nmesa');
    }
  }
  deleteMesabyNumber(Nmesa: string){
    return this.http.delete(`${this.apiURL}delete/${Nmesa}`);
  }

  getMesaByNumber(Nmesa: string): Observable<any> {
    return this.http.get(`${this.apiURL}number/${Nmesa}`);
  }

}
