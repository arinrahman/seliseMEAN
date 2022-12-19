import { Component, OnDestroy, OnInit} from "@angular/core";
import { Post } from "../../post.module";
import { PostsService } from "../../posts.service";
import{Subscription} from 'rxjs';




@Component(
  {
    selector:'app-post-list',
    templateUrl:'./post-list.component.html',
    styleUrls: ['./post-list.component.css']
  }
)
export class PostListComponent implements OnInit, OnDestroy{
  /**
   posts=[
  {title:'First Title', content: 'First Content'},
  {title:'First Title', content: 'First Content'},
  {title:'First Title', content: 'First Content'}
];
   */



posts: Post[]=[];
private postsSub: Subscription;

constructor(public postsService: PostsService){

}
ngOnInit(){
  this.posts= this.postsService.getPosts();
  this.postsSub= this.postsService.getPostUpdateListener()
  .subscribe((posts: Post[])=>
  {
    this.posts= posts;
  });



}

ngOnDestroy(): void {
  this.postsSub.unsubscribe();

}


}
