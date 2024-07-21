import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ReviewService } from '../../services/review.service';
import { PaginatorComponent } from '../../../public/components/paginator/paginator.component';
import { DecimalPipe, NgForOf, CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { StarRatingComponent } from '../../../star-rating/star-rating.component';

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
    PaginatorComponent,
    StarRatingComponent
  ],
  templateUrl: './review-card.component.html',
  styleUrls: ['./review-card.component.css']
})
export class ReviewCardComponent implements OnInit, OnChanges {
  @Input() reviews: any[] = [];
  @Input() currentPage: number = 1;

  public itemsPerPage: number = 10; // Número de reseñas por página
  public paginatedReviews: any[] = [];
  public categories: string[] = [];
  public selectedCategory: string = '';
  public selectedRating: number | null = null;

  constructor(private service: ReviewService) { }

  ngOnInit(): void {
    this.loadReviews();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentPage'] || changes['reviews']) {
      this.applyPagination();
    }
  }

  loadReviews(): void {
    this.service.getReviews().subscribe({
      next: (response: any) => {
        if (response && response.data && Array.isArray(response.data[1])) {
          this.reviews = response.data[1];
          this.extractCategories();
          this.applyPagination();
        } else {
          console.error('Unexpected response format:', response);
          this.reviews = [];
        }
      },
      error: (error) => {
        console.error('Error fetching reviews:', error);
      }
    });
  }

  extractCategories(): void {
    const uniqueCategories = new Set(this.reviews.map(review => review.categoria));
    this.categories = Array.from(uniqueCategories);
  }

  applyPagination(): void {
    const filteredReviews = this.reviews
      .filter(review => this.selectedCategory ? review.categoria === this.selectedCategory : true)
      .filter(review => this.selectedRating !== null ? review.estrellas === this.selectedRating : true);

    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;

    this.paginatedReviews = filteredReviews.slice(startIndex, endIndex);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.applyPagination();
  }

  onCategoryChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedCategory = target.value;
    this.currentPage = 1; // Reset to first page on category change
    this.applyPagination();
  }

  onRatingChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedRating = target.value ? +target.value : null;
    this.currentPage = 1; // Reset to first page on rating change
    this.applyPagination();
  }
}











