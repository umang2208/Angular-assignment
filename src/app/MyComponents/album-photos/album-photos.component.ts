import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { APIServicesService } from 'src/app/MyServices/api-services.service';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-album-photos',
  templateUrl: './album-photos.component.html',
  styleUrls: ['./album-photos.component.css'],
})
export class AlbumPhotosComponent implements OnInit {
  albumId: any;
  p: number = 1;
  pageSize = 5;
  pageSizes = [5, 10, 20];
  count: number = 0;
  page: number = 1;

  constructor(
    private route: ActivatedRoute,
    private PostData: APIServicesService,
    private cdr: ChangeDetectorRef
  ) {}
  post!: any;
  id: number = 0;
  RequireAlbum: any[] = [];
  loader: boolean = false;

  j: number = 0;
  async ngOnInit(): Promise<void> {
    this.loader = true;
    this.post = await this.fetchPost();
  }
  async fetchPost() {
    this.id = this.route.snapshot.params['userID'];
    this.albumId = this.route.snapshot.params['albumId'];

    console.log(this.id, this.albumId);
    this.PostData.userImages(
      this.id.toString(),
      this.albumId.toString()
    ).subscribe((data) => {
      this.post = data;
      this.loader = false;
    });
  }
  onPageChange(event: any) {
    this.page = event;
    this.post();
  }
  onPageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.post();
  }
}
