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
  total: number = 0;
displayedColumns: string[] = [
  'title',
  'content',
  'selectedValue',
   'price', 'desc',
    'favoriteSeason', 'startDate',
    'selectedOrigin', 'selectedDelete',
     'selectedEdit', 'imageURL'];
posts: Post[]=[];
totalPosts=10;
postsPerPage=2;
pageSizeOptions=[1,2,5,10];
currentPage=1;
private postsSub: Subscription; //did not add

constructor(public postsService: PostsService){

}
// ngOnInit
ngOnInit(){
  this.postsService.getPosts(this.postsPerPage,this.currentPage);
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
  this.currentPage= pageData.pageIndex+1;
  this.postsPerPage= pageData.pageSize;
  this.postsService.getPosts(this.postsPerPage,this.currentPage);
}
//end
}
