import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environment';
@Component({
  selector: 'app-edit-ingredient-dialog',
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
  templateUrl: './edit-ingredient-dialog.component.html',
  styleUrls: ['./edit-ingredient-dialog.component.css']
})
export class EditIngredientDialogComponent implements OnInit {
  public ingredientForm!: FormGroup;
  public availableStatuses: string[] = ["Disponible", "No Disponible"];
  public imagePreview: string | ArrayBuffer | null = null;
  public selectedFileName: string | null = null;
  private selectedFile: File | null = null;

  constructor(
    private http: HttpClient, 
    public dialogRef: MatDialogRef<EditIngredientDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.ingredientForm = new FormGroup({
      nombre: new FormControl(this.data.ingredient.nombre, [Validators.required]),
      disponible: new FormControl(this.data.ingredient.disponible)
    });

    this.imagePreview = this.getImageUrl(this.data.ingredient.img);
  }

  getImageUrl(imgPath: string): string {
    return imgPath ? `${environment.apiUrl}/${imgPath}` : '';
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

  updateIngredient() {
    this.http.put(`${environment.apiUrl}/ingredientes/${this.data.ingredient._id}`, this.ingredientForm.value)
      .subscribe((response: any) => {
        this.dialogRef.close({ ...this.ingredientForm.value, _id: this.data.ingredient._id, img: this.data.ingredient.img });
      });
  }

  deleteOldImage(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.data.ingredient.img) {
        const deleteUrl = `${environment.apiUrl}/${this.data.ingredient.img}`;

        this.http.delete(deleteUrl).subscribe({
          next: (response: any) => {
            resolve();
          },
          error: (error) => {
            console.error('Error al eliminar la imagen anterior:', error);
            reject(error);
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
        const formData = new FormData();
        formData.append('nombre', this.ingredientForm.value.nombre);
        formData.append('disponible', String(this.ingredientForm.value.disponible));
        formData.append('oldImg', this.data.ingredient.img); 
        if (this.selectedFile) {
          formData.append('img', this.selectedFile);
        }
        this.http.post(`${environment.apiUrl}/upload`, formData).subscribe((response: any) => {
          this.ingredientForm.value.img = response.imgPath;
          this.updateIngredient();
        });
      }).catch((error) => {
        console.error('Error en el proceso de eliminación de la imagen anterior:', error);
      });
    } else {
      this.updateIngredient(); 
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getErrorMessage(formControlName: string): string {
    const control = this.ingredientForm.get(formControlName);

    if (control && control.hasError('required')) {
      return 'El nombre es obligatorio.';
    }

    return '';
  }
}
