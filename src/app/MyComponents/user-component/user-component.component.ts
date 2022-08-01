import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faL, faSignsPost } from '@fortawesome/free-solid-svg-icons';
import { faFaceLaughBeam } from '@fortawesome/free-solid-svg-icons';
import { faBarChart } from '@fortawesome/free-solid-svg-icons';

import { APIServicesService } from 'src/app/MyServices/api-services.service';

@Component({
  selector: 'app-user-component',
  templateUrl: './user-component.component.html',
  styleUrls: ['./user-component.component.css'],
})
export class UserComponentComponent implements OnInit {
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

  faPost = faSignsPost;
  facomment = faFaceLaughBeam;
  faBar = faBarChart;

  ngOnInit(): void {
    this.userCompleteDetails();
  }
  /*************************************
   * -> fetching complete user details
   * *********************************** */
  userCompleteDetails() {
    this.loader = true;
    this.userData.users().subscribe(async (data) => {
      try {
        this.users = data;
        for (let i = 0; i < this.users.length; i += 1) {
          const singleUser = this.users[i];
          // calling diff. apis for getting all type of data
          const arr = await Promise.all([
            this.usersPost(singleUser.ele.id),
            this.usersAlbum(singleUser.ele.id),
            this.usersTodo(singleUser.ele.id),
          ]);

          this.users[i]['postCount'] = arr[0];
          this.users[i]['AlbumCount'] = arr[1];
          this.users[i]['completeTodoount'] = arr[2];

          // this.users[i]["incompleteTodoount"]= arr[2].incomplete;
        }

        this.loader = false;
      } catch (error: any) {
        this.loader = false;
        alert('Error ');
      }
    });
  }
  usersPost(userId: number) {
    return new Promise((resolve, reject) => {
      this.userData.post(userId.toString()).subscribe(
        (data: any) => {
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
          // e(data);
          if (data[i].completed) {
            complete += 1;
          } else {
            incomplete += 1;
          }
        }
        // e(complete,incomplete);
        resolve({ complete, incomplete });
      });
    });
  }

  /*************************************
   * -> Routes for different pages
   * *********************************** */
  ImageClick(userID: number) {
    // e(userID + "calliing...");
    this.router.navigate([`user-details/${userID}`]);
  }
  PostIcon(userID: number) {
    this.router.navigate([`users/${userID}/posts`]);
  }
  albumIcon(userID: number) {
    this.router.navigate([`users/${userID}/albums`]);
  }
  todoIcon(userID: number) {
    this.router.navigate([`users/${userID}/todos`]);
  }
}
