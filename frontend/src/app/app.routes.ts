import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PageComponent } from './Ingredientes/components/page/page.component';

export const routes: Routes = [
    { path: '', component: AppComponent },
    { path: 'ingredientes', component: PageComponent } 
];
