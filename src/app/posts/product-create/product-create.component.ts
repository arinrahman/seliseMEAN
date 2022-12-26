import { Component, NgModule, OnDestroy, OnInit} from "@angular/core";
import { Post } from "../post.module";
import { PostsService } from "../../posts/posts.service";
import{Subscription} from 'rxjs';
import { MatPaginator, PageEvent} from "@angular/material/paginator";
import { MatSort} from "@angular/material/sort";
import { Router } from '@angular/router';
import { UserService } from "src/app/user.service";
import { NgModel } from "@angular/forms";


@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit, OnDestroy{
  title = 'my-project';
  posts: Post[]=[];
  private postsSub: Subscription;
  counter: number=0;
  cartItems=[]
constructor(public postsService: PostsService,private router: Router,private cartService:UserService){

}
// ngOnInit
ngOnInit(){
  this.postsService.getPostss();
  this.postsSub= this.postsService.getPostUpdateListener()
  .subscribe((posts: Post[])=>
  {
    this.posts= posts;
  });
}

//onDelete
onDelete(postId:string){
  this.postsService.deletePost(postId);

}
//ngOnDestroy
ngOnDestroy(): void {

  this.postsSub.unsubscribe();
}

//onChangedPage
onChangedPage(pageData:PageEvent){
  console.log(pageData);
}
//end
// Add to cart

addToCart(cartItem){
localStorage.setItem('userCart',JSON.stringify(cartItem));
  this.cartService.addTocart(cartItem)
this.router.navigate(["/product-list"]);

}
updatestock(){

}

}
