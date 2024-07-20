import { Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-star-rating',
  template: `
    <div class="star-rating">
      <mat-icon
        *ngFor="let star of halfStarsArray; let i = index"
        (click)="rate(i + 1)"
        (mouseenter)="hover(i + 1)"
        (mouseleave)="leave()"
        [class.filled]="(i + 1) <= rating || (i + 1) <= hoverState"
      >
        star
      </mat-icon>
    </div>
  `,
  styles: [`
    .star-rating {
      display: flex;
      cursor: pointer;
    }
    .star-rating mat-icon {
      font-size: 24px;
      color: #d3d3d3;
    }
    .star-rating mat-icon.filled {
      color: #ffd700;
    }
  `],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StarRatingComponent),
      multi: true
    }
  ],
  standalone: true,
  imports: [CommonModule, MatIconModule]
})
export class StarRatingComponent implements ControlValueAccessor {
  @Input() rating: number = 0;
  @Output() ratingChange: EventEmitter<number> = new EventEmitter<number>();

  halfStarsArray: boolean[] = Array(5).fill(false);  // 5 elementos para 5 estrellas con incrementos de 0.5
  hoverState: number = 0;

  private onChange = (rating: number) => {};
  private onTouched = () => {};

  rate(rating: number): void {
    this.rating = rating;
    this.ratingChange.emit(this.rating);
    this.onChange(this.rating);
  }

  hover(index: number): void {
    this.hoverState = index;
  }

  leave(): void {
    this.hoverState = 0;
  }

  writeValue(rating: number): void {
    this.rating = rating;
  }

  registerOnChange(fn: (rating: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // Optionally handle the disabled state
  }
}








