import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { APIServicesService } from 'src/app/MyServices/api-services.service';

@Component({
  selector: 'app-album-photos',
  templateUrl: './album-photos.component.html',
  styleUrls: ['./album-photos.component.css']
})
export class AlbumPhotosComponent implements OnInit {
  albumId: any;

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
    this.albumId = this.route.snapshot.params['albumId'];

    console.log(this.id,this.albumId);
    this.PostData.userImages(this.id.toString(),this.albumId.toString()).subscribe((data) => {
      this.post = data;
      console.log(this.post.length);

     
      console.log(this.post);
      this.loader = false;

    });
  }


}
