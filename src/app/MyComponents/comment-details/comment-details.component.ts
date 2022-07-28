import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faFaceLaughBeam} from '@fortawesome/free-solid-svg-icons';
import { APIServicesService } from 'src/app/MyServices/api-services.service';

@Component({
  selector: 'app-comment-details',
  templateUrl: './comment-details.component.html',
  styleUrls: ['./comment-details.component.css']
})
export class CommentDetailsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private PostData: APIServicesService
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
    this.PostData.comment().subscribe((data) => {
      this.post = data;
      console.log(this.post.length);

      for(let i= (this.id * 5) -5 ;i< this.id * 5 ;i+=1){
        this.RequireAlbum.push(this.post[i]);
      }
      console.log(this.RequireAlbum);

      this.loader = false;
    });
  }

}
