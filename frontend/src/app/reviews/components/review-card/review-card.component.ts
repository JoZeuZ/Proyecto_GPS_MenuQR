import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { ReviewService } from '../../services/review.service';
import { DecimalPipe, NgForOf, CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { PaginatorComponent } from '../../../public/components/paginator/paginator.component';

@Component({
  selector: 'app-review-card',
  standalone: true,
  imports: [
    DecimalPipe,
    NgForOf,
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatDialogModule,
    PaginatorComponent
  ],
  templateUrl: './review-card.component.html',
  styleUrls: ['./review-card.component.css']
})
export class ReviewCardComponent implements OnInit, OnChanges {
  @Input() reviews: any[] = [];
  @Input() currentPage: number = 1;

  public itemsPerPage: number = 10;
  public paginatedReviews: any[] = [];

  constructor(private service: ReviewService) { }

  ngOnInit(): void {
    this.loadReviews();
  }

  ngOnChanges(): void {
    this.applyPagination();
  }

  loadReviews(): void {
    this.service.getReviews().subscribe({
      next: (response: any) => {
        if (response && response.data && Array.isArray(response.data[1])) {
          this.reviews = response.data[1];
        } else {
          console.error('Unexpected response format:', response);
          this.reviews = [];
        }
        this.applyPagination();
      },
      error: (error) => {
        console.error('Error fetching reviews:', error);
      }
    });
  }

  applyPagination() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedReviews = this.reviews.slice(startIndex, endIndex);
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.applyPagination();
  }
}





