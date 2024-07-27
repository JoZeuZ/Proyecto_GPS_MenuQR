import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { IngredientPageComponent } from './Ingredientes/components/ingredient-page/ingredient-page.component';
import { UserPageComponent } from './users/components/user-page/user-page.component';
import { PedidoPageComponent } from './Pedido/components/pedido-page/pedido-page.component';
import { LoginComponent } from './auth/components/login/login.component';
import { ReviewPageComponent } from './reviews/components/review-page/review-page.component';
import { ReviewCardComponent } from './reviews/components/review-card/review-card.component';
import { CallWaiterComponent } from './Llamada/waiter-call-button/waiter-call-button.component';
import { CartPageComponent } from './Cart/components/cart-page/cart-page.component';
import { PagoPageComponent } from './Pago/components/pago-page/pago-page.component';

export const routes: Routes = [
    { path: '', component: AppComponent },
    { path: 'ingredientes', component: IngredientPageComponent },
    { path: 'users', component: UserPageComponent },
    { path: 'pedidos', component: PedidoPageComponent},
    { path: 'login', component: LoginComponent},
    { path: 'reviews', component: ReviewPageComponent},
    { path: 'reviewsCard', component: ReviewCardComponent},
    {path: 'call-waiter', component: CallWaiterComponent},
    { path: 'cart', component: CartPageComponent },
    { path: 'pago', component: PagoPageComponent },
    { path: '**', redirectTo: '' } // Redirige a la página principal para ruta inexistente, posicionar sus rutas arriba de esta
    
];