import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-add-user-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule],
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.css']
})
export class AddUserDialog {
  public newUser: any = {
    username: '',
    email: '',
    password: '',
    roles: []
  };
  public availableRoles: string[] = ['Cliente', 'Administrador', 'Mesero'];
  public selectedRole: string = '';

  constructor(public dialogRef: MatDialogRef<AddUserDialog>) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    this.newUser.roles = [this.selectedRole]; 
    this.dialogRef.close(this.newUser);
  }
}
