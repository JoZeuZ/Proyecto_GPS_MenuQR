import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-user-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.css']
})
export class EditUserDialogComponent {
  public user: any;
  public availableRoles: string[] = ["Cliente", "Administrador", "Mesero"];

  constructor(
    public dialogRef: MatDialogRef<EditUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.user = { ...data.user };
    if (Array.isArray(this.user.roles) && this.user.roles.length > 0) {
      this.user.role = this.user.roles[0].name || this.user.roles[0];
    } else {
      this.user.role = this.user.roles;
    }
  }
  
  onSaveClick(): void {
    const updatedUser = {
      _id: this.user._id,
      username: this.user.username,
      email: this.user.email,
      roles: [this.user.role]
    };
    console.log('Datos enviados para actualizar usuario:', updatedUser);
    this.dialogRef.close(updatedUser);
  }
  

  onNoClick(): void {
    this.dialogRef.close();
  }

}
