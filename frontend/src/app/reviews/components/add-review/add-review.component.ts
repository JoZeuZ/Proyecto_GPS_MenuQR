import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { ReviewService } from '../../services/review.service';
import { StarRatingComponent } from '../../../star-rating/star-rating.component';

@Component({
  selector: 'app-add-review',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    StarRatingComponent
  ],
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent implements OnInit {
  public reviewForm!: FormGroup;
  public errorMessage: string | null = null;

  categories = ['Comida', 'Servicio', 'Ambiente', 'General'];

  constructor(private http: HttpClient, private reviewService: ReviewService) {}

  ngOnInit(): void {
    this.reviewForm = new FormGroup({
      titulo: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required]),
      estrellas: new FormControl(0.5, [Validators.required, Validators.min(0.5), Validators.max(5)]),
      categoria: new FormControl('General', [Validators.required])
    });
  }

  addReview(): void {
    if (this.reviewForm.invalid) {
      this.markAllAsTouched(this.reviewForm);
      return;
    }

    const newReview = {
      ...this.reviewForm.value,
      estrellas: Number(this.reviewForm.value.estrellas)
    };

    this.reviewService.addReview(newReview).subscribe({
      next: (response: any) => {
        alert('Reseña añadida con éxito!');
        this.reviewForm.reset({ estrellas: 0.5, categoria: 'General' });
        this.errorMessage = null;
      },
      error: (error: any) => {
        this.errorMessage = error.message;
      }
    });
  }

  markAllAsTouched(group: FormGroup): void {
    Object.values(group.controls).forEach(control => {
      if (control instanceof FormControl) {
        control.markAsTouched();
      } else if (control instanceof FormGroup) {
        this.markAllAsTouched(control);
      }
    });
  }

  getErrorMessage(formControlName: string): string {
    const control = this.reviewForm.get(formControlName);

    if (control && control.hasError('required')) {
      return 'Este campo es obligatorio.';
    } else if (control && control.hasError('min')) {
      return 'El valor mínimo es 0.5.';
    } else if (control && control.hasError('max')) {
      return 'El valor máximo es 5.';
    }

    return '';
  }
}










