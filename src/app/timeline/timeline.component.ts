import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog} from  '@angular/material/dialog';
import { PostModalComponent } from '../post-modal/post-modal.component';
import { AuthService } from '../auth.service';
declare var jQuery: any;

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
  url = '';
  profileImg = '';
  posts: any = '';
  token = '';

  public datas;
  constructor(
    public  dialog:  MatDialog,
    private activatedRoute: ActivatedRoute,
    public authService: AuthService
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
        this.url = this.datas[i].imageUrl;

      }
      return this.datas
    })
  }

  ngOnInit(): void {
    (function ($) {
      $(document).ready(function(){
        $('.owl-carousel').owlCarousel({
      		nav:true,
      		items:1,
          autoWidth: true,
          loop: false,
          rewind: true
      	});

        $('.comment_sec').on('click',function(){
    			$('.comments_container').toggle();
    		});


      });
    })(jQuery);
  }

  destoryOwl(){
    (function ($) {
      $(".owl-carousel").data('owlCarousel').destroy()
      $('.owl-carousel').empty();
    })(jQuery);
  }

  fileData: File = null;
  previewUrl: any = null;
  fileToReturn: File = null;
  openDialog(event: any): void {
    // this.fileData = <File>event.target.files[0]
    //
    // // Show preview
    // var mimeType = this.fileData.type;
    // if (mimeType.match(/image\/*/) == null) {
    //   return;
    // }
    //
    // var reader = new FileReader();
    // reader.readAsDataURL(this.fileData);
    //
    // reader.onload = (_event) => {
    //   this.previewUrl = reader.result;
    //   this.dialog.open(PostModalComponent, {
    //     width: '550px',
    //     panelClass: 'custom-dialog-container',
    //     data: { id: this.id, postImg: this.previewUrl, file: this.fileData }
    //   });
    //
    //
    // }

    //Multipul Image upload
    if (event.target.files && event.target.files[0]) {
        var filesAmount = event.target.files.length;
        for (let i = 0; i < filesAmount; i++) {
          var reader = new FileReader();

          reader.onload = (event:any) => {
            console.log(event.target.result);
             this.images.push(event.target.result);
             console.log("=-=-=-=-=-=-reader.target.result")
             console.log(event.target.result)
             console.log("=-=-=-=-=-=-reader.target.result")
             // this.myForm.patchValue({
             //    fileSource: this.images
             // });
          }
          reader.readAsDataURL(event.target.files[i]);
          console.log("=-=-=-=-=-=target")
          console.log(this.images)
          console.log(event.target)
          console.log(event.target.files[i].name)
          console.log("=-=-=-=-=-=target")
          this.fileToReturn = this.base64ToFile(
            this.images,
            event.target.files[i].name
          )
        }
        console.log("---=-=-=-=-=-=-Images")
        console.log(this.fileToReturn)
        console.log("---=-=-=-=-=-=-Images")
        // this.fileToReturn = this.base64ToFile(
        //   this.images,
        //   this.imageChangedEvent.target.files[0].name
        // )
    }

  }

  base64ToFile(data, filename) {
    console.log("=-=-=-=-=-=Data")
    console.log(data)
    console.log("=-=-=-=-=-=Data")
     const arr = data.toString().split(',');
     const mime = arr[0].match(/:(.*?);/)[1];
     const bstr = atob(arr[1]);
     let n = bstr.length;
     let u8arr = new Uint8Array(n);

     while(n--){
         u8arr[n] = bstr.charCodeAt(n);
     }

     return new File([u8arr], filename, { type: mime });
  }

}
