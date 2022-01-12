import { Component, ViewChild, OnInit, ViewEncapsulation, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from  '@angular/material/dialog';
import { AuthService } from '../auth.service';
import { DialogEditSuccessComponent } from '../dialog-edit-success/dialog-edit-success.component';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { ToastrService } from 'ngx-toastr';
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserProfileComponent implements OnInit {
  name = '';
  u_designation = '';
  u_intro = ''
  u_state = '';
  u_country = '';
  u_city = '';
  u_hobbies = '';
  newDate: Date = null;
  fileDataVal: File = null;
  previewUrl:any = null;
  // imageCov:any = 'assets/images/bg.jpg';
  imageCov:any = 'assets/images/15457.jpg';
  token = '';
  current_user_profile = true
  frdDetails = [];
  notAnyFrd = '';
  user_post = '';
  user_city = '';
  user_state = '';
  user_country = '';
  user_hobbies = '';
  user_intro = '';
  notfound = 0;
  ids = '';
  cur_user = '';
  urls = [];
  datas = [];
  onlyImg = [];
  notif_data: any = [];
  display: boolean = true;

  @ViewChild('designation') designationElement: any;
  @ViewChild('city') cityElement: any;
  @ViewChild('state') stateElement: any;
  @ViewChild('country') countryElement: any;
  @ViewChild('hobbies') hobbiesElement: any;
  @ViewChild('intro') introElement: any;
  
  constructor(
    public authService: AuthService,
    private activatedRoute: ActivatedRoute,
    public router: Router,
    public  dialog:  MatDialog,
    public elRef: ElementRef,
    public toastr: ToastrService
  ) {

    // bottom to top btn

$(window).scroll(function() {
  if ($(window).scrollTop() > 300) {
    $("#button_top").addClass("show");
  } else {
    $("#button_top").removeClass('show');
  }
});

    // end here
    let id = this.activatedRoute.snapshot.paramMap.get('id');

    this.ids = this.activatedRoute.snapshot.paramMap.get('id');
    
    this.authService.getUserProfile(id).subscribe(res => {
      this.name =  res.data.name
      this.u_designation =  res.data.designation
      this.u_intro = res.data.intro
      this.u_country =  res.data.country
      this.u_state =  res.data.state
      this.u_city =  res.data.city
      this.u_hobbies =  res.data.hobbies
      this.newDate= new Date(res.data.createdAt);
      this.previewUrl = res.data.profileImgURl
      this.imageCov = res.data.coverImgURl

      if(this.imageCov == undefined){
        this.imageCov = 'assets/images/15457.jpg'
      }
    })

    if(this.router.url !== '/friends/' + this.activatedRoute.snapshot.paramMap.get('id'))
    {
      localStorage.removeItem('friendId')
    }

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    this.cur_user = currentUser.data._id;
    
    if(currentUser.data._id == id){
      this.current_user_profile = true
    }else{
      this.current_user_profile = false
    }

    this.authService.getFriends(id).subscribe(res => {
      if(res.success)
      {
        for(let i = 0; i < res.userInfo.length; i++){
          this.frdDetails.push(res.userInfo[i])
        }
      }else{
        this.notAnyFrd = res.message
      }
    })

    this.authService.getProfilePost(id).subscribe(res => {
      if(res.length > 0){
        for(let i = 0; i < res.length; i++){
          for(let j = 0; j < res[i].imageUrl.length; j++){
            if(res[i].imageUrl[j].image.split('.').pop() !== 'mp4'){
              this.onlyImg.push(res[i].imageUrl[j].image)
            }
          }
        }
      }else{
        this.notfound = res.code
      }
    })

    this.authService.getNotifications(id).subscribe(res => {
      if(res['success']){
        this.notif_data = res['message']
      } else {
        this.notif_data = []
      }
      
    })
  }

  ngOnInit(): void {
  }

  show = true
  resetModel(){
    this.show = false;
  }

  showImageCrop(){
    this.show = true;
  }

  openDialog() {
    this.user_post= (this.designationElement !== undefined) ? this.designationElement.nativeElement.textContent : this.user_post;
    this.user_city = (this.cityElement !== undefined) ? this.cityElement.nativeElement.textContent : this.user_city;
    this.user_state = (this.stateElement !== undefined) ? this.stateElement.nativeElement.textContent : this.user_state;
    this.user_country = (this.countryElement !== undefined) ? this.countryElement.nativeElement.textContent : this.user_country;
    this.user_hobbies = (this.hobbiesElement !== undefined) ? this.hobbiesElement.nativeElement.textContent : this.user_hobbies;
    this.user_intro = (this.introElement !== undefined) ? this.introElement.nativeElement.textContent : this.introElement;
    console.log("this.user_intro", this.user_intro)
    this.authService.openDialog(this.user_post, this.user_city, this.user_state, this.user_country, this.user_hobbies, this.user_intro)
  }

  uploadPic() {
    var mimeType = this.fileToReturn.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    this.token = localStorage.getItem('token')
    var reader = new FileReader();
    reader.readAsDataURL(this.fileToReturn);
    reader.onload = (_event) => {
    this.croppedImage = reader.result.toString();
      this.token = localStorage.getItem('token')
      this.authService.setProfile(this.token, this.fileToReturn).subscribe((res) => {
        if (!res.result) {
          const dialogRefSuc = this.dialog.open(DialogEditSuccessComponent, {
            width: '400px'
          })
          setTimeout(() => {
            dialogRefSuc.close();
            window.location.replace('profile/' + window.location.href.split('/')[4]);
          }, 2000)
        }
      })
    }
    
  }

  uploadCov() {
    var mimeType = this.fileCovToReturn.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    var reader = new FileReader();
    reader.readAsDataURL(this.fileCovToReturn);
    reader.onload = (_event) => {
      this.token = localStorage.getItem('token')
      this.authService.setCover(this.token, this.fileCovToReturn).subscribe((res) => {
        if (!res.result) {
          const dialogRefSuc = this.dialog.open(DialogEditSuccessComponent, {
            width: '400px'
          })
          setTimeout(() => {
            dialogRefSuc.close();
            window.location.replace('profile/' + window.location.href.split('/')[4]);
          }, 2000)
        }
      })
    } 
  }

    imageChangedEvent: any = '';
    croppedImage: any = '';
    croppedCovImage: any = '';
    fileToReturn: File = null;
    fileCovToReturn: File = null;
    imgeDiv = false;

    // For Profile Photo Preview
    fileChangeEvent(event: any): void {
        this.imageChangedEvent = event;
        this.imgeDiv = true
    }
    imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event.base64;
      this.fileToReturn = this.base64ToFile(
        event.base64,
        this.imageChangedEvent.target.files[0].name
      )
      return this.fileToReturn.name;
    }
    imageLoaded() {
        // show cropper
    }
    cropperReady() {
        // cropper ready
    }
    loadImageFailed() {
        // show message
    }

    // For based64 convert to image
    base64ToFile(data, filename) {
       const arr = data.split(',');
       const mime = arr[0].match(/:(.*?);/)[1];
       const bstr = atob(arr[1]);
       let n = bstr.length;
       let u8arr = new Uint8Array(n);
       while(n--){
           u8arr[n] = bstr.charCodeAt(n);
       }
       return new File([u8arr], filename, { type: mime });
    }

    // For Cover Photo preview
    fileCovChangeEvent(event: any): void {
        this.imageChangedEvent = event;
        this.imgeDiv = true
    }
    covImageCropped(event: ImageCroppedEvent) {
        this.croppedCovImage = event.base64;
        this.fileCovToReturn = this.base64ToFile(
          event.base64,
          this.imageChangedEvent.target.files[0].name,
        )
        return this.fileCovToReturn.name;
    }
  }
  