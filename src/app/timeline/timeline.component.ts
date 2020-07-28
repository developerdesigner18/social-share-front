import { Component, OnInit, ViewEncapsulation, ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog} from  '@angular/material/dialog';
import { PostModalComponent } from '../post-modal/post-modal.component';
// import { UserProfileComponent } from '../user-profile/user-profile.component';
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
  // images = [];
  images: Array<any>;
  postProfileimg: any = null;
  u_name = '';
  description = '';
  url = '';
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
    // public userprofile: UserProfileComponent
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
    // this.userprofile.ngOnInit()
  }

  ngOnInit(): void {
    $(document).ready(function(){
      $('.owl-carousel').owlCarousel({
        nav:true,
        items:1,
        autoWidth: true
      })
    });
    $(window).on('load', function(){
      $('.owl-carousel').owlCarousel({
    		nav:true,
    		items:1,
        autoWidth: true
    	})
    });
  }

  openTextDialog(){
    this.dialog.open(PostModalComponent, {
      width: '550px',
      panelClass: 'custom-dialog-container',
      data: { id: this.id }
    });
  }

  private filesData: any[] = [];
  fileData: File = null;
  previewUrl: any = null;
  fileToReturn: File = null;
  openDialog(event: any): void {
    this.fileData = <File>event.target.files[0]

    // Show preview
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.fileData);

    reader.onload = (_event) => {
      this.previewUrl = reader.result; //based64 image
      this.dialog.open(PostModalComponent, {
        width: '550px',
        panelClass: 'custom-dialog-container',
        data: { id: this.id, postImg: this.previewUrl, file: this.fileData }
      });


    }

    //Multipul Image upload
    // if (event.target.files && event.target.files[0]) {
    //     var filesAmount = event.target.files.length;
    //     for (let i = 0; i < filesAmount; i++) {
    //       var reader = new FileReader();
    //
    //       reader.onload = (event:any) => {
    //         // console.log(event.target.result);
    //          this.images.push(event.target.result);
    //          // console.log("=-=-=-=-=-=-reader.target.result")
    //          // console.log(event.target.result)
    //          // console.log("=-=-=-=-=-=-reader.target.result")
    //          // this.myForm.patchValue({
    //          //    fileSource: this.images
    //          // });
    //       }
    //       reader.readAsDataURL(event.target.files[i]);
    //       // this.fileData = event.target.files[i]
    //       // reader.readAsDataURL(this.fileData);
    //       // console.log("=-=-=-=-=-=target")
    //       // console.log(this.images)
    //       // console.log(reader.result)
    //       // console.log("-=-=-=-=-=-target")
    //       // console.log(event.target.files[i].name)
    //       // console.log("=-=-=-=-=-=this.previewUrl")
    //       // console.log(this.previewUrl)
    //       // console.log("=-=-=-=-=-=this.previewUrl")
    //       // this.fileToReturn = this.base64ToFile(
    //       //   this.images,
    //       //   event.target.files[i].name
    //       // )
    //       // this.images.push(event.target.files[i])
    //
    //       }
    //
    //       // reader.onload = (_event) => {
    //       //   this.previewUrl = reader.result; //based64 image
    //       //   console.log("==-=-=--=--previewUrl")
    //       //   console.log(this.previewUrl)
    //       //   console.log("==-=-=--=--")
    //
    //       // this.dialog.open(PostModalComponent, {
    //       //   width: '550px',
    //       //   panelClass: 'custom-dialog-container',
    //       //   data: { id: this.id, file: event.target.files[i].name }
    //       // });
    //     // }
    //
    //     // console.log("---=-=-=-=-=-=-Images")
    //     // console.log(this.fileToReturn)
    //     // console.log("---=-=-=-=-=-=-Images")
    //     // this.fileToReturn = this.base64ToFile(
    //     //   this.images,
    //     //   this.imageChangedEvent.target.files[0].name
    //     // )
    // }
    // console.log("-=-=-=-=-files")
    // console.log(this.images)
    // console.log("-=-=-=-=-files")
    // this.dialog.open(PostModalComponent, {
    //   width: '550px',
    //   panelClass: 'custom-dialog-container',
    //   data: { id: this.id, image: this.images }
    // });
  }

  // base64ToFile(data, filename) {
  //   console.log("=-=-=-=-=-=Data")
  //   console.log(data)
  //   console.log("=-=-=-=-=-=Data")
  //    const arr = data.toString().split(',');
  //    const mime = arr[0].match(/:(.*?);/)[1];
  //    const bstr = atob(arr[1]);
  //    let n = bstr.length;
  //    let u8arr = new Uint8Array(n);
  //
  //    while(n--){
  //        u8arr[n] = bstr.charCodeAt(n);
  //    }
  //
  //    return new File([u8arr], filename, { type: mime });
  // }

}
