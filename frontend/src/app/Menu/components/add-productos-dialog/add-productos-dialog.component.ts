import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormArray, FormControlName } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-productos-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './add-productos-dialog.component.html',
  styleUrl: './add-productos-dialog.component.css'
})
export class AddProductosDialogComponent {

  public productoForm!: FormGroup;
  public imagePreview: string | ArrayBuffer | null = null;
  public selectedFileName: string | null = null;

  constructor(public dialogRef: MatDialogRef<AddProductosDialogComponent>, private http: HttpClient) {}

  ngOnInit(): void {
    this.productoForm = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      precio: new FormControl('', [Validators.required]),
      disponible: new FormControl(false, Validators.required),
      img: new FormControl({ value: '', disabled: true })
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedFileName = file.name;

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  addProducto(): void {
    const producto = this.productoForm.value;
    const formData = new FormData();
    formData.append('nombre', producto.nombre);
    formData.append('precio', producto.precio);
    formData.append('disponible', producto.disponible);

    this.http.post('http://localhost:3000/api/productos', formData).subscribe({
      next: (response: any) => {
        this.dialogRef.close(response);
      },
      error: (error) => {
        console.error('Error al agregar el producto:', error);
        this.dialogRef.close();
      }
    });
  }

  markAllAsTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      if (control instanceof FormControl) {
        control.markAsTouched();
      } else if (control instanceof FormGroup) {
        this.markAllAsTouched(control);
      }
    });
  }

// Aqui iran los get error
}

