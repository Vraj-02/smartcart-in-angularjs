import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProductViewComponent } from './components/product-view/product-view.component';
import { CartComponent } from './components/cart/cart.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { authGuard } from './services/guard/auth.guard';

const routes: Routes = [

  {
    path: '',
    component : HomeComponent,
    canActivate: [authGuard],
  },
  {
    path: 'app-home',
    component : HomeComponent,
    canActivate: [authGuard],
  },
  {
    path: 'app-login',
    component : LoginComponent,
  },
  {
    path: 'app-signup',
    component : SignupComponent
  },
  {
    path: 'app-wishlist',
    component : WishlistComponent,
    canActivate: [authGuard],
  },

  {
    path: 'app-cart',
    component : CartComponent,
    canActivate: [authGuard],
  },

  {
    path: 'app-home/app-product-view',
    component : ProductViewComponent,
    canActivate: [authGuard],
  },

  {
    path: 'app-profile',
    component : ProfileComponent,
    canActivate: [authGuard],
  },
  {
    path: 'app-cart/app-checkout',
    component : CheckoutComponent,
    canActivate: [authGuard],
  },
  
  {
    path: '**',
    component : NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
