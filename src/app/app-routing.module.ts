import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumPhotosComponent } from './MyComponents/album-photos/album-photos.component';
import { AlbumsComponent } from './MyComponents/albums/albums.component';
// import { CommentDetailsComponent } from './MyComponents/comment-details/comment-details.component';
import { PostDetailsComponent } from './MyComponents/post-details/post-details.component';
import { TodoDetailsComponent } from './MyComponents/todo-details/todo-details.component';
import { UserComponentComponent } from './MyComponents/user-component/user-component.component';
import { UserDetailsComponent } from './MyComponents/user-details/user-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: 'users', component: UserComponentComponent },
  { path: 'user-details/:userID', component: UserDetailsComponent },
  { path: 'users/:userID/posts', component: PostDetailsComponent },
  { path: 'users/:userID/albums', component: AlbumsComponent },
  { path: 'users/:userID/todos', component: TodoDetailsComponent },
  // { path: 'posts/:userID/comments', component: CommentDetailsComponent },
  { path: 'users/:userID/albumPhotos/:albumId', component: AlbumPhotosComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
  snapshot: any;
}
