import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponentComponent } from './MyComponents/user-component/user-component.component';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserDetailsComponent } from './MyComponents/user-details/user-details.component';
import { PostDetailsComponent } from './MyComponents/post-details/post-details.component';
import { CommentDetailsComponent } from './MyComponents/comment-details/comment-details.component';
import { TodoDetailsComponent } from './MyComponents/todo-details/todo-details.component';
import { BackBtnComponent } from './MyComponents/back-btn/back-btn.component';
import { AlbumPhotosComponent } from './MyComponents/album-photos/album-photos.component';
import { AlbumsComponent } from './MyComponents/albums/albums.component';
import { LoaderComponent } from './MyComponents/loader/loader.component';
// import { PaginationComponent } from './MyComponents/pagination/pagination.component';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [
    AppComponent,
    UserComponentComponent,
    UserDetailsComponent,
    PostDetailsComponent,
    CommentDetailsComponent,
    TodoDetailsComponent,
    BackBtnComponent,
    AlbumPhotosComponent,
    AlbumsComponent,
    LoaderComponent,
    // PaginationComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
