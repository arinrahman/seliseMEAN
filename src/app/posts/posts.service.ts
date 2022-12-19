import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

import { Post } from "./post.module";
@Injectable({providedIn:'root'})
export class PostsService
{
  private posts: Post[]= [];
  private postUpdated= new Subject<Post[]>();

  getPosts(){
    return [...this.posts];

  }
  getPostUpdateListener(){
    return this.postUpdated.asObservable();
  }
  addPost(title:string, content:string, startDate: Date, selectedValue:string, price:number, desc:string, selectedOrigin:string, favoriteSeason:string){
    const post: Post={title:title,content:content, startDate:startDate, selectedValue:selectedValue, price:price, desc:desc, selectedOrigin:selectedOrigin, favoriteSeason:favoriteSeason};
    this.posts.push(post);
    this.postUpdated.next([...this.posts]);

  }
}
