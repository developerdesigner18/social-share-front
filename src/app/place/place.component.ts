import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router} from '@angular/router';

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

  constructor(
    public router: Router,
    public authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) {
    if (this.router.url == '/friends/' + this.activatedRoute.parent.parent.params['value']['id'] + '/about/place') {
      this.id = localStorage.getItem('friendId')
    } else {
      localStorage.removeItem('friendId')
      this.id = this.activatedRoute.parent.parent.params['value']['id'];
    }
      const current_login_User = JSON.parse(localStorage.getItem('currentUser'));
      if (current_login_User.data._id !== this.id) {
        this.icons = false
      } else {
        this.id = current_login_User.data._id
        this.icons = true
      }
      this.authService.getProfileforAbout(this.id).subscribe(res => {
        if (res.data.city !== undefined) {
          this.show_city = true
          this.u_city = res.data.city
        } else {
          this.show_city = false
          this.not_mention_city = true
        }

        if (res.data.homeTown !== undefined) {
          this.home_town = res.data.homeTown
          this.show_home = true
          this.home = true
        } else {
          this.not_mention_home = true
        }
      })

      // this.authService.getAllData(this.id).subscribe(res => {
      //   if (res.userData[0].homeTown !== undefined) {
      //     this.home_town = res.userData[0].homeTown
      //     this.show_home = true
      //     this.home = true
      //   } else {
      //     this.not_mention_home = true
      //     this.home = false
      //   }
      // })
  }

  addHome(home_town: any) {
    this.authService.addHomeTown(home_town).subscribe(res => {
      if (res['success']) {
        this.home_town = home_town
        this.show_home = true
        this.home = true
        this.fill_home = false
      }
    })
  }

  editHome(home_town: any) {
    this.authService.addHomeTown(home_town).subscribe(res => {
      if (res['success']) {
        this.show_home = true
        this.u_fill_home = false
      }
    })
  }

  updateHome(home_town: any) {
    this.home_town = home_town
    this.show_home = false
    this.u_fill_home = true
    this.authService.addHomeTown(home_town).subscribe(res => {
      if (res['success']) {
        // this.u_address = true
        // this.display2 = false
      }
      else {
        console.log("error");
        // this.display2 = false;
      }
    })
  }

  delHome(home_town: any) {
    this.home = false
    this.fill_home = false
    this.show_home = false
    this.authService.deleteHomeTown(home_town).subscribe(res => {
      if (res['success']) {
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
