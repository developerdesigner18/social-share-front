import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.css']
})
export class WorkComponent implements OnInit {
  work: boolean;
  university: boolean;
  school: boolean;

  constructor(
    public router: Router,
    public authService: AuthService
  ) {
    if(localStorage.getItem('friendId')){
      this.authService.getFriendData(localStorage.getItem('friendId')).subscribe(res => {
        // console.log("--=-=-=-=-=-=-res", res)
      })
    }
  }

  ngOnInit(): void {
  }


  newWork(){
    this.work = true
  }

  newUniversity(){
    this.university = true
  }

  newSchool(){
    this.school = true
  }

  Cancel(){
    this.work = false
    this.university = false
    this.school = false
  }

}
