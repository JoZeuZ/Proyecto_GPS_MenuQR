import { Component, OnInit } from '@angular/core';
import { PedidoApiService } from '../../services/pedido-api.service';

@Component({
  selector: 'app-pedido-page',
  templateUrl: './pedido-page.component.html',
  styleUrls: ['./pedido-page.component.css']
})
export class PedidoPageComponent implements OnInit {
  pedidos: any[] = [];

  constructor(private pedidoService: PedidoApiService) {}

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
}
