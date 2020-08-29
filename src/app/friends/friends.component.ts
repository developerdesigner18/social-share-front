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
  id = '';
  frdDetails = [];
  notAnyFrd = '';
  friend_id = '';

  constructor(
    public authService: AuthService,
    private activatedRoute: ActivatedRoute,
    public router: Router
  ) {
    let id = this.activatedRoute.parent.params['value']['id'];
    this.authService.getUsersFriends(id).subscribe(res => {

      this.profileImg =  res.data.profileImgURl
      this.u_name =  res.data.name
    })

    this.friend_id =  '/profile/'+id+'/friends'
    if(router.url === '/profile/'+id+'/friends'){
      this.authService.getFriends(id).subscribe(res => {
        if(res.success)
        {
          for(let i = 0; i < res.userInfo.length; i++){
            this.frdDetails.push(res.userInfo[i])
          }
        }else{
          this.notAnyFrd = res.message
        }
      })
    }

    //For friends panel set selected friend friends
    if(router.url === '/friends/'+id+'/friends'){
      this.authService.getFriends(localStorage.getItem('friendId')).subscribe(res => {
        if(res.success){
          for(let i = 0; i < res.userInfo.length; i++){
            this.frdDetails.push(res.userInfo[i])
          }
        }else{
          this.notAnyFrd = res.message
        }
      })
    }
  }

  ngOnInit(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.id = currentUser.data._id
  }
}
