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
import { MatSnackBar } from '@angular/material/snack-bar';

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
  public selectedCategories: string[] = [];
  public selectedRatings: number[] = [];

  public notifications: any[] = [];

  constructor(
    private reviewService: ReviewService,
    private callWaiterWebSocketService: CallWaiterWebSocketService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
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
      .filter(review => this.selectedCategories.length ? this.selectedCategories.includes(review.categoria) : true)
      .filter(review => this.selectedRatings.length ? this.selectedRatings.includes(review.estrellas) : true);

    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;

    this.paginatedReviews = filteredReviews.slice(startIndex, endIndex);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.applyPagination();
  }

  onCategoryChange(selectedCategories: string[]): void {
    this.selectedCategories = selectedCategories;
    this.currentPage = 1;
    this.applyPagination();
  }

  onRatingChange(selectedRatings: string[]): void {
    this.selectedRatings = selectedRatings.map(rating => parseInt(rating, 10));
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
    this.snackBar.open(`Mesa ${call.tableNumber} está llamando`, 'Cerrar', {
      duration: 10000, 
    });
  }

  openReviewDialog(review: any): void {
    this.dialog.open(ReviewDetailDialogComponent, {
      data: review,
      width: '80vw',
      maxHeight: '90vh'
    });
  }
}













