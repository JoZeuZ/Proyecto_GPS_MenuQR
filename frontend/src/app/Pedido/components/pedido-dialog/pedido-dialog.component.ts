import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-pedido-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  templateUrl: './pedido-dialog.component.html',
  styleUrls: ['./pedido-dialog.component.css']
})
export class PedidoDialogComponent implements OnInit {
  pedidoForm: FormGroup;
  productosFormArray: FormArray;

  constructor(
    public dialogRef: MatDialogRef<PedidoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.pedidoForm = this.fb.group({
      cliente: ['', Validators.required],
      mesa: ['', Validators.required],
      productos: this.fb.array([]),
      metodoPago: ['', Validators.required],
      propina: [0, Validators.required]
    });

    this.productosFormArray = this.pedidoForm.get('productos') as FormArray;

    if (data && data.pedido) {
      this.pedidoForm.patchValue(data.pedido);
      if (data.pedido.productos) {
        data.pedido.productos.forEach((producto: any) => this.addProducto(producto));
      }
    }
  }

  ngOnInit(): void {}

  onSave(): void {
    if (this.pedidoForm.valid) {
      this.dialogRef.close(this.pedidoForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  addProducto(producto?: any): void {
    const productoGroup = this.fb.group({
      productoId: [producto ? producto.productoId : '', Validators.required],
      cantidad: [producto ? producto.cantidad : 1, [Validators.required, Validators.min(1)]],
      extras: [producto ? producto.extras : '']
    });

    this.productosFormArray.push(productoGroup);
  }

  removeProducto(index: number): void {
    this.productosFormArray.removeAt(index);
  }
}
