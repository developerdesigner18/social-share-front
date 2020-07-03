import { Component, ViewChild, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef } from  '@angular/material/dialog';
import { AuthService } from '../auth.service';
// import { EditProfileComponent } from '../edit-profile/edit-profile.component';
declare var jQuery: any;

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class UserProfileComponent implements OnInit {
  name = '';
  post_user = "Web designer";
  // city = "Surat";
  // hobbies = "Football, Movies, Music";
  // join = ""
  @ViewChild('post') postElement: any;
  @ViewChild('city') cityElement: any;
  @ViewChild('hobbies') hobbiesElement: any;
  // message: string;
  constructor(
    public authService: AuthService,
    private activatedRoute: ActivatedRoute,
    public  dialog:  MatDialog
  ) {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.authService.getUserProfile(id).subscribe(res => {
      this.name =  res.data[0].name
      // this.join =  res.data[0]
    })
  }

  PostValue(){
    return this.post_user;
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
    // this.dialog.open(EditProfileComponent, {
    //   width: '550px',
    //   data: {post_user: this.post_user}
    // });
    const user_post = this.postElement.nativeElement.textContent;
    const user_city = this.cityElement.nativeElement.textContent;
    const user_hobbies = this.hobbiesElement.nativeElement.textContent;
    // console.log('height', height);

    this.authService.openDialog(user_post, user_city, user_hobbies).subscribe(data => {
      console.log("-=-=-=-=-=-");
      console.log(data);
      console.log("-=-=-=-=-=-");
    });
  }
}
