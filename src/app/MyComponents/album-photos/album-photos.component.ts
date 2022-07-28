import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { APIServicesService } from 'src/app/MyServices/api-services.service';

@Component({
  selector: 'app-album-photos',
  templateUrl: './album-photos.component.html',
  styleUrls: ['./album-photos.component.css']
})
export class AlbumPhotosComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private PostData: APIServicesService
  ) {}
  post!: any;
  id: number = 0;
  RequireAlbum: any[] = [];
  loader: boolean = false;



  j: number = 0;
  async ngOnInit(): Promise<void> {
    this.loader= true;
    this.post = await this.fetchPost();
  }
  async fetchPost() {
    this.id = this.route.snapshot.params['userID'];
    this.PostData.userImages().subscribe((data) => {
      this.post = data;
      console.log(this.post.length);

      for(let i= (this.id * 50) -50 ;i< this.id * 50 ;i+=1){
        this.RequireAlbum.push(this.post[i]);
      }
      console.log(this.RequireAlbum);
      this.loader = false;

    });
  }


}
