import { Component, OnInit } from '@angular/core';
import { MesasService } from '../mesas.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-mesas',
  templateUrl: './mesas.component.html',
  styleUrls: ['./mesas.component.css'],
  standalone: true,
  imports: [CommonModule, MatButtonModule]
})
export class MesasComponent implements OnInit {
  mesas: any[] = [];
  numMesas: number = 0;

  constructor(private mesasService: MesasService, private router: Router) {}

  ngOnInit(): void {
    this.fetchMesas();
  }

  fetchMesas(): void {
    this.mesasService.getMesas().subscribe(
      response => {
        if (Array.isArray(response.data)) {
          this.mesas = response.data;
          this.numMesas = this.mesas.length;
        } else {
          console.error('La respuesta de la API no es un array');
        }
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
  }

  goToPedido(Nmesa: number): void {
    this.mesasService.setMesaNumber(Nmesa);
    this.router.navigate(['/mesas/pedido', Nmesa]);
  }
}
