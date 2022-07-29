import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faFaceLaughBeam } from '@fortawesome/free-solid-svg-icons';
import { APIServicesService } from 'src/app/MyServices/api-services.service';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css'],
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
  loader: boolean = false;

  j: number = 0;
  async ngOnInit(): Promise<void> {
    this.loader = true;
    this.post = await this.fetchPost();
  }
  async fetchPost() {
    this.id = this.route.snapshot.params['userID'];
    this.PostData.ablum(this.id.toString()).subscribe((data) => {
      this.post = data;
      // console.log(this.post.length);

      this.RequireAlbum = this.post;
      console.log(this.RequireAlbum);
      this.loader = false;
    });
  }
  pageSize = 5;
  pageSizes = [5, 10, 20];
  count: number = 0;
  page: number = 1;
  onPageChange(event: any) {
    this.page = event;
    this.post();
  }
  onPageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.post();
  }
  albumPics(userID: number, albumId: number) {
    this.router.navigate([`users/${userID}/albumPhotos/${albumId}`]);
  }
}
