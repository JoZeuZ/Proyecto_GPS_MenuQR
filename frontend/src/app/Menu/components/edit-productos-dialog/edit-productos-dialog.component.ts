import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { IngredientesApiService } from '../../../Ingredientes/services/ingredientes-api.service';
import { of, throwError } from 'rxjs';
import { FormBuilder } from '@angular/forms';

interface Ingrediente {
  _id: string;
  nombre: string;
}

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

  ingredientesList: Ingrediente[] = [];
  selectedFile: File | null = null;
  categoriasList: string[] = ["Bebidas", "Plato principal", "Para compartir", "Postres", "Hamburguesas","Agregados","Promos","Pizzas", ];


  public productoForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private ingredienteService: IngredientesApiService,
    private http: HttpClient, 
    public dialogRef: MatDialogRef<EditProductosDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    {
      this.productoForm = this.fb.group({
        nombre: ['', Validators.required],
        precio: [0, [Validators.required, Validators.min(0)]],
        descripcion: ['', Validators.required],
        categoria: ['', Validators.required],
        disponible: [true, Validators.required],
        img: [{ value: '', disabled: true }],
        ingredientes: [[], Validators.required]
      });
    }
  }

  ngOnInit(): void {
    this.productoForm = new FormGroup({
      nombre: new FormControl(this.data.producto.nombre, [Validators.required]),
      precio: new FormControl(this.data.producto.precio, [Validators.required]),
      descripcion: new FormControl(this.data.producto.descripcion, [Validators.required]),
      categoria: new FormControl(this.data.producto.categoria, [Validators.required]),
      ingredientes: new FormControl(this.data.producto.ingredientes, [Validators.required]),
      disponible: new FormControl(this.data.producto.disponible)
    });
    this.ingredienteService.getIngredientes().subscribe((response: any) => {
      if (response.state === 'Success' && Array.isArray(response.data[1])) {
        this.ingredientesList = response.data[1];
      } else {
        console.error('Error al obtener ingredientes:', response);
      }
    });
  }

  updateProducto(): void {
    if (this.productoForm.valid) {
      const productoData = this.productoForm.value;

      this.http.put(`http://localhost:3000/api/productos/${this.data.producto._id}`, productoData)
        .subscribe((response: any) => {
          if (response.state === 'Success') {
            this.dialogRef.close(response.data);
            window.location.reload();
          } else {
            console.error('Error en la respuesta del servicio:', response);
          }
        });
    } else {
      console.error('Formulario inválido');
      this.markFormGroupTouched(this.productoForm);
    }
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

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}