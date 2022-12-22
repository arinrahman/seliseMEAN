import { Component, OnDestroy, OnInit} from "@angular/core";
import { Post } from "../../post.module";
import { PostsService } from "../../posts.service";
import{Subscription} from 'rxjs';
import { MatPaginator, PageEvent} from "@angular/material/paginator";
import { MatSort} from "@angular/material/sort";






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



displayedColumns: string[] = ['title', 'content', 'selectedValue', 'price', 'desc', 'favoriteSeason', 'startDate', 'selectedOrigin', 'selectedDelete', 'selectedEdit'];


posts: Post[]=[];
totalPosts=50;
postsPerPage=10;
private postsSub: Subscription;

constructor(public postsService: PostsService){

}
ngOnInit(){
  this.postsService.getPosts();
  this.postsSub= this.postsService.getPostUpdateListener()
  .subscribe((posts: Post[])=>
  {
    this.posts= posts;
  });




}
onDelete(postId:string){
  this.postsService.deletePost(postId);

}
ngOnDestroy(): void {
  this.postsSub.unsubscribe();

}
onChangedPage(pageData:PageEvent){
  console.log(pageData);
}



}
