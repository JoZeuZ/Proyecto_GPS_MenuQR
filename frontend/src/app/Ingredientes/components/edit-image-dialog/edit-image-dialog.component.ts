import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-image-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './edit-image-dialog.component.html',
  styleUrls: ['./edit-image-dialog.component.css']
})
export class EditImageDialogComponent implements OnInit {
  public selectedImage: File | null = null;
  public imageUrl: string = ''; // Inicialización con un valor por defecto

  constructor(
    public dialogRef: MatDialogRef<EditImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    if (this.data && typeof this.data.img === 'string') {
      if (this.data.img.startsWith('http://') || this.data.img.startsWith('https://')) {
        this.imageUrl = this.data.img;
      } else if (this.data.img.startsWith('/uploads/')) {
        this.imageUrl = `http://localhost:3000/api${this.data.img}`;
      } else if (this.data.img.startsWith('uploads/')) {
        this.imageUrl = `http://localhost:3000/api/${this.data.img}`;
      }
      console.log('Constructed image URL:', this.imageUrl);
    } else {
      console.error('img no está definido o no es una cadena en los datos del diálogo');
    }
  }
  
  

  onFileSelected(event: any) {
    this.selectedImage = event.target.files[0];
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    if (this.selectedImage) {
      const formData = new FormData();
      formData.append('img', this.selectedImage);
  
      this.dialogRef.close(formData);
    }
  }
  
}
