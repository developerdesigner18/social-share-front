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
  shows: boolean = true
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
        if (res.data.length === 0) {
          console.log(res.data.length);
          console.log("-=-=-=-=",res.data);
          
          this.shows = false
        } else {
          console.log(res.data.length);
        
        
        for (let i = 0; i < res.data.length; i++){ 
            if (res.data[i].image.split('.').pop() !== 'mp4' && 'mkv') { 
              this.urls.push(res.data[i])
            }
          }
        }
        })
      
    }else{
      localStorage.removeItem('friendId')
      this.authService.getAllPhotos(this.id).subscribe(res => {
        if (res.data.length === 0) {
          console.log(res.data.length);
          this.shows = false
        }
        
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
