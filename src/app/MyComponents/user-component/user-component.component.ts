import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faL, faSignsPost} from '@fortawesome/free-solid-svg-icons';
import { faFaceLaughBeam} from '@fortawesome/free-solid-svg-icons';
import { faBarChart} from '@fortawesome/free-solid-svg-icons';

import { APIServicesService } from 'src/app/MyServices/api-services.service';

@Component({
  selector: 'app-user-component',
  templateUrl: './user-component.component.html',
  styleUrls: ['./user-component.component.css']
})
export class UserComponentComponent implements OnInit {

  constructor(
    private userData:APIServicesService, 
    private router:Router,
    private route: ActivatedRoute) { }
  users!: any[];
  todo!: any;
  RequirePost: any[] = [];
  CompleteTodos: any[]= [];
  NotCompleteTodos : any[] = [];
  loader : boolean = false;

 

 faPost = faSignsPost;
 facomment = faFaceLaughBeam;
 faBar = faBarChart;
  
  ngOnInit(): void {
    this.loader = true;
    // setTimeout(() => {
      // console.log("timeOut");
      this.userData.users().subscribe((data)=>{
        this.users = data;
      console.log("inside user-component");
      this.loader = false;
      //  console.log(this.users);
      //  console.log("first");
      //  for(let i = 0 ;i< this.users.length;i+=1)
      //  this.todo = this.fetchPost(+this.users[i].id);
      });
    // }, 2000);
   

  }
  ImageClick(userID: number){
    // console.log(userID + "calliing...");
    this.router.navigate([`user-details/${userID}`]);
  }
  PostIcon(userID: number){
   this.router.navigate([`users/${userID}/posts`]);
  }
  albumIcon(userID: number){
    this.router.navigate([`users/${userID}/albums`]);
   }
   todoIcon(userID: number){
    this.router.navigate([`users/${userID}/todos`]);
   }


  //  fetchPost(  id : number ) {
    
  //   this.userData.todo(id.toString()).subscribe((data) => {
  //     this.todo = data;

  //     for (let i = 0; i < this.todo.length; i += 1) {
  //       if (this.todo[i].userId === +id) {
  //         this.RequirePost.push(this.todo[i]);
  //       }
  //     }
  //     console.log(this.RequirePost);
  //     for( let  i=0 ;i< this.RequirePost.length; i+=1){
  //       if(this.RequirePost[i].completed ){
  //         this.CompleteTodos.push(this.RequirePost[i]);
  //       }
  //       else{
  //         this.NotCompleteTodos.push(this.RequirePost[i]);
  //       }
  //     }
  //     console.log(this.CompleteTodos);

      
  //   });
  // }

}


