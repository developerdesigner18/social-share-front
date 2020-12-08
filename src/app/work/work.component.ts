import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  current_user_profile = true;

  constructor(
    public router: Router,
    public authService: AuthService,
    private activatedRoute: ActivatedRoute,
  ) {
    const id = this.activatedRoute.parent.parent.params['value']['id'];
    if (this.router.url == '/friends/' + id + '/about/work_and_education') {
      this.authService.getFriendData(localStorage.getItem('friendId')).subscribe(res => {
        this.current_user_profile = false
      })
    }else{
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      localStorage.removeItem('friendId')
      if(currentUser.data._id !== id){
        this.current_user_profile = false
      }
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
