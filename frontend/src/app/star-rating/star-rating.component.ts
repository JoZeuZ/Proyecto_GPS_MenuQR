import { Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-star-rating',
  template: `
    <div class="star-rating">
      <div class="star-container" *ngFor="let star of starsArray; let i = index">
        <mat-icon
          (click)="rate(i + 1)"
          (mouseenter)="hover(i + 1)"
          (mouseleave)="leave()"
          [class.filled]="(i + 1) <= rating || (i + 1) <= hoverState"
        >
          star
        </mat-icon>
        <div class="hover-message" *ngIf="hoverState === i + 1">{{ hoverMessages[i] }}</div>
      </div>
    </div>
  `,
  styles: [`
    .star-rating {
      display: flex;
      cursor: pointer;
    }
    .star-rating mat-icon {
      font-size: 27px;
      color: #d3d3d3;
      transition: font-size 0.2s;
    }
    .star-rating mat-icon.filled {
      color: #ffd700;
    }
    .star-container {
      position: relative;
      margin: 0 5px;
    }
    .hover-message {
      position: absolute;
      top: -30px;
      left: 50%;
      transform: translateX(-50%);
      background-color: #333;
      color: #fff;
      padding: 2px 5px;
      border-radius: 3px;
      font-size: 12px;
      white-space: nowrap;
      display: none;
    }
    .star-container:hover .hover-message {
      display: block;
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

  starsArray: boolean[] = Array(5).fill(false);  // 5 elementos para 5 estrellas
  hoverState: number = 0;
  hoverMessages: string[] = ['Muy malo', 'Malo', 'Meh', 'Bien', 'Muy bien'];

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











