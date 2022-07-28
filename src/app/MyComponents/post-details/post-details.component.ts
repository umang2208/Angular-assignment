import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faUser} from '@fortawesome/free-solid-svg-icons';
import { faCommenting} from '@fortawesome/free-solid-svg-icons';

import { AppRoutingModule } from 'src/app/app-routing.module';

import { APIServicesService } from 'src/app/MyServices/api-services.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css'],
})
export class PostDetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private PostData: APIServicesService,
    private router: Router
  ) {}
  post!: any;
  user!: any;
  id: number = 0;
  RequirePost: any[] = [];
  author = faUser;
  cIcon = faCommenting;
  j: number = 0;
  loader : boolean = false;
  async ngOnInit(): Promise<void> {
    this.loader = true;
    this.PostData.users().subscribe((data)=>{
      this.user = data;
    console.log("inside user-component");
     console.log(this.user);
    
    });
    this.post = await this.fetchPost();
  }
  async fetchPost() {
    this.id = this.route.snapshot.params['userID'];
    this.PostData.post(this.id.toString()).subscribe((data) => {
      this.post = data;

      this.RequirePost = this.post;
      console.log(this.RequirePost);
      this.loader = false;
    });

  }
  userDetail(userID: number){
    this.router.navigate([`user-details/${userID}`]);
   }
  commentClick(userID: number){
    this.router.navigate([`posts/${userID}/comments`]);
   }
}
