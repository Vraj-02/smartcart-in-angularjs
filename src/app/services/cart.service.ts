import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}


  getCartItems(userId: number) {
    let token = JSON.parse(localStorage.getItem('token') || '');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    let url = `http://localhost:1337/api/carts?filters[user_detail][id][$eq][0]=${userId}&populate=product&filters[order][id][$notNull]`;
    console.log(url);

    return this.http.get<any>(url, {
      headers,
    });
  }

  addCart(cartProduct: any) {
    let token = JSON.parse(localStorage.getItem('token') || '');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http.post(environment.cartUrl, cartProduct, { headers });
  }

  private cartItems: number[] = [];

  addToCartItems(productId: number) {
    if (!this.cartItems.includes(productId)) {
      this.cartItems.push(productId);
    }
  }

  removeFromCart(productId: number) {
    this.cartItems = this.cartItems.filter((id) => id !== productId);
  }

  isInCart(productId: number): boolean {
    return this.cartItems.includes(productId);
  }

  deleteCartItem(cartId: number) {
    const url = `${environment.cartUrl}/${cartId}`;
    let token = JSON.parse(localStorage.getItem('token') || '');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http.delete<any>(url, { headers });
  }

  updateCartItemQuantity(cartItemId: number, quantity: number) {
    const url = `${environment.cartUrl}/${cartItemId}`;
    let token = JSON.parse(localStorage.getItem('token') || '');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    const body = {
      data: {
        quantity: quantity,
      },
    };
    return this.http.put(url, body, { headers });
  }

}