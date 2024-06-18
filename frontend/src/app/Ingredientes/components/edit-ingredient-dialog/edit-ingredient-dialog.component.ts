import { Component, Inject, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-edit-ingredient-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './edit-ingredient-dialog.component.html',
  styleUrls: ['./edit-ingredient-dialog.component.css']
})
export class EditIngredientDialogComponent {
  public ingredient: any;
  public availableStatuses: string[] = ["Disponible", "No Disponible"];
  public imagePreview: string | ArrayBuffer | null = null;
  public selectedFileName: string | null = null;
  private selectedFile: File | null = null;

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  constructor(
    public dialogRef: MatDialogRef<EditIngredientDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient
  ) {
    this.ingredient = { ...data.ingredient };
    this.imagePreview = this.getImageUrl(this.ingredient.img);
  }

  getImageUrl(imgPath: string): string {
    return imgPath ? `http://localhost:3000/api/${imgPath}` : '';
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
    this.http.put(`http://localhost:3000/api/ingredientes/${this.ingredient._id}`, this.ingredient)
      .subscribe((response: any) => {
        console.log('Ingrediente actualizado:', response);
        this.dialogRef.close(this.ingredient);
      });
  }

  deleteOldImage(): Promise<void> {
    return new Promise((resolve, reject) => {
        if (this.ingredient.img) {
            const deleteUrl = `http://localhost:3000/api/${this.ingredient.img}`;
            console.log('URL de eliminación de imagen:', deleteUrl);

            this.http.delete(deleteUrl)
                .subscribe({
                    next: (response: any) => {
                        console.log('Imagen anterior eliminada:', response);
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
        formData.append('nombre', this.ingredient.nombre);
        formData.append('disponible', String(this.ingredient.disponible));
        formData.append('oldImg', this.ingredient.img); 
        if (this.selectedFile) {
          formData.append('img', this.selectedFile);
        }

        console.log('Subiendo nueva imagen con datos:', formData);
        this.http.post('http://localhost:3000/api/upload', formData).subscribe((response: any) => {
          console.log('Respuesta de la subida de la imagen:', response);
          this.ingredient.img = response.imgPath;
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
}
