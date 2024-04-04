import { Component,OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  products: any = [];

  constructor(private userService: UserService, private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(){
    this.userService.getAllProducts().subscribe({
      next: (res: any) => {
        this.products = res.data;
        console.log(res);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  addToCart(productId: number): void {
    //check user login or not
    const isAuthenticated = localStorage.getItem('user_id') !== null;
    if (!isAuthenticated) {
      alert('Please login first.');
      return;
    }

    const cartItemPayload = {
      data: {
        product: productId,
        quantity: 1,
        user_detail: localStorage.getItem('user_id'),
      },
    };

    this.cartService.addCart(cartItemPayload).subscribe(
      (response: any) => {
        this.cartService.addToCartItems(productId);
      },
      (error: any) => {
        console.error('Error adding product to cart:', error);
      }
    );
  }

  productDetails(id: any) {
    this.router.navigate(['app-home/app-product-view/' + id]);
  }
}
  // products =[
  //   {
  //     imageUrl: '#',
  //     name:'apple',
  //     description: 'best in quality',
  //     price: 100
  //   }
  // ]



// product-list.component.ts
