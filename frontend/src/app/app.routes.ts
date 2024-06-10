import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PageComponent } from './Ingredientes/components/page/page.component';
import { LoginComponent } from './Users/components/login/login.component';

export const routes: Routes = [
    { path: '', component: AppComponent },
    { path: 'ingredientes', component: PageComponent },
    { path: 'login', component: LoginComponent },
];
