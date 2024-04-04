import { Component } from '@angular/core';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent {
  wishlistItems: any[] = []; // Array to store wishlist items

  // Method to remove item from wishlist
  removeItem(item: any): void {
    const index = this.wishlistItems.indexOf(item);
    if (index !== -1) {
      this.wishlistItems.splice(index, 1);
    }
  }

}
