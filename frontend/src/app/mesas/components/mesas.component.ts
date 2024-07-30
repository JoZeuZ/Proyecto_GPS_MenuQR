import { Component, OnInit } from '@angular/core';
import { MesasService } from '../mesas.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddMesaDialogComponent } from '../components/add-dialog/add-dialog.component';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-mesas',
  templateUrl: './mesas.component.html',
  styleUrls: ['./mesas.component.css'],
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatIconModule, MatDialogModule, AddMesaDialogComponent]
})
export class MesasComponent implements OnInit {
  mesas: any[] = [];
  numMesas: number = 0;
  selectedMesas: Set<number> = new Set<number>();
  isSelecting: boolean = false;
  roles : string[] = [];

  constructor(private mesasService: MesasService, 
    private router: Router, 
    public dialog: MatDialog,
    private cookieService: CookieService) { }

  ngOnInit(): void {
    this.fetchMesas();
    this.roles = this.getUserRole();
  }

  fetchMesas(): void {
    this.mesasService.getMesas().subscribe(
      response => {
        if (Array.isArray(response.data)) {
          this.mesas = response.data;
          this.numMesas = this.mesas.length;
          // console.log('Mesas fetched:', this.mesas);
        } else {
          console.error('La respuesta de la API no es un array', response);
        }
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
  }

  goToPedido(Nmesa: string): void {
    this.mesasService.setMesaNumber(Nmesa);
    this.router.navigate(['/mesas/pedido', Nmesa]);
  }

  openAddMesaDialog(): void {
    const dialogRef = this.dialog.open(AddMesaDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.mesas.push(result);
      }
    });
  }

  toggleSelecting(): void {
    this.isSelecting = !this.isSelecting;
    if (!this.isSelecting) {
      this.selectedMesas.clear();
    }
  }

  toggleSelectMesa(Nmesa: number): void {
    if (this.selectedMesas.has(Nmesa)) {
      this.selectedMesas.delete(Nmesa);
    } else {
      this.selectedMesas.add(Nmesa);
    }
  }

  deleteSelectedMesas(): void {
    console.log('Starting deletion process');
    const mesasToDelete = Array.from(this.selectedMesas);
    mesasToDelete.forEach(mesaId => {
      const mesaIdStr = mesaId.toString(); // Conversión a string
      console.log(`Attempting to delete mesa with ID: ${mesaIdStr}`);
      this.mesasService.deleteMesabyNumber(mesaIdStr).pipe(
        tap(response => console.log(`Response from deleteMesa for ID ${mesaIdStr}:`, response)),
        catchError(error => {
          console.error(`Error deleting mesa ${mesaIdStr}:`, error);
          if (error.error && error.error.message) {
            console.error('Server error message:', error.error.message);
          }
          return of(null);
        })
      ).subscribe(
        result => {
          if (result !== null) {
            this.mesas = this.mesas.filter(mesa => mesa.Nmesa !== mesaId);
            this.selectedMesas.delete(mesaId);
            console.log(`Mesa ${mesaIdStr} deleted successfully`);
          } else {
            console.log(`Failed to delete mesa ${mesaIdStr}`);
          }
        }
      );
    });
    this.isSelecting = false;
  }

  getUserRole(): string[] {
    const token = this.cookieService.get('awa');
    if (!token) {
      return [];
    }
    const decodedToken: any = jwtDecode(token);
    return decodedToken.roles ? decodedToken.roles.map((role: any) => role.name) : [];
  }

  isAdmin(): boolean {
    return this.roles.includes('Administrador');
  }
}