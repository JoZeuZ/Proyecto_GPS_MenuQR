import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { StarRatingComponent } from '../../../star-rating/star-rating.component';

@Component({
  selector: 'app-review-detail-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogContent,
    MatDialogActions,
    MatButtonModule,
    StarRatingComponent
  ],
  templateUrl: './review-detail-dialog.component.html',
  styleUrls: ['./review-detail-dialog.component.css']
})
export class ReviewDetailDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ReviewDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}


