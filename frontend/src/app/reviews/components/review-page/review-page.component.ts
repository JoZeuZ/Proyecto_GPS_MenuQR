import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddReviewComponent } from '../add-review/add-review.component';

@Component({
  selector: 'app-review-page',
  standalone: true,
  imports: [CommonModule, AddReviewComponent],
  templateUrl: './review-page.component.html',
  styleUrls: ['./review-page.component.css']
})
export class ReviewPageComponent {}

