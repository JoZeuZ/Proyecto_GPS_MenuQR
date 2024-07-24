import { Component, Inject, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-delete-ingredient-dialog',
  templateUrl: './delete-ingredient-dialog.component.html',
  styleUrls: ['./delete-ingredient-dialog.component.css'],
  standalone: true,
  imports: [
    MatButtonModule,
  ]
})
export class DeleteIngredientDialog {
  @Output() ingredientDeleted = new EventEmitter<string>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DeleteIngredientDialog>, 
    private http: HttpClient
  ) { }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onDelete(): void {
    if (this.data) {
      this.deleteIngredient(this.data._id);
    } else {
      console.error('El ID del ingrediente es undefined');
    }
  }

  deleteIngredient(id: string) {
    this.http.delete(`http://localhost:3000/api/ingredientes/${id}`).subscribe({
      next: (response: any) => {
        this.ingredientDeleted.emit(id); 
        this.dialogRef.close(true); 
      },
      error: (error) => {
        console.error('Error al eliminar el ingrediente:', error);
        this.dialogRef.close(false); 
      }
    });
  }
}
