import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { UsersApiService } from '../../services/users-api.service';

@Component({
  selector: 'app-edit-user-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.css']
})
export class EditUserDialogComponent implements OnInit {
  public userForm: FormGroup;
  public availableRoles: string[] = ["Administrador", "Mesero"];
  public errorMessage: string = '';

  constructor(
    public dialogRef: MatDialogRef<EditUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UsersApiService
  ) {
    this.userForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[A-Za-záéíóúüñÁÉÍÓÚÜÑ\s]+$/)
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      currentPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ]),
      roles: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    const initialRole = this.data.user.roles && this.data.user.roles[0] ? 
      (this.data.user.roles[0].name || this.data.user.roles[0]) : '';
  
    this.userForm.patchValue({
      username: this.data.user.username,
      email: this.data.user.email,
      roles: initialRole
    });
  }

  onSaveClick(): void {
    this.markAllAsTouched(this.userForm);
    this.errorMessage = '';
  
    if (this.userForm.invalid) {
      return;
    }
  
    const updatedUser = {
      _id: this.data.user._id,
      username: this.userForm.value.username,
      email: this.userForm.value.email,
      password: this.userForm.value.currentPassword,
      roles: [this.userForm.value.roles]
    };
  
    this.userService.updateUser(updatedUser._id, updatedUser).subscribe(
      response => {
        this.dialogRef.close(updatedUser);
      },
      error => {
        if (error.status === 400 && error.error && error.error.message === 'Contraseña incorrecta') {
          this.errorMessage = 'Contraseña incorrecta';
        } else {
          this.errorMessage = 'Contraseña incorrecta';
        }
      }
    );
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

  onNoClick(): void {
    this.dialogRef.close();
  }  

  getErrorMessage(formControlName: string): string {
    const control = this.userForm.get(formControlName);

    if (control && control.hasError('required')) {
      switch (formControlName) {
        case 'username':
          return 'El nombre es obligatorio.';
        case 'email':
          return 'El email es obligatorio.';
        case 'currentPassword':
          return 'La contraseña es obligatoria.';
        case 'roles':
          return 'El rol es obligatorio.';
        default:
          return 'Este campo es obligatorio.';
      }
    } else if (control && control.hasError('pattern')) {
      if (formControlName === 'username') {
        return 'El nombre solo debe tener letras y espacios.';
      }
    } else if (control && control.hasError('email')) {
      return 'El email debe tener un formato válido.';
    } else if (control && control.hasError('minlength')) {
      if (formControlName === 'currentPassword') {
        return 'La contraseña debe tener al menos 4 caracteres.';
      }
    }

    return '';
  }
}