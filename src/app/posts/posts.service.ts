import { Injectable } from "@angular/core";
import { HttpClient} from '@angular/common/http';
import { Subject } from "rxjs";
import{map} from 'rxjs/operators'

import { Post } from "./post.module";
@Injectable({providedIn:'root'})
export class PostsService
{
  private posts: Post[]= [];
  private postUpdated= new Subject<Post[]>();

  constructor(private http: HttpClient){}

  getPosts(){
    this.http.get<{message:string, posts:any}>('http://localhost:3000/api/posts')
    .pipe(map((postData)=>{
      return postData.posts.map(post=>{
        return{

          id:post._id,
          title: post.title,
          content: post.content,
          startDate: post.startDate,
          selectedValue: post.selectedValue,
          price:post.price,
          desc: post.desc,
          selectedOrigin:post.selectedOrigin,
          favoriteSeason: post.favoriteSeason

        };
      });

    }))
    .subscribe((transformedPosts)=>{
      this.posts=transformedPosts;
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
  deletePost(postId:string){
    this.http.delete("http://localhost:3000/api/posts/"+ postId)
    .subscribe(
      ()=>
      {console.log("Deleted!");}
    );
  }
}
