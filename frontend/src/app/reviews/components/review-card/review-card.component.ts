import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ReviewService } from '../../services/review.service';
import { CallWaiterWebSocketService } from '../../../Llamada/call-waiter-websocket.service';
import { PaginatorComponent } from '../../../public/components/paginator/paginator.component';
import { DecimalPipe, NgForOf, CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { StarRatingComponent } from '../../../star-rating/star-rating.component';
import { ReviewDetailDialogComponent } from '../review-detail-dialog/review-detail-dialog.component';
import { FilterComponent } from '../../../public/components/filter/filter.component';

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
    StarRatingComponent,
    FilterComponent
  ],
  templateUrl: './review-card.component.html',
  styleUrls: ['./review-card.component.css']
})
export class ReviewCardComponent implements OnInit, OnChanges {
  @Input() reviews: any[] = [];
  @Input() currentPage: number = 1;

  public itemsPerPage: number = 10;
  public paginatedReviews: any[] = [];
  public categories: string[] = [];
  public selectedCategory: string = '';
  public selectedRating: number | null = null;

  public notifications: any[] = [];

  constructor(
    private reviewService: ReviewService,
    private callWaiterWebSocketService: CallWaiterWebSocketService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadReviews();
    this.listenForCallWaiterNotifications();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentPage'] || changes['reviews']) {
      this.applyPagination();
    }
  }

  loadReviews(): void {
    this.reviewService.getReviews().subscribe({
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

  onCategoryChange(selectedCategories: string[]): void {
    this.selectedCategory = selectedCategories[0] || '';
    this.currentPage = 1;
    this.applyPagination();
  }

  onRatingChange(selectedRatings: string[]): void {
    this.selectedRating = selectedRatings[0] ? parseInt(selectedRatings[0], 10) : null;
    this.currentPage = 1;
    this.applyPagination();
  }

  listenForCallWaiterNotifications(): void {
    this.callWaiterWebSocketService.getCallWaiterObservable().subscribe(call => {
      this.notifications.push(call);
      this.displayNotification(call);
    });
  }

  displayNotification(call: any): void {
    alert(`Mesa ${call.tableNumber} está llamando.`);
  }

  openReviewDialog(review: any): void {
    this.dialog.open(ReviewDetailDialogComponent, {
      data: review,
      width: '80vw',
      maxHeight: '90vh'
    });
  }
}











