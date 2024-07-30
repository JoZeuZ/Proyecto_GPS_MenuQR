import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-productos-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
  ],
  templateUrl: './edit-productos-dialog.component.html',
  styleUrls: ['./edit-productos-dialog.component.css']
})
export class EditProductosDialogComponent implements OnInit {

  public productoForm!: FormGroup;

  constructor(
    private http: HttpClient, 
    public dialogRef: MatDialogRef<EditProductosDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.productoForm = new FormGroup({
      nombre: new FormControl(this.data.producto.nombre, [Validators.required]),
      precio: new FormControl(this.data.producto.precio, [Validators.required]),
      descripcion: new FormControl(this.data.producto.descripcion, [Validators.required]),
      categoria: new FormControl(this.data.producto.categoria, [Validators.required]),
      ingredientes: new FormControl(this.data.producto.ingredientes, [Validators.required]),
      disponible: new FormControl(this.data.producto.disponible)
    });
  }

  updateProducto(): void {
    const productoData = this.productoForm.value;

    this.http.put(`http://localhost:3000/api/productos/${this.data.producto._id}`, productoData)
      .subscribe((response: any) => {
        if (response.state === 'Success') {
          this.dialogRef.close(response.data);
        } else {
          console.error('Error en la respuesta del servicio:', response);
        }
      });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  getErrorMessage(controlName: string): string {
    if (this.productoForm.controls[controlName].hasError('required')) {
      return 'Este campo es requerido';
    }
    return '';
  }
}
