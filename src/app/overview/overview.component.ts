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

  f_designation = '';
  f_state = '';
  f_country = '';
  f_city = '';
  f_hobbies = '';

  constructor(
    public authService: AuthService,
    private activatedRoute: ActivatedRoute,
    public router: Router
  ) {
    let id = this.activatedRoute.parent.parent.params['value']['id'];
    if(this.router.url == '/friends/' + this.activatedRoute.parent.parent.params['value']['id'] + '/about/overview'){
      this.authService.getProfileForFriend(localStorage.getItem('friendId')).subscribe(res => {
        this.u_designation =  res.data.designation
        this.u_country =  res.data.country
        this.u_state =  res.data.state
        this.u_city =  res.data.city
      })
    }else{
      localStorage.removeItem('friendId')
      this.authService.getProfileforAbout(id).subscribe(res => {
        this.u_designation =  res.data.designation
        this.u_country =  res.data.country
        this.u_state =  res.data.state
        this.u_city =  res.data.city
      })

      this.authService.getAllData(id).subscribe(res => {
        if(res.userData[0] !== undefined) {
          this.u_number = res.userData[0].mobileNumber;
          this.u_address = res.userData[0].address;
          this.u_website = res.userData[0].website;
          this.u_religious = res.userData[0].basicInfo;
          this.u_status = res.userData[0].relationshipStatus;
        }
      })
    }

    // this.authService.getProfileForFriend(localStorage.getItem('friendId')).subscribe(res => {
    //   console.log("=-=-=-res about post", res)
    //   this.f_designation =  res.data.designation
    //   this.f_country =  res.data.country
    //   this.f_state =  res.data.state
    //   this.f_city =  res.data.city
    //   this.f_hobbies =  res.data.hobbies
    //   // this.u_name =  res.data.name
    //   // localStorage.removeItem('friendId');
    // })
    // console.log("-=-=-=-=-=-=-=-designation")
    // console.log(this.f_designation)
    // console.log("-=-=-=-=-=-=-=-designation")
  }

  ngOnInit(): void {
  }
}
