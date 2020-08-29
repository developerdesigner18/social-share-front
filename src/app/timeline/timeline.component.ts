import { Component, OnInit, ViewEncapsulation, ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog} from  '@angular/material/dialog';
import { PostModalComponent } from '../post-modal/post-modal.component';
import { AuthService } from '../auth.service';
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TimelineComponent implements OnInit {
  id = '';
  postImage: any = '';
  images = [];
  postProfileimg: any = null;
  u_name = '';
  description = '';
  urls = [];
  profileImg = '';
  posts: any = '';
  token = '';

  @ViewChild('textmsgPost') postMesssgeElement: any;

  public datas;
  constructor(
    public  dialog:  MatDialog,
    private activatedRoute: ActivatedRoute,
    public authService: AuthService,
    public router: Router
  ) {
    this.id = this.activatedRoute.parent.params['value']['id'];
    this.authService.getUserProfile(this.id).subscribe(res => {

      this.profileImg =  res.data.profileImgURl
      this.u_name =  res.data.name
    })
    this.token = localStorage.getItem('token')
    this.authService.getProfilePost(this.token).subscribe(res => {
      this.datas = res
      for(let i = 0; i < this.datas.length; i++){
        this.description = this.datas[i].description;
        this.urls.push(this.datas[i].imageUrl)
      }
      return this.datas
    })
  }

  ngOnInit(): void {
    // $.noConflict();
    $('.owl-carousel').owlCarousel();
    jQuery(document).ready(function(){
      // $('#owl-demo').trigger('refresh.owl.carousel')
      jQuery('.owl-carousel').owlCarousel({
        nav:true,
        items:1,
        autoWidth: true,
        video:true,
        lazyLoad: true
      })
    });
    $(window).on('load', function(){
      $('.owl-carousel').owlCarousel({
    		nav:true,
    		items:1,
        autoWidth: true,
        video:true,
        lazyLoad: true
    	})

      // $('.owl-video-play-icon').remove();
    });
    this.changeslider();

    // $('.owl-carousel').owlCarousel({
    //   nav:true,
    //   items:1,
    //   autoWidth: true,
    //   video:true,
    // })
    // var element = this.id;
    // $('.owl-carousel').addClass('display','block')
    // $('.owl-carousel'):not(.owl-loaded){
    //     opacity: 0;
    // }
    // function init_carousel(){
    //   console.log("=-=-=-=-=-init car")
    //   console.log($('.owl-carousel').owlCarousel())
    //   console.log("=-=-=-=-=-init car")
    // }
  }

  openTextDialog(){
    this.dialog.open(PostModalComponent, {
      width: '550px',
      panelClass: 'custom-dialog-container',
      data: { id: this.id }
    });
  }

  fileData: File = null;
  previewUrl: any = null;
  previewallUrl: any[] = [];
  fileToReturn: File = null;
  files_data: any = [];
  openDialog(event: any): void {
    if (event.target.files && event.target.files[0]) {
        var filesAmount = event.target.files.length;
        for (let i = 0; i < filesAmount; i++) {
          var reader = new FileReader();

          reader.onload = (event:any) => {
            this.images.push(event.target.result);
          }
          reader.readAsDataURL(event.target.files[i]);
          this.files_data.push(event.target.files[i]);
        }
    }
    this.dialog.open(PostModalComponent, {
      width: '550px',
      panelClass: 'custom-dialog-container',
      data: { id: this.id, images: this.images, file: this.files_data  }
    });
  }

  changeslider(){
    $(document).ready(function(){
      $('.owl-carousel').owlCarousel({
        nav:true,
        items:1,
        autoWidth: true,
        video:true,
        lazyLoad: true
      })
      // $('.owl-video-play-icon').remove();
    })
  }
}
