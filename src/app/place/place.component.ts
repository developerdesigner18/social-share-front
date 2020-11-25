import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute} from '@angular/router';

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

  constructor(
    public authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) {
    let id = this.activatedRoute.parent.parent.params['value']['id'];
    if(localStorage.getItem('friendId')){
      this.authService.getProfileForFriend(localStorage.getItem('friendId')).subscribe(res => {
        this.u_country =  res.data.country
        this.u_state =  res.data.state
        this.u_city =  res.data.city
      })
    }else{
      this.authService.getProfileforAbout(id).subscribe(res => {
        this.u_country =  res.data.country
        this.u_state =  res.data.state
        this.u_city =  res.data.city
      })
    }

  }

  ngOnInit(): void {
  }

  newCurrent(){
    this.current = true
  }

  newHome(){
    this.home = true
  }

  Cancel(){
    this.current = false
    this.home = false
  }

}
