import { Injectable } from "@angular/core";
import { HttpClient} from '@angular/common/http';
import { Subject } from "rxjs";

import { Post } from "./post.module";
@Injectable({providedIn:'root'})
export class PostsService
{
  private posts: Post[]= [];
  private postUpdated= new Subject<Post[]>();

  constructor(private http: HttpClient){}

  getPosts(){
    this.http.get<{message:string, posts:Post[]}>('http://localhost:3000/api/posts')
    .subscribe((postData)=>{this.posts=postData.posts;
        this.postUpdated.next([...this.posts]);
    });

  }
  getPostUpdateListener(){
    return this.postUpdated.asObservable();

  }
  addPost(title:string, content:string, startDate: Date, selectedValue:string, price:number, desc:string, selectedOrigin:string, favoriteSeason:string){
    const post: Post={id: null,title:title,content:content, startDate:startDate, selectedValue:selectedValue, price:price, desc:desc, selectedOrigin:selectedOrigin, favoriteSeason:favoriteSeason};
    this.http.post<{message:string}>("http://localhost:3000/api/posts",post)
    .subscribe(( responseData)=>
    {
     console.log(responseData.message);
     this.posts.push(post);
     this.postUpdated.next([...this.posts]);
    });


  }
}
