import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.css']
})
export class WorkComponent implements OnInit {

  constructor(
    public router: Router,
    public authService: AuthService
  ) {
    console.log("-=-=-=-=-=-friendId")
    console.log(localStorage.getItem('friendId'))
    console.log("-=-=-=-=-=-friendId")
    if(localStorage.getItem('friendId')){
      this.authService.getFriendData(localStorage.getItem('friendId')).subscribe(res => {
        // console.log("--=-=-=-=-=-=-res", res)
      })
    }
  }

  ngOnInit(): void {
  }

}
