import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-add-user-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, MatIconModule],
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.css']
})
export class AddUserDialog implements OnInit {
  public userForm!: FormGroup;

  public availableRoles: string[] = ['Cliente', 'Administrador', 'Mesero'];

  constructor(public dialogRef: MatDialogRef<AddUserDialog>) { }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[A-Za-záéíóúüñÁÉÍÓÚÜÑ\s]+$/)
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ]),
      roles: new FormArray([new FormControl('', Validators.required)])
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    this.markAllAsTouched(this.userForm);

    if (this.userForm.invalid) {
      return;
    }

    const newUser = {
      ...this.userForm.value,
      roles: [this.userForm.value.roles[0]]
    };
    this.dialogRef.close(newUser);
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

  get roles() {
    return this.userForm.get('roles') as FormArray;
  }

  selectRole(role: string): void {
    this.roles.setControl(0, new FormControl(role));
  }

  getErrorMessage(formControlName: string): string {
    const control = this.userForm.get(formControlName);

    if (control && control.hasError('required')) {
      switch (formControlName) {
        case 'username':
          return 'El nombre es obligatorio.';
        case 'email':
          return 'El email es obligatorio.';
        case 'password':
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
      if (formControlName === 'password') {
        return 'La contraseña al menos 4 caracteres.';
      }
    }

    return '';
  }
}
