import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { APIServicesService } from 'src/app/MyServices/api-services.service';
import { BackBtnService } from 'src/app/MyServices/back-btn.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  // router: any;
  constructor(
    private userData: APIServicesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  users!: any[];
  todo!: any;
  RequirePost: any[] = [];
  complete: number = 0;
  inomplete: number = 0;
  loader: boolean = false;
  id: number = 0;

  ngOnInit(): void {
    this.userCompleteDetails();
  }
/*************************************
   * -> fetching complete user details
   * *********************************** */
  userCompleteDetails() {
    this.loader = true;
    this.id = this.route.snapshot.params['userID'];

    this.userData.users().subscribe(async (data) => {
      //console.log("calling me first");
      try {
        this.users = data;
        for (let i = 0; i < this.users.length; i += 1) {
          const singleUser = this.users[i];
          const arr = await Promise.all([
            this.usersPost(singleUser.ele.id),
            this.usersAlbum(singleUser.ele.id),
            this.usersTodo(singleUser.ele.id),
          ]);
          //console.log("first-line");
          //console.log(arr);
          this.users[i]['postCount'] = arr[0];
          this.users[i]['AlbumCount'] = arr[1];
          this.users[i]['completeTodoount'] = arr[2];
          // this.users[i]["incompleteTodoount"]= arr[2].incomplete;
        }
        // console.log(this.users);
        //console.log("calling me second");
        this.loader = false;
      } catch (error: any) {
        this.loader = false;
        alert('Error ');
      }
    });
  }
  usersPost(userId: number) {
    //console.log("second-line");
    return new Promise((resolve, reject) => {
      this.userData.post(userId.toString()).subscribe(
        (data: any) => {
          //console.log(data.length);
          resolve(data.length);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
  usersAlbum(userId: number) {
    return new Promise((resolve, reject) => {
      this.userData.ablum(userId.toString()).subscribe(
        (data: any) => {
          resolve(data.length);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
  usersTodo(userId: number) {
    return new Promise((resolve, rejcet) => {
      this.userData.todo(userId.toString()).subscribe((data) => {
        let complete = 0,
          incomplete = 0;
        for (let i = 0; i < data.length; i += 1) {
          // //console.log(data);
          if (data[i].completed) {
            complete += 1;
          } else {
            incomplete += 1;
          }
        }
        // //console.log(complete,incomplete);
        resolve({ complete, incomplete });
      });
    });
  }

  /*************************************
   * ->  Routes
   * *********************************** */
  goToPost(userID: number) {
    this.router.navigate([`users/${userID}/posts`]);
  }
  goToAlbum(userID: number) {
    this.router.navigate([`users/${userID}/albums`]);
  }
  goToTodo(userID: number) {
    this.router.navigate([`users/${userID}/todos`]);
  }
}
