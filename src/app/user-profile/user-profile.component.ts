import { Component, ViewChild, OnInit, ViewEncapsulation, Input, ElementRef, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef } from  '@angular/material/dialog';
import { AuthService } from '../auth.service';
// import { EditProfileComponent } from '../edit-profile/edit-profile.component';
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
  u_country = '';
  u_city = '';
  u_hobbies = '';
  newDate: Date = null;
  url = '';
  fileDataVal: File = null;
  previewUrl:any = null;
  imageCov:any = '../../assets/images/cover.jpg';
  token = '';

  @ViewChild('designation') designationElement: any;
  @ViewChild('city') cityElement: any;
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
      this.u_city =  res.data.city
      this.u_hobbies =  res.data.hobbies

      this.newDate= new Date(res.data.createdAt);

      this.url = "/assets/images/gal_3.jpg"
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
    const user_post = this.designationElement.nativeElement.textContent;
    const user_city = this.cityElement.nativeElement.textContent;
    const user_country = this.countryElement.nativeElement.textContent;
    const user_hobbies = this.hobbiesElement.nativeElement.textContent;

    this.authService.openDialog(user_post, user_city, user_country, user_hobbies)
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
      this.previewUrl = reader.result;
      this.token = localStorage.getItem('token')

      this.authService.setProfile(this.token, this.fileDataVal).subscribe((res) => {})
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
      this.imageCov = reader.result;
      this.token = localStorage.getItem('token')

      this.authService.setCover(this.token, this.fileDataVal).subscribe((res) => {})
    }
  }
}
