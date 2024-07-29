// producto-dialog.component.ts
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductosApiService } from '../../service/productos-api.service';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-producto-dialog',
  standalone: true,
  templateUrl: './producto-dialog.component.html',
  styleUrl: './producto-dialog.component.css',
  imports: [CommonModule, MatListModule, MatButtonModule]
})
export class ProductoDialogComponent implements OnInit {
  productos: any[] = [];

  constructor(
    private productoService: ProductosApiService,
    public dialogRef: MatDialogRef<ProductoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.productoService.getProductos().subscribe((response: any) => {
      if (response.state === 'Success' && Array.isArray(response.data)) {
        this.productos = response.data[1];
        if (!Array.isArray(this.productos)) {
          this.productos = [];
        }
      } else {
        console.error('Error en la respuesta del servicio:', response);
        this.productos = [];
      }
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  agregarProducto(producto: any): void {
    this.dialogRef.close(producto);
  }
}
