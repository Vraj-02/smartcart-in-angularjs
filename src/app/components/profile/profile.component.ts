import { Component,OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { NgFor } from '@angular/common';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(
    private userService: UserService,
    private orderService: OrderService
  ) {}
 

  userdata:any = [];

  newaddress:any[]= [{}];
 
  state = 'Gujarat';
 
  isEditMode = false;
  isPhoneEditMode = false;
  showUpdateForm = false;


  orders: any[] = [
    { orderId: 1, date: new Date(), totalAmount: 500.25, status: 'Completed' },
    { orderId: 2, date: new Date(), totalAmount: 750.60, status: 'Processing' },
    { orderId: 3, date: new Date(), totalAmount: 300.00, status: 'Cancelled' },
  ];


  toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
    if(!this.isEditMode){
      this.createAddress();
      }
  }

  togglePhoneEditMode(): void {
    
    this.isPhoneEditMode = !this.isPhoneEditMode;
    if(!this.isPhoneEditMode){
    this.updateUserPhone();
    }
  
  }
 
  ngOnInit(): void {   
    this.getUserProfile();
    this.getOrderHistory();
  }

  getUserProfile() {
    let token = JSON.parse(localStorage.getItem('token') || '');

    this.userService.getUserProfile(token).subscribe({
      next: (res: any) => {
        console.log(res);
        this.userdata= res;
        console.log(this.userdata)
      },
      error: (error: any) => {
        console.table(error);
      },
    });
  }

  updateUserPhone(){
    let token = JSON.parse(localStorage.getItem('token') || '');
    const userId = localStorage.getItem('user_id')
    
    const cred = 
          {
            "mobile_number": this.userdata.mobile_number
          }
    this.userService.updateUserDetails(userId,token,cred).subscribe({
      next: (response) => {
        alert('User details updated successfully');
        this.getUserProfile();
      },
      error: (error) => {
        console.log(error)
      },
    });
  }

  // try(){
  //   const userId = localStorage.getItem('user_id')
  //   const addressCred ={
  //     user_details: userId,
  //     address_line_1:this.newaddress[0].address_line_1,
  //     address_line_2: this.newaddress[0].address_line_2,
  //     landmark: this.newaddress[0].landmark,
  //     isDefault: false, 
  //     city: parseInt(this.newaddress[0].city_id),
  //   }
  //   console.log(addressCred);
  // }

  createAddress() {
    const userId = localStorage.getItem('user_id')
    console.log('hello')

    const addressCred ={
      user_details: userId,
      address_line_1:this.newaddress[0].address_line_1,
      address_line_2: this.newaddress[0].address_line_2,
      landmark: this.newaddress[0].landmark,
      isDefault: false, 
      city:parseInt(this.newaddress[0].city_id),
    }
    console.log(addressCred);

    this.userService.addNewAddress(addressCred).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  updateAddress(){

  }


// ============orders history==========================
  allorderItems: any = [];
  // orderItems: any =[];

  getOrderHistory(){
    const userId = localStorage.getItem('user_id')
    this.orderService.getOrders().subscribe(
      (response: { data: any }) => {
        this.allorderItems = response.data;
        console.log(this.allorderItems);
        this.allorderItems = this.allorderItems.filter((item:any) => item.attributes.user_details.data.id == userId);
        console.log(this.allorderItems);
      },
      (error: any) => {
        console.error('Error fetching orders:', error);
      }  
    );
   
  }
 
}
