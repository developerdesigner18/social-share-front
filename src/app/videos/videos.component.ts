import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css']
})
export class VideosComponent implements OnInit {

  urls = [];
  token = '';
  id = '';
  shows: boolean = true;
  constructor(
    public authService: AuthService,
    public router: Router,
    private activatedRoute: ActivatedRoute
  ) { 
    this.token = localStorage.getItem('token')
    this.id = this.activatedRoute.parent.params['value']['id'];
    if(this.router.url === '/friends/' + this.activatedRoute.parent.params['value']['id'] + '/videos'){
      this.authService.getAllPhotos(localStorage.getItem('friendId')).subscribe(res => {
       if (res.data.length === 0) {
         this.shows = false
       }
        for (let i = 0; i < res.data.length; i++){ 
            if (res.data[i].image.split('.').pop() !== 'jpg' && 'png' && 'jpeg' && 'undefined') { 
              this.urls.push(res.data[i])
            }
          }
      })
    }else{
      localStorage.removeItem('friendId')
      this.authService.getAllPhotos(this.id).subscribe(res => {
        if (res.data.length === 0) {
          this.shows = false
        }
        for (let i = 0; i < res.data.length; i++){ 
          if (res.data[i].image.split('.').pop() !== 'jpg' && 'png' && 'jpeg' && 'undefined') { 
            this.urls.push(res.data[i])
          }
        }
      })
    }

  }

  ngOnInit(): void {
  }

}
