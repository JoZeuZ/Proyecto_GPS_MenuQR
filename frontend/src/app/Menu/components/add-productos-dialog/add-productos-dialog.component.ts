import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { ProductosApiService } from '../../service/productos-api.service';
import { IngredientesApiService } from '../../../Ingredientes/services/ingredientes-api.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { catchError, switchMap } from 'rxjs/operators';
import { of, throwError } from 'rxjs';

interface Ingrediente {
  _id: string;
  nombre: string;
}

@Component({
  selector: 'app-agregar-producto',
  standalone: true,
  templateUrl: './add-productos-dialog.component.html',
  styleUrls: ['./add-productos-dialog.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    MatDialogContent,
    MatDialogActions
  ]
})
export class AgregarProductoComponent implements OnInit {
  productoForm: FormGroup;
  ingredientesList: Ingrediente[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AgregarProductoComponent>,
    private productoService: ProductosApiService,
    private ingredienteService: IngredientesApiService,
    private http: HttpClient
  ) {
    this.productoForm = this.fb.group({
      nombre: ['', Validators.required],
      precio: [0, [Validators.required, Validators.min(0)]],
      descripcion: ['', Validators.required],
      categoria: ['', Validators.required],
      disponible: [true, Validators.required],
      ingredientes: [[], Validators.required]
    });
  }

  ngOnInit(): void {
    this.ingredienteService.getIngredientes().subscribe((response: any) => {
      if (response.state === 'Success' && Array.isArray(response.data[1])) {
        this.ingredientesList = response.data[1];
      } else {
        console.error('Error al obtener ingredientes:', response);
      }
    });
  }

  addProducto(): void {
    if (this.productoForm.valid) {
      const productoData = this.productoForm.value;
      
      this.productoService.createProducto(productoData)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            console.error('Error en el proceso:', error);
            let errorMessage = 'Ocurrió un error desconocido';
            if (error.error instanceof ErrorEvent) {
              errorMessage = `Error: ${error.error.message}`;
            } else {
              errorMessage = `El servidor retornó el código ${error.status}: ${error.error.message || error.message}`;
            }
            return throwError(() => new Error(errorMessage));
          })
        )
        .subscribe({
          next: (createdProducto) => {
            console.log('Producto creado:', createdProducto);
            this.dialogRef.close(createdProducto);
          },
          error: (error) => {
            console.error('Error al crear el producto:', error);
            // Aquí puedes mostrar un mensaje de error al usuario
          }
        });
    } else {
      console.error('Formulario inválido');
      this.markFormGroupTouched(this.productoForm);
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getErrorMessage(field: string): string {
    const control = this.productoForm.get(field);
    if (control?.hasError('required')) {
      return 'Este campo es requerido';
    }
    if (control?.hasError('min')) {
      return 'El valor debe ser mayor o igual a 0';
    }
    return '';
  }
}