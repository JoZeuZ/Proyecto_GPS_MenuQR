import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-ingredient-dialog',
  templateUrl: './add-ingredient-dialog.component.html',
  styleUrls: ['./add-ingredient-dialog.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ]
})
export class AddIngredientDialog implements OnInit {
  public ingredientForm!: FormGroup;
  public imagePreview: string | ArrayBuffer | null = null;
  private selectedFile: File | null = null;

  constructor(public dialogRef: MatDialogRef<AddIngredientDialog>, private http: HttpClient) {}

  ngOnInit(): void {
    this.ingredientForm = new FormGroup({
      nombre: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[A-Za-záéíóúüñÁÉÍÓÚÜÑ\s]+$/)
      ]),
      disponible: new FormControl(false, Validators.required),  // Boolean value
      img: new FormControl({ value: '', disabled: true })  // String value and disabled by default
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  addIngrediente(): void {
    if (this.ingredientForm.invalid) {
      this.markAllAsTouched(this.ingredientForm);
      return;
    }

    const newIngrediente = {
      ...this.ingredientForm.value,
      disponible: Boolean(this.ingredientForm.value.disponible),  // Ensure it's a boolean
      img: String(this.ingredientForm.value.img)  // Ensure it's a string
    };

    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('nombre', newIngrediente.nombre);
      formData.append('disponible', String(newIngrediente.disponible));
      formData.append('img', this.selectedFile);

      this.http.post('http://localhost:3000/api/upload', formData).subscribe((response: any) => {
        newIngrediente.img = response.imgPath;
        this.dialogRef.close(newIngrediente);
      });
    } else {
      this.dialogRef.close(newIngrediente);
    }
  }

  markAllAsTouched(group: FormGroup | FormArray): void {
    Object.values(group.controls).forEach(control => {
      if (control instanceof FormControl) {
        control.markAsTouched();
      } else if (control instanceof FormGroup || control instanceof FormArray) {
        this.markAllAsTouched(control);
      }
    });
  }

  getErrorMessage(formControlName: string): string {
    const control = this.ingredientForm.get(formControlName);

    if (control && control.hasError('required')) {
      switch (formControlName) {
        case 'nombre':
          return 'El nombre es obligatorio.';
        case 'disponible':
          return 'La disponibilidad es obligatoria.';
        default:
          return 'Este campo es obligatorio.';
      }
    } else if (control && control.hasError('pattern')) {
      if (formControlName === 'nombre') {
        return 'El nombre solo debe tener letras y espacios.';
      }
    }

    return '';
  }
}
