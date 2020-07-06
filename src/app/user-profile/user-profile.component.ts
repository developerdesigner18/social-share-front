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
  fileData: File = null;
  previewUrl:any = null;

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

      this.name =  res.data[0].name
      this.u_designation =  res.data[0].designation
      this.u_country =  res.data[0].country
      this.u_city =  res.data[0].city
      this.u_hobbies =  res.data[0].hobbies

      this.newDate= new Date(res.data[0].createdAt);

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
    this.fileData = <File>fileInput.target.files[0];
    this.preview();
  }

  preview() {
    // Show preview
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
      this.previewUrl = reader.result;
    }
  }
}
