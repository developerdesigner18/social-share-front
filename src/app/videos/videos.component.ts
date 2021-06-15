import { Component, OnInit, HostListener } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css']
})
export class VideosComponent implements OnInit {

  urls = [];
  token = '';
  id = '';
  shows: any;
  totalDisplay: number;
  bodyHeight: number;

  @HostListener("window:scroll")
  onScroll(e: Event): void {
    if (this.bottomReached()) {
      this.totalDisplay += 3;
      this.bodyHeight += 400;
    }
  }
  constructor(
    public authService: AuthService,
    public router: Router,
    private activatedRoute: ActivatedRoute
  ) { 
    this.bodyHeight = 1000;
    this.totalDisplay = 6;
    // $(".right_sidebar").css("display", "block");
    this.token = localStorage.getItem('token')
    this.id = this.activatedRoute.parent.params['value']['id'];
    if(this.router.url === '/friends/' + this.activatedRoute.parent.params['value']['id'] + '/videos'){
      this.authService.getAllPhotos(localStorage.getItem('friendId')).subscribe(res => {
        if (res['success']) {
        for (let i = 0; i < res.data.length; i++){ 
          if (res.data[i].image.split('.').pop() !== 'jpg' && res.data[i].image.split('.').pop() !== 'png' && res.data[i].image.split('.').pop() !== 'jpeg' && res.data[i].image.split('.').pop() !== 'undefined' && res.data[i].image.split('.').pop() !== 'JPG') { 
              this.urls.push(res.data[i])
            }
          }
        } else {
          this.shows = "User not uploaded any videos"
        }
      })
    }else{
      localStorage.removeItem('friendId')
      this.authService.getAllPhotos(this.id).subscribe(res => {
        if (res['success']) {
        for (let i = 0; i < res.data.length; i++){ 
          if (res.data[i].image.split('.').pop() !== 'jpg' && res.data[i].image.split('.').pop() !== 'png' && res.data[i].image.split('.').pop() !== 'jpeg' && res.data[i].image.split('.').pop() !== 'undefined' && res.data[i].image.split('.').pop() !== 'JPG') { 
            this.urls.push(res.data[i])
          }
        }
      } else {
        this.shows = "User not uploaded any videos"
      }
      })
    }
  }

  ngOnInit(): void {
  }
  bottomReached(): boolean {
    return (window.innerHeight + window.scrollY * 1.1) >= this.bodyHeight;
  }

}
