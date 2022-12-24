import { Component, OnDestroy, OnInit} from "@angular/core";
import { Post } from "../post.module";
import { PostsService } from "../../posts/posts.service";
import{Subscription} from 'rxjs';
import { MatPaginator, PageEvent} from "@angular/material/paginator";
import { MatSort} from "@angular/material/sort";


@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit, OnDestroy{
  title = 'my-project';
  posts: Post[]=[];
  private postsSub: Subscription;

constructor(public postsService: PostsService){

}
// ngOnInit
ngOnInit(){
  this.postsService.getPosts();
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


}
