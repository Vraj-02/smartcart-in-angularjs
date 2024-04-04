
// cart.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
//   cartItems = [
// {
//   img: '#',
//   name: 'Apple',
//   price: 20,
//   quantity: 2
// },
// {
//   img: '#',
//   name: 'milk',
//   price: 32,
//   quantity: 3
// }

//   ];

  constructor(
    private router: Router,
    private auth: AuthService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    const userId = localStorage.getItem('user_id');
    // this.isLoggedIn = this.auth.getAuthStatus();
    this.getCartItems(userId);
  }

  getUniqueCartItems() {
    this.cartItems = this.cartItems.reduce((prev, cur) => {
      if (
        !prev.some(
          (item: any) =>
            item.attributes.product.data.id === cur.attributes.product.data.id
        )
      ) {
        prev.push(cur);
      }
      return prev;
    }, []);
  }

  cartItems: any[] = [];

  getCartItems(userId: any) {
    this.cartService.getCartItems(userId).subscribe({
      next: (response) => {
        this.cartItems = response.data;
        console.log(this.cartItems);

        this.getUniqueCartItems();
        console.log(this.cartItems);

       
      },
      error: (error) => {
        console.error('Error fetching cart items:', error);
      },
    });
  }
  calculateItems(): number{
    let total=0;
    for (const product of this.cartItems) {
      total ++;
    }
    return total;
  }

  // Method to calculate total price
  calculateTotal(): number {
    let total = 0;
    for (const product of this.cartItems) {
      total +=  product.attributes.product.data.attributes.price * product.attributes.quantity;
    }
    return total;
  }

  // remove cartitems
  removeCartItem(productId: number) {
    if (!confirm('Are you sure you want to delete this item?')) {
      return;
    }

    let idToRemove = productId; // Example id to remove
    console.table(this.cartItems);

    this.cartItems = this.cartItems.filter((item) => item.id !== idToRemove);

    console.table(this.cartItems);

    this.cartService.deleteCartItem(productId).subscribe({
      next: (res) => {
        console.log('Cart item deleted successfully:', res);
      },
      error: (error) => {
        console.error('Error deleting cart item:', error);
      },
    });
  }
  checkOut() {
    let updatedCart = this.updateCartQuantity();

    updatedCart.forEach((item) => {
      this.cartService
        .updateCartItemQuantity(item.id, item.quantity)
        .subscribe({
          next: (res) => {
            this.router.navigate(['app-cart/app-checkout']);
          },
          error: (err) => {
            console.error(`Error updating cart item ${item.id}:`, err);
          },
        });
    });
  }

  updateCartQuantity() {
    return this.cartItems.map((item) => {
      return {
        id: item.id,
        quantity: item.attributes.quantity,
      };
    });
  }

  incrementQuantity(index: any) {
    index.attributes.quantity++;
    this.updateCartQuantity();
    this.calculateTotal();
  }

  decrementQuantity(index: any) {
    if (index.attributes.quantity <= 1) {
      return;
    }
    index.attributes.quantity--;
    this.updateCartQuantity();
    this.calculateTotal();
  }

  // Method to remove item from cart
  // removeItem(item: any): void {
  //   const index = this.cartItems.indexOf(item);
  //   if (index !== -1) {
  //     this.cartItems.splice(index, 1);
  //   }
  // }
}
