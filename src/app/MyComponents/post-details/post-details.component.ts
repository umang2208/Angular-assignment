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
   ngOnInit() {
    this.loader = true;
    this.PostData.users().subscribe((data)=>{
      this.user = data;
    });
    this.post =  this.fetchPost();
  }
   fetchPost() {
    this.id = this.route.snapshot.params['userID'];
    this.PostData.post(this.id.toString()).subscribe(async(data) => {
      this.post = data;

      this.RequirePost = this.post;
      for(let i= 0;i<this.RequirePost.length;i+=1){
        const signlePost = this.RequirePost[i];
      console.log("single", signlePost.id);
        const arr = await Promise.all([
          this.postComm(signlePost.id)
        ]);
        console.log("calling second");
        console.log(arr);
        this.RequirePost[i]['comment'] = arr;
        this.RequirePost[i]['showComment'] = false;
      }
      console.log( "require", this.RequirePost);
      
      this.loader = false;
    });

  }

   postComm(commId:number){
    return new Promise((resolve, reject) => {
      this.PostData.comment(commId.toString()).subscribe(
        (data: any) => {
        
          resolve(data);
        }
      );
    });
   
  }
  

  userDetail(userID: number){
    this.router.navigate([`user-details/${userID}`]);
   }
   isShow : boolean = false;
  commentClick(userID: number){
    // alert(this.RequirePost[userID].showComment);
    // alert(userID);
    // console.log(userID," hy");
    let customizeUserId =( userID % 10) == 0? 9 : (userID % 10 )-1;
    console.log(this.RequirePost[customizeUserId]);
    // this.isShow = !this.isShow;
    this.RequirePost[customizeUserId].showComment = ! this.RequirePost[customizeUserId].showComment;
  
   }
   pageSize = 5;
   pageSizes = [ 5,10,20];
   count: number =0;
   page : number = 1;
   onPageChange(event:any){
     this.page = event;
     this.post();
   }
   onPageSizeChange(event:any):void{
     this.pageSize = event.target.value;
     this.page = 1;
     this.post();
   }
}
