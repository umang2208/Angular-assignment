import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumPhotosComponent } from './MyComponents/album-photos/album-photos.component';
import { AlbumsComponent } from './MyComponents/albums/albums.component';
import { CommentDetailsComponent } from './MyComponents/comment-details/comment-details.component';
import { PostDetailsComponent } from './MyComponents/post-details/post-details.component';
import { TodoDetailsComponent } from './MyComponents/todo-details/todo-details.component';
import { UserComponentComponent } from './MyComponents/user-component/user-component.component';
import { UserDetailsComponent } from './MyComponents/user-details/user-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: 'users', component: UserComponentComponent },
  { path: 'user-details/:userID', component: UserDetailsComponent },
  { path: 'posts/:userID', component: PostDetailsComponent },
  { path: 'album/:userID', component: AlbumsComponent },
  { path: 'todo/:userID', component: TodoDetailsComponent },
  { path: 'comments/:userID', component: CommentDetailsComponent },
  { path: 'albumPhotos/:userID', component: AlbumPhotosComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
  snapshot: any;
}
