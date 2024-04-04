import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  productById(productId: any) {
    let productDetailUrl = `${this.baseUrl}api/products/${productId}?populate[product_image][fields][1]=url`;
    return this.http.get(productDetailUrl);
  }
}
