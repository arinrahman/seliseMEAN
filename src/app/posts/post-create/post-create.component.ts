import { Component, EventEmitter, OnInit} from "@angular/core";
import { FormControl, FormGroup, Validators} from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Post } from "../post.module";
import { PostsService } from "../posts.service";
interface Food {
  value: string;
  viewValue: string;
}
interface Origin {
  value: string;
  viewValue: string;
}
interface Fav {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit{
  foods: Food[] = [
    {value: 'Makeup', viewValue: 'Makeup'},
    {value: 'Skincare', viewValue: 'Skincare'},
    {value: 'Baby Products', viewValue: 'BabyProducts'},
  ];

  origins: Origin[] = [
    {value: 'Bangladesh', viewValue: 'Bangladesh'},
    {value: 'USA', viewValue: 'USA'},
    {value: 'Korea', viewValue: 'Korea'},
  ];
  favs: Fav[] = [
    {value: 'Day', viewValue: 'Day'},
    {value: 'Night', viewValue: 'Night'},
    {value: 'Day/Night', viewValue: 'Day/Night'},
  ];
  private mode='post-create';
  private postId:string;
  post: Post;
  isLoading= false;
  form:FormGroup;
constructor(public postsService: PostsService, public route: ActivatedRoute){
}
ngOnInit(){
  this.form= new FormGroup(
    {
      'title': new FormControl(null, {validators: [Validators.required, Validators.minLength(3), Validators.maxLength(50)]
      }),
      'content': new FormControl(null, {validators: [Validators.required, Validators.minLength(3), Validators.maxLength(50)]
      }),
      'selectedValue': new FormControl(null, {validators: [Validators.required]
      }),
      'price': new FormControl(null, {validators: [Validators.required, Validators.min(0)]
      }),
      'desc': new FormControl(null,{validators: [Validators.minLength(3), Validators.maxLength(250)]
      }
      ),
      'favoriteSeason': new FormControl(null, {validators: [Validators.required]
      }),
      'startDate': new FormControl(null, {validators: [Validators.required]
      }),
      'selectedOrigin': new FormControl(null, {validators: [Validators.required]
      }),
      'imageURL': new FormControl(null
      ),
      'quantity': new FormControl(null, {validators: [Validators.min(0)]
      }),
    }

);
  this.route.paramMap.subscribe((paramMap: ParamMap)=>{
    if(paramMap.has('postId')){
      this.mode='edit';
      this.postId = paramMap.get('postId');
      this.isLoading=true;
      this.postsService.getPost(this.postId).subscribe(postData=>
   { this.isLoading=false;
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
    this.form.setValue({
      'title': this.post.title,
      'content': this.post.content,
      'selectedOrigin': this.post.selectedOrigin,
     ' selectedValue':this.post.selectedValue,
     ' price': this.post.price,
     'desc': this.post.desc,
      'startDate': this.post.startDate,
      'favoriteSeason': this.post.favoriteSeason,
     ' imageURL': this.post.imageURL,
      'quantity': this.post.quantity
    });

      });
    }else{
      this.mode = 'post-create';
      this.postId = null;
    }
  });

}
  onSavePost()
  {
    if(this.form.invalid){
      return;
    }

     if(this.mode==="post-create")
    {
      this.postsService.addPost(
        this.form.value.title,
        this.form.value.content,
        this.form.value.startDate,
        this.form.value.selectedValue,
        this.form.value.price,
        this.form.value.desc,
        this.form.value.selectedOrigin,
        this.form.value.favoriteSeason,
        this.form.value.imageURL,
        this.form.value.quantity
        );
      alert("You succesfully added a product!")

    }
    else{
      this.postsService.updatePost(this.postId,
        this.form.value.title,
        this.form.value.content,
        this.form.value.startDate,
        this.form.value.selectedValue,
        this.form.value.price,
        this.form.value.desc,
        this.form.value.selectedOrigin,
        this.form.value.favoriteSeason,
        this.form.value.imageURL,
        this.form.value.quantity);
      alert("You succesfully editted a product!")
    }
    this.form.reset();

  }
}
