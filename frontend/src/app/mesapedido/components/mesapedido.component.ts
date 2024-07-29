import { Component, OnInit, inject } from '@angular/core';
import { PedidoApiService } from '../../Pedido/services/pedido-api.service';
import { CommonModule } from '@angular/common';
import { MesasService } from '../../mesas/mesas.service';
import { Router } from '@angular/router';
import { delay, switchMap} from 'rxjs/operators';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { ProductoDialogComponent } from '../../Menu/components/producto-dialog/producto-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';


@Component({
  selector: 'app-mesapedido',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, MatButtonModule, MatIconModule, MatCardModule, MatListModule],
  templateUrl: './mesapedido.component.html',
  styleUrl: './mesapedido.component.css',
})
export class MesapedidoComponent implements OnInit {
  pedido: any;
  isLoading: boolean = true;
  mesa: any;

  constructor(
    private mesasService: MesasService,
    private pedidoService: PedidoApiService,
    private router: Router,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    const Nmesa = this.mesasService.getMesaNumber();
    console.log(Nmesa);
    if (Nmesa) {
      this.loadMesaAndPedido(Nmesa.toString());
    }
  }

  loadMesaAndPedido(Nmesa: string): void {
    this.mesasService.getMesaByNumber(Nmesa).pipe(
      switchMap(mesaResponse => {
        if (mesaResponse && mesaResponse.data) {
          this.mesa = mesaResponse.data;
          return this.pedidoService.getPedidosByMesaNum(Nmesa).pipe(
            delay(100),
            switchMap(response => {
              if (response && response.data && response.data.length > 0) {
                this.pedido = response.data[0];
              } else {
                this.pedido = null;
              }
              return of(null);
            })
          );
        } else {
          return of(null);
        }
      })
    ).subscribe(
      () => {
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching data:', error);
        this.isLoading = false;
      }
    );
  }

  goBack(): void {
    this.mesasService.clearMesaNumber();
    this.router.navigate(['/mesas']);
  }

  eliminarProducto(productoId: string): void {
    if (this.pedido && this.pedido._id) {
      this.pedidoService.deleteProductosDelPedido(this.pedido._id, productoId).subscribe(
        () => {
          // Actualiza el pedido después de eliminar el producto
          this.loadMesaAndPedido(this.pedido.mesa.Nmesa);
        },
        (error) => {
          console.error('Error deleting product:', error);
        }
      );
    }
  }

  openAgregarProductosDialog(): void {
    const dialogRef = this.dialog.open(ProductoDialogComponent);

    dialogRef.afterClosed().subscribe((producto) => {
      if (producto) {
        this.agregarProductoAlPedido(producto);
      }
    });
  }

  agregarProductoAlPedido(producto: any): void {
    const productoExistente = this.pedido.productos.find((p: any) => p.productoId._id === producto._id);

    if (productoExistente) {
      productoExistente.cantidad += 1;
    } else {
      this.pedido.productos.push({
        productoId: producto,
        cantidad: 1
      });
    }

    // Recalcula el total
    let total = 0;
    for (const item of this.pedido.productos) {
      total += item.productoId.precio * item.cantidad;
    }
    this.pedido.total = total;
    console.log(this.pedido.cliente);

    // Guarda el pedido actualizado
    this.pedidoService.updatePedido(this.pedido._id, this.pedido).subscribe(
      (updatedPedido) => {
        this.pedido = updatedPedido;
        window.location.reload();
        console.log(this.pedido);
      },
      (error) => {
        console.error('Error updating pedido:', error);
      }
    );
  }
}
