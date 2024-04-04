import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) {}

  placeOrder(orderData: any) {
    const token = JSON.parse(localStorage.getItem('token') || '');
    return this.http.post<any>(environment.orderUrl, orderData, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }),
    });
  }

  getOrders(): any {
    const token = JSON.parse(localStorage.getItem('token') || '');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<any>('http://localhost:1337/api/orders?fields=%2A&populate=%2A', { headers });
  }


}
