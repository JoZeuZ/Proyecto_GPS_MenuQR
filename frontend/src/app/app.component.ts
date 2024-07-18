import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { FooterComponentComponent } from './public/components/footer-component/footer-component.component';
import { IngredientPageComponent } from './Ingredientes/components/ingredient-page/ingredient-page.component';
import { UserPageComponent } from './users/components/user-page/user-page.component'; 
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'; 
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { LoginComponent } from './auth/components/login/login.component';
import { ReviewPageComponent } from './reviews/components/review-page/review-page.component';
import { ReviewCardComponent } from './reviews/components/review-card/review-card.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatButtonModule,
    CommonModule,
    FooterComponentComponent,
    IngredientPageComponent,
    UserPageComponent,
    LoginComponent,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    ReviewPageComponent,
    ReviewCardComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], 
})
export class AppComponent {
  title = 'frontend';
  currentRoute: string = '';

  constructor(private router: Router) {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((event) => {
      this.currentRoute = this.router.url;
    });
  }

  navigateToHome() {
    this.router.navigate(['/']);
  }
  
  isIngredientesRouteActive(): boolean {
    return this.currentRoute === '/ingredientes';
  }

  navigateToIngredientes() {
    this.router.navigate(['/ingredientes']);
  }

  navigateToUsers() {
    this.router.navigate(['/users']);
  }

  isUsersRouteActive(): boolean {
    return this.currentRoute === '/users';
  }

  isLoginRouteActive(): boolean {
    return this.currentRoute === '/login';
  }
  isReviewRouteActive(): boolean {
    return this.currentRoute === '/reviews';
  }
  navigateToReview() {
    this.router.navigate(['/reviews']);
  }
  isReviewCardRouteActive(): boolean {
    return this.currentRoute === '/reviewsCard';
  }
  navigateToReviewCard() {
    this.router.navigate(['/reviewsCard']);
  }
}
