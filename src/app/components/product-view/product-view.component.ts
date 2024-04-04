import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDetailService } from '../../services/product-detail.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent {
  productDetail: any;
  quantity: number = 1;

  loading: boolean = false;
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private productDetailService: ProductDetailService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    this.loading = true;
    this.productDetailService.productById(productId).subscribe({
      next: (res: any) => {
        this.loading = false;
        this.productDetail = res.data;
      },
      error: (err: any) => {
        this.loading = false;
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


  navigateProduct() {
    this.router.navigate(['/product']);
  }
}
