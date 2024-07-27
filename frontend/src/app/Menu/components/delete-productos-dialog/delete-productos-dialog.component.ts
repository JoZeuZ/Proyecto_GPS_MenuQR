import { Component, Inject, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-delete-productos-dialog',
  standalone: true,
  imports: [
    MatButtonModule
  ],
  templateUrl: './delete-productos-dialog.component.html',
  styleUrl: './delete-productos-dialog.component.css'
})
export class DeleteProductosDialogComponent {
  @Output() productoDeleted = new EventEmitter<string>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DeleteProductosDialogComponent>,
    private http: HttpClient
  ) { }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onDelete(): void {
    if (this.data) {
      this.deleteProducto(this.data._id);
    } else {
      console.error('El ID del producto es undefined');
    }
  }

  deleteProducto(id: string) {
    this.http.delete(`http://localhost:3000/api/productos/${id}`).subscribe({
      next: (response: any) => {
        this.productoDeleted.emit(id);
        this.dialogRef.close(true);
      },
      error: (error) => {
        console.error('Error al eliminar el producto:', error);
        this.dialogRef.close(false);
      }
    });
  }
}
