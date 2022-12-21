import { Component, EventEmitter} from "@angular/core";
import { NgForm } from "@angular/forms";
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

export class PostCreateComponent{
  labelPosition: 'before' | 'after' = 'after';

  startDate = new Date();
  selectedValue: string;
  selectedOrigin:string;
  favoriteSeason: string;
  seasons: string[] = ['Day', 'Night'];

  foods: Food[] = [
    {value: 'makeup', viewValue: 'Makeup'},
    {value: 'skincare', viewValue: 'Skin care'},

  ];
  places: Place[] = [
    {value: 'Bangladesh', viewValue: 'Bangladesh'},
    {value: 'USA', viewValue: 'USA'},

  ];





constructor(public postsService: PostsService){

}
  onAddPost(form: NgForm){
    if(form.invalid){
      return;
    }

    this.postsService.addPost(form.value.title,form.value.content, form.value.startDate, form.value.selectedValue, form.value.price, form.value.desc, form.value.selectedOrigin, form.value.favoriteSeason);
    alert("You succesfully added a product!")

  }



}
