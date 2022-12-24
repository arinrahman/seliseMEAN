import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { PostListComponent } from './posts/post-list/post-list.component.ts/post-list.component';
import { ProductCreateComponent } from './posts/product-create/product-create.component';

const routes: Routes = [
  {path:'post-create', component: PostCreateComponent},
  {path:'post-list', component: PostListComponent},
  {path:'header', component:HeaderComponent},
  {path:'edit/:postId', component: PostCreateComponent},
  {path: 'product-create', component: ProductCreateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

