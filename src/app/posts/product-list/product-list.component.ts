import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { UserService } from 'src/app/user.service';



@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy{
  title = 'my-project';
  displayedColumns: string[] = [
    'title',
     'selectedValue',
      'price',
      'desc',
    'quantity'];

totalPosts=50;
postsPerPage=10;
total:number;
  userCartData:any;
  constructor(private cartservice:UserService){}
  ngOnInit(){
    this.total= this.cartservice.getTotalPrice()
    this.userCartData=this.cartservice.getCart()
  }
  ngOnDestroy(): void {
  }

}
