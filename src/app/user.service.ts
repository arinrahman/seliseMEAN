import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {

cartItems=[]
total:number;
  constructor(private _http:HttpClient) { }
  addTocart(cartData:any){
    this.cartItems.push(cartData)

  }
  getCart(){
   return this.cartItems;
  }
  getTotalPrice() {
    let total = 0;
    for (const item of this.cartItems) {
      total += item.quantity*item.price;
    }
    this.total = total;
    return total;
  }

}
