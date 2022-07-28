import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { APIServicesService } from 'src/app/MyServices/api-services.service';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.css']
})
export class TodoDetailsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private PostData: APIServicesService
  ) {}
  post!: any;
  id: number = 0;
  RequirePost: any[] = [];
  CompleteTodos: any[]= [];
  NotCompleteTodos : any[] = [];
  loader : boolean = false;

  j: number = 0;
  async ngOnInit(): Promise<void> {
    this.loader = true;
    this.id = this.route.snapshot.params['userID'];

    this.post = await this.fetchPost();
  }
  async fetchPost() {
    this.PostData.todo().subscribe((data) => {
      this.post = data;
      console.log(this.post);
      for (let i = 0; i < this.post.length; i += 1) {
        if (this.post[i].userId === +this.id) {
          this.RequirePost.push(this.post[i]);
        }
      }
      console.log(this.RequirePost);
      for( let  i=0 ;i< this.RequirePost.length; i+=1){
        if(this.RequirePost[i].completed ){
          this.CompleteTodos.push(this.RequirePost[i]);
        }
        else{
          this.NotCompleteTodos.push(this.RequirePost[i]);
        }
      }
      console.log(this.CompleteTodos);

      this.loader = false;
    });
  }

}
