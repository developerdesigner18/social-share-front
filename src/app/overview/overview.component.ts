import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  name = '';
  u_designation = '';
  u_state = '';
  u_country = '';
  u_city = '';
  u_number ='';
  u_address = '';
  u_website = '';
  u_religious = '';
  u_status = '';
  u_gender = '';
  id: string;

  constructor(
    public authService: AuthService,
    private activatedRoute: ActivatedRoute,
    public router: Router
  ) {
    // let id = this.activatedRoute.parent.parent.params['value']['id'];
    if (this.router.url == '/friends/' + this.activatedRoute.parent.parent.params['value']['id'] + '/about/overview') {
      this.id = localStorage.getItem('friendId')
      // this.authService.getProfileForFriend(localStorage.getItem('friendId')).subscribe(res => {
      //   this.u_designation = res.data.designation
      //   this.u_country = res.data.country
      //   this.u_state = res.data.state
      //   this.u_city = res.data.city
      // })
    } else {
      localStorage.removeItem('friendId')
      this.id = this.activatedRoute.parent.parent.params['value']['id'];
    }
      const current_login_User = JSON.parse(localStorage.getItem('currentUser'));
      if (current_login_User.data._id !== this.id) {
        // this.authService.getProfileforAbout(this.id).subscribe(res => {
        //   this.u_designation = res.data.designation
        //   this.u_country = res.data.country
        //   this.u_state = res.data.state
        //   this.u_city = res.data.city
            // this.authService.getAllData(id).subscribe(other_res => {
            //   if (other_res.userData[0] !== undefined) {
            //     this.u_number = other_res.userData[0].mobileNumber;
            //     this.u_address = other_res.userData[0].address;
            //     this.u_website = other_res.userData[0].website;
            //     this.u_religious = other_res.userData[0].basicInfo;
            //     this.u_status = other_res.userData[0].relationshipStatus;
            //     this.u_gender = other_res.userData[0].gender;
            //   }
            // })
        // })
      } else {
        this.id = current_login_User.data._id
      }

      this.authService.getProfileforAbout(this.id).subscribe(res => {
        this.u_designation = res.data.designation
        this.u_country = res.data.country
        this.u_state = res.data.state
        this.u_city = res.data.city
        // this.authService.getAllData(this.id).subscribe(res => {
        //   if (res.userData[0] !== undefined) {
        //     this.u_number = res.userData[0].mobileNumber;
        //     this.u_address = res.userData[0].address;
        //     this.u_website = res.userData[0].website;
        //     this.u_religious = res.userData[0].basicInfo;
        //     this.u_status = res.userData[0].relationshipStatus;
        //     this.u_gender = res.userData[0].gender;
        //   }
        // })
      })
  }

  ngOnInit(): void {
  }
}
