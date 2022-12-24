import { Component, EventEmitter, OnInit} from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Post } from "../post.module";
import { PostsService } from "../posts.service";
interface Food {
  value: string;
  viewValue: string;
}

interface Place {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})

export class PostCreateComponent implements OnInit{
  labelPosition: 'before' | 'after' = 'after';
  startDate = new Date();
  selectedValue: string;
  selectedOrigin:string;
  favoriteSeason: string;
  private mode='post-create';
  private postId:string;
  post: Post;

  seasons: string[] = ['Day', 'Night'];

  foods: Food[] = [
    {value: 'makeup', viewValue: 'Makeup'},
    {value: 'skincare', viewValue: 'Skin care'},

  ];
  places: Place[] = [
    {value: 'Bangladesh', viewValue: 'Bangladesh'},
    {value: 'USA', viewValue: 'USA'},

  ];
constructor(public postsService: PostsService, public route: ActivatedRoute){

}
ngOnInit(){
  this.route.paramMap.subscribe((paramMap: ParamMap)=>{
    if(paramMap.has('postId')){
      this.mode='edit';
      this.postId = paramMap.get('postId');
      this.postsService.getPost(this.postId).subscribe(postData=>
   {
    this.post={
      id: postData._id,
      title: postData.title,
      content: postData.content,
      selectedOrigin: postData.selectedOrigin,
      selectedValue:postData.selectedValue,
      price: postData.price,
      desc: postData.desc,
      startDate: postData.startDate,
      favoriteSeason: postData.favoriteSeason,
      imageURL: postData.imageURL,
      quantity: postData.quantity

    };
   }     );
    }else{
      this.mode = 'post-create';
      this.postId = null;
    }
  });

}
  onSavePost(form: NgForm)
  {
    if(form.invalid){
      return;
    }
     if(this.mode==="post-create")
    {
      this.postsService.addPost(form.value.title,form.value.content, form.value.startDate, form.value.selectedValue, form.value.price, form.value.desc, form.value.selectedOrigin, form.value.favoriteSeason, form.value.imageURL, form.value.quantity);
      alert("You succesfully added a product!")

    }
    else{
      this.postsService.updatePost(this.postId, form.value.title,form.value.content, form.value.startDate, form.value.selectedValue, form.value.price, form.value.desc, form.value.selectedOrigin, form.value.favoriteSeason, form.value.imageURL, form.value.quantity);
      alert("You succesfully editted a product!")
    }

  }
}
