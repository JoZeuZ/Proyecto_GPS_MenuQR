import { Component, OnInit, OnDestroy } from '@angular/core';
import { PedidoApiService } from '../../Pedido/services/pedido-api.service';
import { CommonModule } from '@angular/common';
import { MesasService } from '../../mesas/mesas.service';

@Component({
  selector: 'app-mesapedido',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mesapedido.component.html',
  styleUrl: './mesapedido.component.css'
})
export class MesapedidoComponent implements OnInit {
  pedido: any;

  constructor(private mesasService: MesasService ,private pedidoService: PedidoApiService) {}

  ngOnInit(): void {
    const Nmesa = this.mesasService.getMesaNumber();
    console.log(Nmesa);
    if (Nmesa) {
      this.loadPedido(Nmesa.toString());
    }
  }
  loadPedido(Nmesa: string): void {
    this.pedidoService.getPedidosByMesaNum(Nmesa)
    .subscribe(
      response => {
        if (response && response.data && response.data.length > 0) {
          this.pedido = response.data[0];
          console.log(this.pedido); 
        } else {
          console.error('No se encontraron pedidos para esta mesa');
        }
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
  }
}