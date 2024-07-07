import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { IngredientPageComponent } from './Ingredientes/components/ingredient-page/ingredient-page.component';
import { UserPageComponent } from './users/components/user-page/user-page.component';
import { PedidoPageComponent } from './Pedido/components/pedido-page/pedido-page.component';

export const routes: Routes = [
    { path: '', component: AppComponent },
    { path: 'ingredientes', component: IngredientPageComponent },
    { path: 'users', component: UserPageComponent },
    { path: 'pedidos', component: PedidoPageComponent},
    { path: '**', redirectTo: '' } // Redirige a la página principal si la ruta no existe
];