import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.css']
})
export class PlaceComponent implements OnInit {
  u_country = '';
  u_state = '';
  u_city = '';
  current: boolean;
  home: boolean;
  fill_home = false;
  show_home: boolean
  home_town: any
  icons: boolean
  Required = false
  u_fill_home: boolean
  not_mention_home = false
  not_mention_city = false
  show_city: boolean
  id: string;
  friendid: string;

  constructor(
    public router: Router,
    public authService: AuthService,
    private activatedRoute: ActivatedRoute,
    public toastr: ToastrService
  ) {
    if (this.router.url == '/friends/' + this.activatedRoute.parent.parent.params['value']['id'] + '/about/place') {
      this.friendid = localStorage.getItem('friendId')
      this.icons = false
      this.authService.getProfileforAbout(this.friendid).subscribe(res => {
        if (res.data.city !== undefined && res.data !== null) {
          this.u_city = res.data.city
          this.show_city = true
        } else {
          this.show_city = false
          this.not_mention_city = true
        }
      })
      this.authService.getAllData(this.friendid).subscribe(res => {
        if (res.userData[0] == null) {
          this.not_mention_home = true
        } else if (res.userData[0].homeTown !== undefined) {
          this.home_town = res.userData[0].homeTown
          this.show_home = true
          this.home = true
        } else {
          this.not_mention_home = true
        }
      })

    } else {
      localStorage.removeItem('friendId')
      this.id = this.activatedRoute.parent.parent.params['value']['id'];
      const current_login_User = JSON.parse(localStorage.getItem('currentUser'));
      if (current_login_User.data._id !== this.id) {
        this.icons = false
        this.authService.getProfileforAbout(this.id).subscribe(res => {
          if (res.data.city !== undefined && res.data !== null) {
            this.u_city = res.data.city
            this.show_city = true
          } else {
            this.show_city = false
            this.not_mention_city = true
          }
        })
        this.authService.getAllData(this.id).subscribe(res => {
          if (res.userData[0] == null) {
            this.not_mention_home = true
          }
          else if (res.userData[0].homeTown !== undefined) {
            this.home_town = res.userData[0].homeTown
            this.show_home = true
            this.home = true
          } else {
            this.not_mention_home = true
          }
        })      
      } else {
        this.id = current_login_User.data._id
        this.icons = true
        this.authService.getProfileforAbout(this.id).subscribe(res => {
          if (res.data.city !== undefined) {
            this.show_city = true
            this.u_city = res.data.city
          } else {
            this.show_city = false
            this.not_mention_city = true
          }
        })
        this.authService.getAllData(this.id).subscribe(res => {          
          if (res.userData[0] == null) {
            this.home = false
          }
          else if (res.userData[0].homeTown !== undefined) {
            this.home_town = res.userData[0].homeTown
            this.show_home = true
            this.home = true
          } else {
            this.home = false
          }
        })
      }
    }
  }

  addHome(home_town: any) {
    if (home_town !== undefined) {
      this.authService.addHomeTown(home_town).subscribe(res => {
        if (res['success']) {
          this.toastr.success("Your home town is added successfully")
          this.home_town = home_town        
          this.show_home = true
          this.home = true
          this.fill_home = false
        }
      })
    } else {
      this.toastr.error("Please enter your home town properly")
    }
  }

  editHome(home_town: any) {
    if (home_town !== undefined) {
      this.authService.addHomeTown(home_town).subscribe(res => {
        if (res['success']) {
          this.toastr.success("Your home town is updated successfully")
          this.show_home = true
          this.u_fill_home = false
        }
      })
    } else {
      this.toastr.error("Please enter your home town properly")
    }
  }

  updateHome(home_town: any) {
    this.home_town = home_town
    this.show_home = false
    this.u_fill_home = true
    this.authService.addHomeTown(home_town).subscribe(res => {})
  }

  delHome(home_town: any) {
    this.home = false
    this.fill_home = false
    this.show_home = false
    this.authService.deleteHomeTown(home_town).subscribe(res => {
      if (res['success']) {
        this.toastr.success("Your home town is deleted successfully")
      } else {
        this.toastr.error("Oops some error occur. Please try again later")
      }
    })
  }

  ngOnInit(): void {
  }

  newCurrent(){
    this.current = true
  }

  newHome(){
    this.home = false
    this.fill_home = true
  }

  Cancel(){
    this.current = false
    this.home = false
  }

  Cancel1() {
    this.home = false
    this.fill_home = false
    this.Required = false
  }

  u_cancel() {
    this.show_home = true
    this.u_fill_home = false
  }

}
