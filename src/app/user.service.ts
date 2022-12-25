import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {

cartItems=[]
  constructor(private _http:HttpClient) { }
  addTocart(cartData:any){
    this.cartItems.push(cartData)

  }
  getCart(){
   return this.cartItems;
  }
}
