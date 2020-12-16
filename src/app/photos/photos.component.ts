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
        // this.datas = res
        // this.totalImg = this.datas.length
        for (let i = 0; i < res.data.length; i++){ 
          //     if (this.datas[i].imageUrl != undefined) {
            console.log("=-=-=-=-=-=-datas not mp4", res.data[i].image.split('.').pop() !== 'mp4');
            if (res.data[i].image.split('.').pop() !== 'mp4') { 
              this.urls.push(res.data[i])
            }
                // this.urls.push(this.datas[i].imageUrl);
          //       console.log("-=-=-=-=-=-=-=-=-=-imageUrl", this.datas[i].imageUrl);
          }
      })
    }else{
      localStorage.removeItem('friendId')
      this.authService.getAllPhotos(this.id).subscribe(res => {
        console.log("=-=-=-=-=-response", res);
        // if (res.length > 0) {
          
        // this.urls.push(res.data)
        // this.datas = res.data
        // console.log("=-=-=-=-=-urls", this.urls);
        
        
        // this.totalImg = this.datas.length
        for (let i = 0; i < res.data.length; i++){ 
        //     if (this.datas[i].imageUrl != undefined) {
          console.log("=-=-=-=-=-=-datas not mp4", res.data[i].image.split('.').pop() !== 'mp4');
          if (res.data[i].image.split('.').pop() !== 'mp4') { 
            this.urls.push(res.data[i])
          }
              // this.urls.push(this.datas[i].imageUrl);
        //       console.log("-=-=-=-=-=-=-=-=-=-imageUrl", this.datas[i].imageUrl);
        }

        console.log("=-=-=-=-=-urls", this.urls);
      // if (res.data[0].split('.').pop() !== 'mp4') {
        // this.urls.push(res.data)
      //   console.log("=-=-=-=-=-urls", this.urls);
      // }
          // }
          // for (let i = 0; i < res.length; i++) {
          //   for (let j = 0; j < res[i].imageUrl.length; j++) {
          //       // console.log("-=-=-=-=-=-==-=-=- res", this.datas[i].imageUrl[j].image);
          //       this.urls.push(res[i].imageUrl[j].image)
          //       console.log("=-=-=-=-=urls", this.urls);
          //     }
          //   }
          // }
          // return this.datas
        // }
      })
    }
  }

  ngOnInit(): void {
    // this.showSlides(this.slideIndex = 1);
  }

}
