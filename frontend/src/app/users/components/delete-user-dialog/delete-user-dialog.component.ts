import { Component, Inject, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environment';
@Component({
  selector: 'app-delete-user-dialog',
  templateUrl: './delete-user-dialog.component.html',
  standalone: true,
  imports: [
    MatButtonModule
  ],
  styleUrls: ['./delete-user-dialog.component.css']
})
export class DeleteUserDialogComponent {
  @Output() userDeleted = new EventEmitter<string>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DeleteUserDialogComponent>,
    private http: HttpClient
  ) { }

  onCancel(): void {
    this.dialogRef.close(false); // Cierra el diálogo con el valor false
  }

  onDelete(): void {
    if (this.data) {
      this.deleteUser(this.data._id);
    } else {
      console.error('El ID del usuario es undefined');
    }
  }

  deleteUser(id: string) {
    this.http.delete(`${environment.apiUrl}/users/${id}`).subscribe(
      (response: any) => {
        if (response.state === 'Success') {
          this.userDeleted.emit(id); // Emite el ID del usuario eliminado
          this.dialogRef.close(true); // Cierra el diálogo con el valor true
        } else {
          console.error('Error en la respuesta del servicio:', response);
          this.dialogRef.close(false); // Cierra el diálogo con el valor false
        }
      },
      error => {
        console.error('Error al eliminar el usuario:', error);
        this.dialogRef.close(false); // Cierra el diálogo con el valor false
      }
    );
  }
}
