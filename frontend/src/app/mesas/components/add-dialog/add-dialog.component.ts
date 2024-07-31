import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../../environment';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule
  ]
})
export class AddMesaDialogComponent implements OnInit {
  public mesaForm!: FormGroup;

  constructor(public dialogRef: MatDialogRef<AddMesaDialogComponent>, private http: HttpClient) {}

  ngOnInit(): void {
    this.mesaForm = new FormGroup({
      Nmesa: new FormControl('', [Validators.required, Validators.min(1)]),
      cantidadPersonas: new FormControl('', [Validators.required, Validators.min(1)])
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addMesa(): void {
    if (this.mesaForm.invalid) {
      this.markAllAsTouched(this.mesaForm);
      return;
    }

    const newMesa = this.mesaForm.value;

    this.http.post(`${environment.apiUrl}/mesas`, newMesa).subscribe(
      response => {
        this.dialogRef.close(newMesa);
      },
      error => {
        console.error('Error al agregar la mesa:', error);
      }
    );
  }

  markAllAsTouched(group: FormGroup): void {
    Object.values(group.controls).forEach(control => {
      if (control instanceof FormControl) {
        control.markAsTouched();
      }
    });
  }

  getErrorMessage(formControlName: string): string {
    const control = this.mesaForm.get(formControlName);

    if (control && control.hasError('required')) {
      return 'Este campo es obligatorio.';
    } else if (control && control.hasError('min')) {
      return 'Debe ser un número mayor que 0.';
    }

    return '';
  }
}
