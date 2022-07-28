import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faFaceLaughBeam } from '@fortawesome/free-solid-svg-icons';
import { APIServicesService } from 'src/app/MyServices/api-services.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private PostData: APIServicesService,
    private router: Router
  ) {}
  post!: any;
  id: number = 0;
  RequireAlbum: any[] = [];
 facomment = faFaceLaughBeam;
 loader : boolean = false;


  j: number = 0;
  async ngOnInit(): Promise<void> {
    this.loader = true;
    this.post = await this.fetchPost();
  }
  async fetchPost() {
    this.id = this.route.snapshot.params['userID'];
    this.PostData.ablum().subscribe((data) => {
      this.post = data;
      // console.log(this.post.length);

      for (let i = 0; i < this.post.length; i += 1) {
        if (this.post[i].userId === +this.id) {
          this.RequireAlbum.push(this.post[i]);
        }
      }
      console.log(this.RequireAlbum);
      this.loader = false;
    });
    
  }
  albumPics(userID: number){
    this.router.navigate([`albumPhotos/${userID}`]);
   }
}
