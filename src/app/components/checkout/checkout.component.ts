import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  checkoutItems: any[] = [];
  userdataforcheckout: any =[]

  constructor(
    private router: Router,
    private auth: AuthService,
    private cartService: CartService,
    private userService: UserService,
    private orderService: OrderService,
  ) {}

  ngOnInit() {
    const userId = localStorage.getItem('user_id');
    // this.isLoggedIn = this.auth.getAuthStatus();
    this.getCartItems(userId);
    this.getUserProfile();
  }
  getUserProfile() {
    let token = JSON.parse(localStorage.getItem('token') || '');

    this.userService.getUserProfile(token).subscribe({
      next: (res: any) => {
        console.log(res);
        this.userdataforcheckout= res;
      },
      error: (error: any) => {
        console.table(error);
      },
    });
  }
  getUniqueCartItems() {
    this.checkoutItems = this.checkoutItems.reduce((prev, cur) => {
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

  getCartItems(userId: any) {
    this.cartService.getCartItems(userId).subscribe({
      next: (response) => {
        this.checkoutItems = response.data;
        // console.log(this.checkoutItems);
        this.getUniqueCartItems();
        console.log(this.checkoutItems);
      },
      error: (error) => {
        console.error('Error fetching cart items:', error);
      },
    });
  }

itemTotal:number = 0
  calculateItemTotal(qnt:number,pri:number){
    this.itemTotal=qnt*pri;
    return this.itemTotal;
  }

  // Method to calculate total price
  totalwithoutTax:number=0
  calculateTax(){
    let total = 0;
    let tax = 0;
    for (const product of this.checkoutItems) {
      total +=  product.attributes.product.data.attributes.price* product.attributes.quantity ;
    }
    tax = total*0.18;

    return tax;
  }

 tax:number = 0;
 shipping:number = 50;
 subTotal:number = 0;
  

  getTotalPrice():number {
    // let tax:number = 0;
    let total:number = 0;
    // let subTotal:number = 0;
    // let shipping:number = 50;
    for (const product of this.checkoutItems) {
      total +=  product.attributes.product.data.attributes.price* product.attributes.quantity ;
    }
    this.tax = total*0.18;

    this.subTotal = total + this.tax + this.shipping;

    return this.subTotal
  }
  placeOrder(): void { 

    const userId = JSON.parse(localStorage.getItem('user_id') || '');
    
    const data = {
      data: {
      order_date: new Date(),
      order_status: 'Placed,',
      order_status_update_at: new Date(),
      tax_amount: this.tax,
      total_amount: this.subTotal,
      payable_amount: this.subTotal,
      carts: this.checkoutItems,
      order_items: this.checkoutItems,
      user_details: userId,
      },
    };

    this.orderService.placeOrder(data).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}

