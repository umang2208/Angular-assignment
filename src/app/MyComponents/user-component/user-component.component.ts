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
    this.userCompleteDetails();
  }

    userCompleteDetails(){

      this.loader = true;
      this.userData.users().subscribe(async (data)=>{
        this.users = data;
        for( let i = 0;i< this.users.length;i+=1){
          const singleUser = this.users[i];
// console.log(singleUser);
          const arr  = await Promise.all([
            this.usersPost(singleUser.ele.id),
            this.usersAlbum(singleUser.ele.id),
            this.usersTodo(singleUser.ele.id),
          ]);
          console.log("first-line");
          console.log(arr);
          this.users[i]["postCount"]= arr[0];
          this.users[i]["AlbumCount"]= arr[1];
          this.users[i]["completeTodoount"]= arr[2];
          // this.users[i]["incompleteTodoount"]= arr[2].incomplete;
        }
        
        
        this.loader = false;
      // console.log("inside user-component");
      
      // console.log(this.users);
      });
    }
    usersPost(userId: number){
      console.log("second-line");

    return new Promise((resolve, reject)=>{

      this.userData.post(userId.toString()).subscribe((data)=>{
        console.log(data.length);
        resolve(data.length);
      });
     });
    }
    usersAlbum(userId: number){
      return new Promise((resolve,reject)=>{
        this.userData.ablum(userId.toString()).subscribe((data)=>{
          resolve(data.length);
        })

      });
    }
    usersTodo(userId: number){
      return new Promise((resolve,rejcet)=>{

        this.userData.todo(userId.toString()).subscribe((data)=>{
          let complete = 0, incomplete =0;
          for(let i = 0 ;i<data.length;i+=1){
            // console.log(data);
            if(data[i].completed){
              complete+=1;
            }
            else{
              incomplete+=1;
            }
          }
          // console.log(complete,incomplete);
          resolve ({complete,incomplete});
        })
      });
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


