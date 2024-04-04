import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  loginUrl: string = environment.baseUrl + environment.login;

  userDetails: string = environment.baseUrl + environment.user_detail;

  allproducts: string = environment.baseUrl + environment.all_products

  constructor(private http: HttpClient) {}

  getUserDetails() {
    return this.http.get(this.userDetails);
  }

  getUserProfile(token: string) {
    const url = environment.getAddressUrl;

    // Construct headers
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    // Make the GET request
    return this.http.get<any>(url, {
      headers,
    });
  }

  updateUserDetails(userId: any, token: any, newData: any) {
    const url = `http://localhost:1337/api/users/${userId}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http.put<any>(url, newData, { headers });
  }

  addNewAddress(addressData: any) {
    const url = environment.userAddressUrl;
    const token = JSON.parse(localStorage.getItem('token') || '');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.post(url, { data: addressData }, { headers });
  }

  updateAdress(addressData: any){
    // const updateAddressUrl = environment.updateAddressUrl;
  }

  getAllStates() {
    return this.http.get<any>(environment.getAllStatesUrl);
  }
  getCityById(stateId: any) {
    return this.http.get<any>(environment.getCityByStateUrl + stateId);
  }



  // for getting products =====================================

  getAllProducts(){
    return this.http.get(this.allproducts);
  }
}
