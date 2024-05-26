import { Router, NavigationEnd } from '@angular/router';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToolbarComponentComponent } from './public/components/toolbar-component/toolbar-component.component';
import { FooterComponentComponent } from './public/components/footer-component/footer-component.component';
import { CardsComponent } from './Ingredientes/components/cards/cards.component';
import { PageComponent } from './Ingredientes/components/page/page.component';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ToolbarComponentComponent,
    FooterComponentComponent,
    CardsComponent,
    MatButtonModule,
    PageComponent,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'frontend';
  currentRoute: string = '';
  constructor(private router: Router) {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((event) => {
      this.currentRoute = this.router.url;
    });
  }

  navigateToIngredientes() {
    this.router.navigate(['/ingredientes']);
  }

  navigateToHome() {
    this.router.navigate(['/']);
  }

  isIngredientesRouteActive(): boolean {
    return this.currentRoute === '/ingredientes';
  }
}
