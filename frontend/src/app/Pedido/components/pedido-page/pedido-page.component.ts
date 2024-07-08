import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PedidoDialogComponent } from '../pedido-dialog/pedido-dialog.component';
import { PedidoApiService } from '../../services/pedido-api.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-pedido-page',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatTableModule,
    PedidoDialogComponent
  ],
  templateUrl: './pedido-page.component.html',
  styleUrls: ['./pedido-page.component.css']
})
export class PedidoPageComponent implements OnInit {
  pedidos: any[] = [];

  constructor(private pedidoService: PedidoApiService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadPedidos();
  }

  loadPedidos(): void {
    this.pedidoService.getPedidos().subscribe((data: any) => {
      this.pedidos = data;
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

  openPedidoDialog(pedido?: any): void {
    const dialogRef = this.dialog.open(PedidoDialogComponent, {
      width: '400px',
      data: { pedido }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (pedido) {
          this.updatePedido(pedido._id, result);
        } else {
          this.createPedido(result);
        }
      }
    });
  }
}
