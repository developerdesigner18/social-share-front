import { Component, OnInit, HostListener, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css'],
  encapsulation: ViewEncapsulation.None
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
    private activatedRoute: ActivatedRoute,
    public cookieService: CookieService
  ) { 
    this.bodyHeight = 1000;
    this.totalDisplay = 6;
    this.token = localStorage.getItem('token')
    this.id = this.activatedRoute.parent.params['value']['id'];
    if(this.router.url === '/friends/' + this.activatedRoute.parent.params['value']['id'] + '/videos'){
      this.authService.getAllPhotos(this.cookieService.get('friendId')).subscribe(res => {
        if (res['success']) {
        for (let i = 0; i < res.data.length; i++){ 
          if (res.data[i].image.split('.').pop() !== 'jpg' && res.data[i].image.split('.').pop() !== 'png' && res.data[i].image.split('.').pop() !== 'jpeg' && res.data[i].image.split('.').pop() !== 'undefined' && res.data[i].image.split('.').pop() !== 'JPG') { 
              this.urls.push(res.data[i])
            }
          }
          console.log("this.urls", this.urls)
        } else {
          this.shows = "User not uploaded any videos"
        }
      })
    } else {
      this.cookieService.delete('friendId')
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
