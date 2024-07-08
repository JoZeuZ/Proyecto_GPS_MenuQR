import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { PedidoApiService } from '../../services/pedido-api.service';
import { PedidoDialogComponent } from '../pedido-dialog/pedido-dialog.component';
import { PaginatorComponent } from '../../../public/components/paginator/paginator.component';

@Component({
  selector: 'app-pedido-page',
  templateUrl: './pedido-page.component.html',
  styleUrls: ['./pedido-page.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    PaginatorComponent
  ]
})
export class PedidoPageComponent implements OnInit {
  pedidos: any[] = [];
  filteredPedidos: any[] = [];
  public searchTerm: string = '';
  public totalFilteredItems: number = 0;
  public itemsPerPage: number = 10;
  public currentPage: number = 1;

  constructor(private pedidoService: PedidoApiService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadPedidos();
  }

  loadPedidos(): void {
    this.pedidoService.getPedidos().subscribe((data: any) => {
      this.pedidos = data;
      this.applyFilters();
    });
  }

  createPedido(pedido: any): void {
    this.pedidoService.createPedido(pedido).subscribe(() => {
      this.loadPedidos();
    });
  }

  updatePedido(id: string, pedido: any): void {
    this.pedidoService.updatePedido(id, pedido).subscribe(() => {
      this.loadPedidos();
    });
  }

  deletePedido(id: string): void {
    this.pedidoService.deletePedido(id).subscribe(() => {
      this.loadPedidos();
    });
  }

  openAddPedidoDialog(): void {
    const dialogRef = this.dialog.open(PedidoDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.createPedido(result);
      }
    });
  }

  openEditPedidoDialog(pedido: any): void {
    const dialogRef = this.dialog.open(PedidoDialogComponent, { data: pedido });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updatePedido(pedido._id, result);
      }
    });
  }

  onSearch(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.currentPage = 1;
    this.applyFilters();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.applyFilters();
  }

  onPedidoDeleted(id: string): void {
    this.deletePedido(id);
  }

  applyFilters(): void {
    this.filteredPedidos = this.pedidos.filter(pedido => 
      pedido.cliente && pedido.cliente.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.totalFilteredItems = this.filteredPedidos.length;
  }
}
