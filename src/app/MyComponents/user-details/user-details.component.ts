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
    private route: ActivatedRoute,
    private btnService: BackBtnService,
    private router:Router
  ) {}
  users!: any[];
  id: number = 0;
  loader: boolean = false;

  ngOnInit(): void {
    this.loader = true;
    this.userData.users().subscribe((data) => {
      this.users = data;
      this.loader = false;
    });
    this.id = this.route.snapshot.params['userID'];
  }
  goToPost(userID: number){
    
    this.router.navigate([`posts/${userID}`]);
   }
   goToAlbum(userID: number){
    this.router.navigate([`album/${userID}`]);
   }
   goToTodo(userID: number){
    this.router.navigate([`todo/${userID}`]);
   }
}
