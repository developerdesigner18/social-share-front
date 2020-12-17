import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {
  slideIndex = 1
  token = '';
  urls = [];
  totalImg = 0;
  id = '';
  public frd_datas: any = [];

  public datas;
  constructor(
    public authService: AuthService,
    public router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.token = localStorage.getItem('token')
    this.id = this.activatedRoute.parent.params['value']['id'];
    if(this.router.url === '/friends/' + this.activatedRoute.parent.params['value']['id'] + '/photos'){
      this.authService.getAllPhotos(localStorage.getItem('friendId')).subscribe(res => {
       
        for (let i = 0; i < res.data.length; i++){ 
            if (res.data[i].image.split('.').pop() !== 'mp4') { 
              this.urls.push(res.data[i])
            }
          }
      })
    }else{
      localStorage.removeItem('friendId')
      this.authService.getAllPhotos(this.id).subscribe(res => {
        
        for (let i = 0; i < res.data.length; i++){ 
          if (res.data[i].image.split('.').pop() !== 'mp4') { 
            this.urls.push(res.data[i])
          }
        }

      })
    }
  }

  ngOnInit(): void {
    // this.showSlides(this.slideIndex = 1);
  }

}
