import { Injectable } from "@angular/core";
import { HttpClient} from '@angular/common/http';
import { Subject } from "rxjs";
import{map} from 'rxjs/operators'
import { Post } from "./post.module";
import { response } from "express";
@Injectable({providedIn:'root'})
export class PostsService
{
private posts: Post[]= [];
private postUpdated= new Subject<Post[]>();

constructor(private http: HttpClient){}
//getPosts

  getPosts(postsPerPage:number, currentPage: number){
    const queryParams=`?pagesize=$(postsPerPage)&page=$(currentPage)`;
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
          favoriteSeason: post.favoriteSeason,
          imageURL: post.imageURL,
          quantity: post.quantity
        };
      });
    }))
    .subscribe((transformedPosts)=>{
      this.posts=transformedPosts;
        this.postUpdated.next([...this.posts]);
    });

  }

  //getPostUpdateListener
  getPostUpdateListener(){
    return this.postUpdated.asObservable();
  }

  //addPost
  addPost(title:string, content:string, startDate: Date, selectedValue:string, price:number, desc:string, selectedOrigin:string, favoriteSeason:string, imageURL:string,  quantity:number){
    const post: Post={id: null,title:title,content:content, startDate:startDate, selectedValue:selectedValue, price:price, desc:desc, selectedOrigin:selectedOrigin, favoriteSeason:favoriteSeason, imageURL:imageURL, quantity:quantity};
    this.http.post<{message:string, postId: string}>("http://localhost:3000/api/posts",post)
    .subscribe(( responseData)=>
    {
    const id= responseData.postId;
    post.id= id;
     this.posts.push(post);
     this.postUpdated.next([...this.posts]);
    });
  }
//deletePost
  deletePost(postId:string){
    this.http.delete("http://localhost:3000/api/posts/"+ postId)
    .subscribe(
      ()=>
      {const updatedPosts=this.posts.filter(post=>post.id!==postId);
      this.posts= updatedPosts;
    this.postUpdated.next([...this.posts]);
  }
    );
  }
 //getPost
  getPost(id:string){
    return this.http.get<{_id:string, title:string, content:string, startDate: Date, selectedValue:string, price:number, desc:string, selectedOrigin:string, favoriteSeason:string, imageURL:string, quantity: number}>("http://localhost:3000/api/posts/"+ id);
  }
  //updatePost
  updatePost(  id:string,
    title: string,
    content: string,
    startDate: Date,
    selectedValue:string,
    price:number,
    desc: string,
    selectedOrigin:string,
    favoriteSeason:string,
    imageURL: string,
    quantity: number){

      const post: Post={
        id:id,
        title:title,
        content: content,
        startDate: startDate,
        selectedValue: selectedValue,
        price:price,
        selectedOrigin: selectedOrigin,
        desc:desc,
        favoriteSeason:favoriteSeason,
        imageURL: imageURL,
        quantity: quantity

      };
      this.http.put("http://localhost:3000/api/posts/"+id,post)
      .subscribe(
        response=>{
          const updatedPosts=[...this.posts];
          const oldPostIndex= updatedPosts.findIndex(
            p=>p.id===post.id
          );
          updatedPosts[oldPostIndex]= post;
          this.posts=updatedPosts;
          this.postUpdated.next([...this.posts]);

        }
      );

  }
//end
}
