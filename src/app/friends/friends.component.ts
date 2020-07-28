import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  profileImg = '';
  u_name = '';

  constructor(
    public authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) {
    let id = this.activatedRoute.parent.params['value']['id'];
    this.authService.getUsersFriends(id).subscribe(res => {

      this.profileImg =  res.data.profileImgURl
      this.u_name =  res.data.name
    })
  }

  ngOnInit(): void {
  }

}
