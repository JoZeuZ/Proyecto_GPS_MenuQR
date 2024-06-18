import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
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
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatSelectModule
  ]
})
export class AddIngredientDialog {
  public newIngrediente: any = {
    nombre: '',
    disponible: false,
    img: ''
  };
  public imagePreview: string | ArrayBuffer | null = null;
  private selectedFile: File | null = null;

  constructor(public dialogRef: MatDialogRef<AddIngredientDialog>, private http: HttpClient) { }

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
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('nombre', this.newIngrediente.nombre);
      formData.append('disponible', String(this.newIngrediente.disponible));
      formData.append('img', this.selectedFile);

      this.http.post('http://localhost:3000/api/upload', formData).subscribe((response: any) => {
        this.newIngrediente.img = response.imgPath;
        this.dialogRef.close(this.newIngrediente);
      });
    } else {
      this.dialogRef.close(this.newIngrediente);
    }
  }
}
