import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-request-friends',
  templateUrl: './request-friends.component.html',
  styleUrls: ['./request-friends.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RequestFriendsComponent implements OnInit {
  profileImg = '';
  u_name = '';
  description = '';
  url = '';
  showView = false;

  // For friends profile view varible
  name = '';
  u_designation = '';
  u_state = '';
  u_country = '';
  u_city = '';
  u_hobbies = '';
  newDate: Date = null;
  fileDataVal: File = null;
  previewUrl:any = null;
  imageCov:any = 'assets/images/bg.jpg';
  token = '';

  public datas;
  constructor(
    public authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) {
    let current_id = this.activatedRoute.snapshot.paramMap.get('id');
    this.authService.getAllFriends(localStorage.getItem('token'), current_id).subscribe(res => {
      this.datas = res.AllUser[0]
    })
  }

  ngOnInit(): void {
  }

  openProfile(id){
    this.showView = true
    console.log("-=-=-=-=-=-Wow profile is open")
    console.log(id)

    this.authService.getProfileForFriend(id).subscribe(res => {
      this.name = res.data.name
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

}
