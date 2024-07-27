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
  styleUrl: './edit-productos-dialog.component.css'
})
export class EditProductosDialogComponent {

  public productoForm!: FormGroup;
  public availableStatuses: string[] = ["Disponible", "No disponible"];
  public imagePreview: string | ArrayBuffer | null = null;
  public selectedFileName: string | null = null;
  private selectedFile: File | null = null;

  constructor(
    private http: HttpClient, 
    public dialogRef: MatDialogRef<EditProductosDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.productoForm = new FormGroup({
      nombre: new FormControl(this.data.producto.nombre, [Validators.required]),
      precio: new FormControl(this.data.producto.precio, [Validators.required]),
      disponible: new FormControl(this.data.producto.disponible)
    });
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedFile = file;
      this.selectedFileName = file.name;

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  updateProducto(): void {
    const formData = new FormData();
    formData.append('nombre', this.productoForm.value.nombre);
    formData.append('precio', this.productoForm.value.precio);
    formData.append('disponible', this.productoForm.value.disponible);
    if (this.selectedFile) {
      formData.append('img', this.selectedFile);
    }

    this.http.put(`http://localhost:3000/api/productos/${this.data.producto._id}`, formData).subscribe((response: any) => {
      if (response.state === 'Success') {
        this.dialogRef.close(response.data);
      } else {
        console.error('Error en la respuesta del servicio:', response);
      }
    });
  }

  deleteOldImage(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.data.producto.img) {
        const deleteUrl = `http://localhost:3000/api/${this.data.producto.img}`;

        this.http.delete(deleteUrl).subscribe({
          next: (response: any) => {
            resolve();
          },
          error: (error: any) => {
            console.error('Error al eliminar la imagen:', error);
            reject();
          }
        });
      } else {
        resolve();
      }
    });
  }

  onSaveClick(): void {
    if (this.selectedFile) {
      this.deleteOldImage().then(() => {
        this.updateProducto();
      });
    } else {
      this.updateProducto();
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
}
