import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MesasService {

  private apiURL = 'http://localhost:3000/api/mesas/';
  private mesaNumber: number | null = null;

  constructor(private http: HttpClient) { }

  getMesas() {
    return this.http.get<any>(this.apiURL);
  }

  createMesa(mesa: any) {
    return this.http.post<any>(this.apiURL, mesa);
  }

  updateMesa(mesaId: string, mesa: any) {
    return this.http.put(`${this.apiURL}${mesaId}`, mesa);
  }
  
  deleteMesa(mesaId: string) {
    return this.http.delete(`${this.apiURL}${mesaId}`);
  }

  setMesaNumber(number: number): void {
    this.mesaNumber = number;
  }

  getMesaNumber(): number | null {
    return this.mesaNumber;
  }
}
