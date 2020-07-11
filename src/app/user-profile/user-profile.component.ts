import { Component, ViewChild, OnInit, ViewEncapsulation, Input, ElementRef, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef } from  '@angular/material/dialog';
import { AuthService } from '../auth.service';
// import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { DialogEditSuccessComponent } from '../dialog-edit-success/dialog-edit-success.component';
declare var jQuery: any;

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserProfileComponent implements OnInit {
  name = '';
  u_designation = '';
  u_state = '';
  u_country = '';
  u_city = '';
  u_hobbies = '';
  newDate: Date = null;
  url = '';
  fileDataVal: File = null;
  previewUrl:any = null;
  imageCov:any = 'assets/images/bg.jpg';
  token = '';

  user_post = '';
  user_city = '';
  user_state = '';
  user_country = '';
  user_hobbies = '';

  @ViewChild('designation') designationElement: any;
  @ViewChild('city') cityElement: any;
  @ViewChild('state') stateElement: any;
  @ViewChild('country') countryElement: any;
  @ViewChild('hobbies') hobbiesElement: any;

  constructor(
    public authService: AuthService,
    private activatedRoute: ActivatedRoute,
    public  dialog:  MatDialog,
    public elRef: ElementRef
  ) {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.authService.getUserProfile(id).subscribe(res => {

      this.name =  res.data.name
      this.u_designation =  res.data.designation
      this.u_country =  res.data.country
      this.u_state =  res.data.state
      this.u_city =  res.data.city
      this.u_hobbies =  res.data.hobbies

      this.newDate= new Date(res.data.createdAt);
      this.previewUrl = res.data.profileImgURl
      this.imageCov = res.data.coverImgURl

      if(this.imageCov == undefined){
        this.imageCov = 'assets/images/bg.jpg'
      }
    })
  }

  ngOnInit(): void {
    (function ($) {
      $(document).ready(function(){
        $('.owl-carousel').owlCarousel({
      		nav:true,
      		items:1,
          autoWidth: true
      	});

        $('.comment_sec').on('click',function(){
    			$('.comments_container').toggle();
    		});
      });
    })(jQuery);
  }

  logout() {
    window.location.replace('');
  }

  openDialog() {
    this.user_post= (this.designationElement !== undefined) ? this.designationElement.nativeElement.textContent : this.user_post;
    this.user_city = (this.cityElement !== undefined) ? this.cityElement.nativeElement.textContent : this.user_city;
    this.user_state = (this.stateElement !== undefined) ? this.stateElement.nativeElement.textContent : this.user_state;
    this.user_country = (this.countryElement !== undefined) ? this.countryElement.nativeElement.textContent : this.user_country;
    this.user_hobbies = (this.hobbiesElement !== undefined) ? this.hobbiesElement.nativeElement.textContent : this.user_hobbies;

    this.authService.openDialog(this.user_post, this.user_city, this.user_state, this.user_country, this.user_hobbies)
  }

  uploadPic(fileInput: any){
    this.fileDataVal = <File>fileInput.target.files[0];
    this.preview();
  }

  preview() {
    var mimeType = this.fileDataVal.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.fileDataVal);
    reader.onload = (_event) => {
      // this.previewUrl = reader.result;
      this.token = localStorage.getItem('token')

      this.authService.setProfile(this.token, this.fileDataVal).subscribe((res) => {
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


  uploadCov(fileInput: any){
    this.fileDataVal = <File>fileInput.target.files[0];
    this.previewCov();
  }

  previewCov() {
    var mimeType = this.fileDataVal.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.fileDataVal);
    reader.onload = (_event) => {
      // this.imageCov = reader.result;
      this.token = localStorage.getItem('token')

      this.authService.setCover(this.token, this.fileDataVal).subscribe((res) => {
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
}
